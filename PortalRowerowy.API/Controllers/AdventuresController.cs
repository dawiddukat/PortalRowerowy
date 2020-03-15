using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using PortalRowerowy.API.Data;
using PortalRowerowy.API.Dtos;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Controllers
{
        [ServiceFilter(typeof(LogUserActivity))]

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdventuresController : ControllerBase
    {
        private readonly IAdventureRepository _repo;
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public AdventuresController(IUserRepository repository, IAdventureRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _repository = repository;
        }


        [HttpPost("add/")]
        public async Task<IActionResult> Add(int userId, AdventureForAddDto adventureForAddDto)
        {
            //if (!ModelState.IsValid)
            //return BadRequest(ModelState);

            adventureForAddDto.adventureName = adventureForAddDto.adventureName.ToLower(); //z małych liter użytkownik

            var adventureToCreate = _mapper.Map<Adventure>(adventureForAddDto);

            var createdAdventure = await _repo.Add(adventureToCreate);

            var adventureToReturn = _mapper.Map<AdventureForDetailedDto>(createdAdventure);

            return CreatedAtRoute("GetAdventure", new { controller = "Adventures", Id = createdAdventure.Id }, adventureToReturn);
        }

        [HttpGet] //pobieranie wszystkich rowerów
        public async Task<IActionResult> GetAdventures([FromQuery]AdventureParams adventureParams)
        {
            var adventures = await _repo.GetAdventures(adventureParams);

            var adventuresToReturn = _mapper.Map<IEnumerable<AdventureForListDto>>(adventures);

            Response.AddPagination(adventures.CurrentPage, adventures.PageSize, adventures.TotalCount, adventures.TotalPages);

            return Ok(adventuresToReturn);
        }

        [HttpGet("{id}", Name = "GetAdventure")] //pobieranie roweru
        public async Task<IActionResult> GetAdventure(int id)
        {
            var adventure = await _repo.GetAdventure(id);

            var adventureToReturn = _mapper.Map<AdventureForDetailedDto>(adventure);

            return Ok(adventureToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAdventure(int id, AdventureForUpdateDto adventureForUpdateDto)
        {
            // if (id != int.Parse(Adventure.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var adventureFromRepo = await _repo.GetAdventure(id);

            _mapper.Map(adventureForUpdateDto, adventureFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Aktualizacja użytkownika o id: {id} nie powiodła sie przy zapisywaniu do bazy");
        }



        [HttpPost("{recipientAdventureId}/likeadventure/{id}")]
        public async Task<IActionResult> LikeAdventure(int id, int recipientAdventureId)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var like = await _repo.GetAdventureLike(id, recipientAdventureId);

            if (like != null)
            {
                _repo.Delete<AdventureLike>(like);
                return BadRequest("Już nie lubisz tej wyprawy!");
            }

            if (await _repo.GetAdventure(recipientAdventureId) == null)
                return NotFound();

            like = new AdventureLike
            {
                UserLikesAdventureId = id,
                AdventureIsLikedId = recipientAdventureId
            };

            _repo.Add<AdventureLike>(like);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Nie można polubić użytkownika");
        }
    }
}