using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PortalRowerowy.API.Data;
using PortalRowerowy.API.Dtos;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        public AuthController(IAuthRepository repository)
        {
            _repository =  repository;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(/*[FromBody]*/UserForRegisterDto userForRegisterDto)
        {   
            //if (!ModelState.IsValid)
            //return BadRequest(ModelState);

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower(); //z małych liter użytkownik

            if (await _repository.UserExist(userForRegisterDto.Username))
                return BadRequest("Użytkownik o takiej nazwie już istnieje!");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }
    }
}