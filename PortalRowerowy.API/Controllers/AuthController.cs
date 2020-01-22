using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PortalRowerowy.API.Data;
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
        public async Task<IActionResult> Register(string username, string password)
        {
            username = username.ToLower(); //z małych liter użytkownik

            if (await _repository.UserExist(username))
                return BadRequest("Użytkownik o takiej nazwie już istnieje!");

            var userToCreate = new User
            {
                Username = username
            };

            var createdUser = await _repository.Register(userToCreate, password);

            return StatusCode(201);
        }
    }
}