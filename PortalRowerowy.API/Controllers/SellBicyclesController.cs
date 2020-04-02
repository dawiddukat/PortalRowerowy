using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalRowerowy.API.Data;
using PortalRowerowy.API.Dtos;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SellBicyclesController : ControllerBase
    {
        private readonly ISellBicycleRepository _repo;
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public SellBicyclesController(IUserRepository repository, ISellBicycleRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _repository = repository;

        }

        [HttpGet] //pobieranie wszystkich rowerów
        public async Task<IActionResult> GetBicycles([FromQuery]SellBicycleParams sellBicycleParams)
        {
            sellBicycleParams.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var sellBicycles = await _repo.GetSellBicycles(sellBicycleParams);

            var sellBicyclesToReturn = _mapper.Map<IEnumerable<SellBicycleForListDto>>(sellBicycles);

            Response.AddPagination(sellBicycles.CurrentPage, sellBicycles.PageSize, sellBicycles.TotalCount, sellBicycles.TotalPages);

            return Ok(sellBicyclesToReturn);
        }

        [HttpGet("{id}", Name = "GetSellBicycle")] //pobieranie roweru
        public async Task<IActionResult> GetSellBicycle(int id)
        {
            var sellBicycle = await _repo.GetSellBicycle(id);

            var sellBicycleToReturn = _mapper.Map<SellBicycleForDetailedDto>(sellBicycle);

            return Ok(sellBicycleToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSellBicycle(int id, SellBicycleForUpdateDto sellBicycleForUpdateDto)
        {
            // if (id != int.Parse(Adventure.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (UserId != sellBicycleForUpdateDto.UserId)
                return Unauthorized();

            var sellBicycleFromRepo = await _repo.GetSellBicycle(id);

            _mapper.Map(sellBicycleForUpdateDto, sellBicycleFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Aktualizacja użytkownika o id: {id} nie powiodła sie przy zapisywaniu do bazy");
        }

        [HttpPost("add/")]
        public async Task<IActionResult> Add(int userId, SellBicycleForAddDto sellBicycleForAddDto)
        {
            //if (!ModelState.IsValid)
            //return BadRequest(ModelState);
            var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            sellBicycleForAddDto.sellBicycleName = sellBicycleForAddDto.sellBicycleName; //z małych liter użytkownik

            sellBicycleForAddDto.UserId = UserId;

            var sellBicycleToCreate = _mapper.Map<SellBicycle>(sellBicycleForAddDto);

            var createdSellBicycle = await _repo.Add(sellBicycleToCreate);

            var sellBicycleToReturn = _mapper.Map<SellBicycleForDetailedDto>(createdSellBicycle);
            return CreatedAtRoute("GetSellBicycle", new { controller = "SellBicycles", Id = createdSellBicycle.Id }, sellBicycleToReturn);
        }

        [HttpPost("{id}/likesellbicycle/{recipientSellBicycleId}")]
        public async Task<IActionResult> LikeSellBicycle(int id, int recipientSellBicycleId)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var like = await _repo.GetSellBicycleLike(id, recipientSellBicycleId);

            if (like != null)
            {
                _repo.Delete<SellBicycleLike>(like);
                await _repo.SaveAll();
                return BadRequest("Już nie obserwujesz tego roweru!");
            }
            else
            {
                if (await _repo.GetSellBicycle(recipientSellBicycleId) == null)
                    return NotFound();

                like = new SellBicycleLike
                {
                    UserLikesSellBicycleId = id,
                    SellBicycleIsLikedId = recipientSellBicycleId
                };

                _repo.Add<SellBicycleLike>(like);

                if (await _repo.SaveAll())
                    return Ok();
            }
            return BadRequest("Nie można polubić użytkownika");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSellBicycle(/*int userId,*/ int id)
        {
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            // var adventure = await _repo.GetAdventure(id);

            // if (!user.UserPhotos.Any(p => p.Id == id))
            //     return Unauthorized();


            var sellBicycleFromRepo = await _repo.GetSellBicycle(id);

            var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (UserId != sellBicycleFromRepo.UserId)
                return Unauthorized();


            if (sellBicycleFromRepo != null)
                _repo.Delete(sellBicycleFromRepo);

            if (await _repo.SaveAll())
                return Ok();
            return BadRequest("Nie udało się usunąć zdjęcia");
        }
    }

}