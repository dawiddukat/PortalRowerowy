using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PortalRowerowy.API.Data;
using PortalRowerowy.API.Dtos;

namespace PortalRowerowy.API.Controllers
{
    [Authorize]
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



    }
}