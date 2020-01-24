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



    }
}