using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PortalRowerowy.API.Data;
using PortalRowerowy.API.Dtos;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;


namespace PortalRowerowy.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class UserPhotosController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public UserPhotosController(IUserRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repository = repository;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, [FromForm]UserPhotoForCreationDto userPhotoForCreationDto)
        {
            
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repository.GetUser(userId);

            var file = userPhotoForCreationDto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()./*Width(500).Height(500).*/Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            userPhotoForCreationDto.Url = uploadResult.Uri.ToString();
            userPhotoForCreationDto.PublicId = uploadResult.PublicId;

            var userPhoto = _mapper.Map<UserPhoto>(userPhotoForCreationDto);

            if (!userFromRepo.UserPhotos.Any(p => p.IsMain))
                userPhoto.IsMain = true;

            userFromRepo.UserPhotos.Add(userPhoto);

            if (await _repository.SaveAll())
            {
                var userPhotoToReturn = _mapper.Map<UserPhotoForReturnDto>(userPhoto);
                return CreatedAtRoute("GetPhoto", new { id = userPhoto.Id }, userPhotoToReturn);

            }

            return BadRequest("Nie można dodać zdjęcia");
        }

        [HttpGet("{id}", Name = "GetPhoto")]

        public async Task<IActionResult> GetUserPhoto(int id)
        {
            var userPhotoFromRepo = await _repository.GetUserPhoto(id);

            var userPhotoForReturn = _mapper.Map<UserPhotoForReturnDto>(userPhotoFromRepo);

            return Ok(userPhotoForReturn);
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainUserPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId);

            if (!user.UserPhotos.Any(p => p.Id == id))
                return Unauthorized();

            var userPhotoFromRepo = await _repository.GetUserPhoto(id);

            if (userPhotoFromRepo.IsMain)
                return BadRequest("To już jest główne zdjęcie!");

            var currentMainUserPhoto = await _repository.GetMainPhotoForUser(userId);
            currentMainUserPhoto.IsMain = false;
            userPhotoFromRepo.IsMain = true;

            if (await _repository.SaveAll())
                return NoContent();

            return BadRequest("Nie można ustawić zdjęcia jako głównego!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId);

            if (!user.UserPhotos.Any(p => p.Id == id))
                return Unauthorized();

            var userPhotoFromRepo = await _repository.GetUserPhoto(id);

            if (userPhotoFromRepo.IsMain)
                return BadRequest("Nie można usunąć zdjęcia głównego!");

            if (userPhotoFromRepo.public_id != null)
            {
                var deleteParams = new DeletionParams(userPhotoFromRepo.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repository.Delete(userPhotoFromRepo);
            }

            if (userPhotoFromRepo.public_id == null)
                _repository.Delete(userPhotoFromRepo);

            if (await _repository.SaveAll())
                return Ok();
            return BadRequest("Nie udało się usunąć zdjęcia");
        }
    }
}