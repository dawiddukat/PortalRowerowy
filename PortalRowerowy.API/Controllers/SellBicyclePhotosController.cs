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
    [Route("api/sellbicycles/{sellBicycleId}/photos")]
    [ApiController]
    public class SellBicyclePhotosController : ControllerBase
    {
        private readonly ISellBicycleRepository _repository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public SellBicyclePhotosController(ISellBicycleRepository repository, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
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
        public async Task<IActionResult> AddPhotoForSellBicycle(int sellBicycleId, [FromForm]SellBicyclePhotoForCreationDto sellBicyclePhotoForCreationDto)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            // var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            // if (UserId != sellBicycleForUpdateDto.UserId)
            //     return Unauthorized();

            var sellBicycleFromRepo = await _repository.GetSellBicycle(sellBicycleId);

            var file = sellBicyclePhotoForCreationDto.File;
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

            sellBicyclePhotoForCreationDto.Url = uploadResult.Uri.ToString();
            sellBicyclePhotoForCreationDto.PublicId = uploadResult.PublicId;

            var sellBicyclePhoto = _mapper.Map<SellBicyclePhoto>(sellBicyclePhotoForCreationDto);

            if (!sellBicycleFromRepo.SellBicyclePhotos.Any(p => p.IsMain))
                sellBicyclePhoto.IsMain = true;

            sellBicycleFromRepo.SellBicyclePhotos.Add(sellBicyclePhoto);

            if (await _repository.SaveAll())
            {
                var sellBicyclePhotoToReturn = _mapper.Map<SellBicyclePhotoForReturnDto>(sellBicyclePhoto);
                return CreatedAtRoute("GetSellBicyclePhoto", new { id = sellBicyclePhoto.Id }, sellBicyclePhotoToReturn);

            }

            return BadRequest("Nie można dodać zdjęcia");
        }


        [HttpGet("{id}", Name = "GetSellBicyclePhoto")]

        public async Task<IActionResult> GetSellBicyclePhoto(int id)
        {
            var sellBicyclePhotoFromRepo = await _repository.GetSellBicyclePhoto(id);

            var sellBicyclePhotoForReturn = _mapper.Map<SellBicyclePhotoForReturnDto>(sellBicyclePhotoFromRepo);

            return Ok(sellBicyclePhotoForReturn);
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainSellBicyclePhoto(int sellBicycleId, int id)
        {
            // if (adventureId != int.Parse(Adventure.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var sellBicycle = await _repository.GetSellBicycle(sellBicycleId);

            if (!sellBicycle.SellBicyclePhotos.Any(p => p.Id == id))
                return Unauthorized();

            var sellBicyclePhotoFromRepo = await _repository.GetSellBicyclePhoto(id);

            if (sellBicyclePhotoFromRepo.IsMain)
                return BadRequest("To już jest główne zdjęcie!");

            var currentMainSellBicyclePhoto = await _repository.GetMainPhotoForSellBicycle(sellBicycleId);
            currentMainSellBicyclePhoto.IsMain = false;
            sellBicyclePhotoFromRepo.IsMain = true;

            if (await _repository.SaveAll())
                return NoContent();

            return BadRequest("Nie można ustawić zdjęcia jako głównego!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSellBicyclePhoto(int sellBicycleId, int id)
        {
            // if (adventureId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var sellBicycle = await _repository.GetSellBicycle(sellBicycleId);

            if (!sellBicycle.SellBicyclePhotos.Any(p => p.Id == id))
                return Unauthorized();

            var sellBicyclePhotoFromRepo = await _repository.GetSellBicyclePhoto(id);

            var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (UserId != sellBicycle.UserId)
                return Unauthorized();


            if (sellBicyclePhotoFromRepo.IsMain)
                return BadRequest("Nie można usunąć zdjęcia głównego!");

            if (sellBicyclePhotoFromRepo.public_id != null)
            {
                var deleteParams = new DeletionParams(sellBicyclePhotoFromRepo.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repository.Delete(sellBicyclePhotoFromRepo);
            }

            if (sellBicyclePhotoFromRepo.public_id == null)
                _repository.Delete(sellBicyclePhotoFromRepo);

            if (await _repository.SaveAll())
                return Ok();
            return BadRequest("Nie udało się usunąć zdjęcia");
        }
    }
}