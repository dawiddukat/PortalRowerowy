using System;
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
    public class SellBicyclesController : ControllerBase
    {
        private readonly ISellBicycleRepository _repo;
        private readonly IMapper _mapper;

        public SellBicyclesController(ISellBicycleRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet] //pobieranie wszystkich rowerów
        public async Task<IActionResult> GetBicycles()
        {
            var sellBicycles = await _repo.GetSellBicycles();

            var sellBicyclesToReturn = _mapper.Map<IEnumerable<SellBicycleForListDto>>(sellBicycles);

            return Ok(sellBicyclesToReturn);
        }

        [HttpGet("{id}")] //pobieranie roweru
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

            var sellBicycleFromRepo = await _repo.GetSellBicycle(id);

            _mapper.Map(sellBicycleForUpdateDto, sellBicycleFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Aktualizacja użytkownika o id: {id} nie powiodła sie przy zapisywaniu do bazy");
        }
    }
}