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
    [Route("api/adventures/{adventureId}/photos")]
    [ApiController]
    public class AdventurePhotosController : ControllerBase
    {
        private readonly IAdventureRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public AdventurePhotosController(IAdventureRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
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
        public async Task<IActionResult> AddPhotoForAdventure(int adventureId, [FromForm]AdventurePhotoForCreationDto adventurePhotoForCreationDto)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var adventureFromRepo = await _repository.GetAdventure(adventureId);

            var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (UserId != adventureFromRepo.UserId)
                return Unauthorized();

            var file = adventurePhotoForCreationDto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            adventurePhotoForCreationDto.Url = uploadResult.Uri.ToString();
            adventurePhotoForCreationDto.PublicId = uploadResult.PublicId;

            var adventurePhoto = _mapper.Map<AdventurePhoto>(adventurePhotoForCreationDto);

            if (!adventureFromRepo.AdventurePhotos.Any(p => p.IsMain))
                adventurePhoto.IsMain = true;

            adventureFromRepo.AdventurePhotos.Add(adventurePhoto);

            if (await _repository.SaveAll())
            {
                var adventurePhotoToReturn = _mapper.Map<AdventurePhotoForReturnDto>(adventurePhoto);
                return CreatedAtRoute("GetAdventurePhoto", new { id = adventurePhoto.Id }, adventurePhotoToReturn);

            }

            return BadRequest("Nie można dodać zdjęcia");
        }


        [HttpGet("{id}", Name = "GetAdventurePhoto")]

        public async Task<IActionResult> GetAdventurePhoto(int id)
        {
            var adventurePhotoFromRepo = await _repository.GetAdventurePhoto(id);

            var adventurePhotoForReturn = _mapper.Map<AdventurePhotoForReturnDto>(adventurePhotoFromRepo);

            return Ok(adventurePhotoForReturn);
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainAdventurePhoto(int adventureId, int id)
        {
            // if (adventureId != int.Parse(Adventure.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var adventure = await _repository.GetAdventure(adventureId);

            var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (UserId != adventure.UserId)
                return Unauthorized();


            if (!adventure.AdventurePhotos.Any(p => p.Id == id))
                return Unauthorized();

            var adventurePhotoFromRepo = await _repository.GetAdventurePhoto(id);

            if (adventurePhotoFromRepo.IsMain)
                return BadRequest("To już jest główne zdjęcie!");

            var currentMainAdventurePhoto = await _repository.GetMainPhotoForAdventure(adventureId);
            currentMainAdventurePhoto.IsMain = false;
            adventurePhotoFromRepo.IsMain = true;

            if (await _repository.SaveAll())
                return NoContent();

            return BadRequest("Nie można ustawić zdjęcia jako głównego!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdventurePhoto(int adventureId, int id)
        {
            // if (adventureId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var adventure = await _repository.GetAdventure(adventureId);

            var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (UserId != adventure.UserId)
                return Unauthorized();

            if (!adventure.AdventurePhotos.Any(p => p.Id == id))
                return Unauthorized();

            var adventurePhotoFromRepo = await _repository.GetAdventurePhoto(id);

            if (adventurePhotoFromRepo.IsMain)
                return BadRequest("Nie można usunąć zdjęcia głównego!");

            if (adventurePhotoFromRepo.public_id != null)
            {
                var deleteParams = new DeletionParams(adventurePhotoFromRepo.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repository.Delete(adventurePhotoFromRepo);
            }

            if (adventurePhotoFromRepo.public_id == null)
                _repository.Delete(adventurePhotoFromRepo);

            if (await _repository.SaveAll())
                return Ok();
            return BadRequest("Nie udało się usunąć zdjęcia");
        }
    }
}