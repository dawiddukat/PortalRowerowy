using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalRowerowy.API.Data;
using PortalRowerowy.API.Dtos;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdventuresController : ControllerBase
    {
        private readonly IAdventureRepository _repo;
        private readonly IMapper _mapper;

        public AdventuresController(IAdventureRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet] //pobieranie wszystkich rowerów
        public async Task<IActionResult> GetAdventures()
        {
            var adventures = await _repo.GetAdventures();

            var adventuresToReturn = _mapper.Map<IEnumerable<AdventureForListDto>>(adventures);

            return Ok(adventuresToReturn);
        }

        [HttpGet("{id}")] //pobieranie roweru
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


    }
}