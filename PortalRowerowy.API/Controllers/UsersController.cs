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
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet] //pobieranie wszystkich użytkowników
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
            var users = await _repo.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")] //pobieranie użytkownika
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Aktualizacja użytkowniak o id: {id} nie powiodła się przy zapisywaniu do bazy.");
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await _repo.GetLike(id, recipientId);

            if (like != null)
            {
                _repo.Delete<Like>(like);
                return NotFound("Już nie lubisz tego użytkownika!");
            }

            if (await _repo.GetUser(recipientId) == null)
                return NotFound();

            like = new Like
            {
                UserLikesId = id,
                UserIsLikedId = recipientId
            };

            _repo.Add<Like>(like);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Nie można polubić użytkownika");
        }

        // [HttpPost("{id}/likeadventure/{recipientAdventureId}")]
        // public async Task<IActionResult> LikeAdventure(int id, int recipientAdventureId)
        // {
        //     if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();

        //     var like = await _repo.GetAdventureLike(id, recipientAdventureId);

        //     if (like != null)
        //     {
        //         _repo.Delete<AdventureLike>(like);
        //         return BadRequest("Już nie lubisz tej wyprawy!");
        //     }

        //     if (await _repo.GetAdventure(recipientAdventureId) == null)
        //         return NotFound();

        //     like = new AdventureLike
        //     {
        //         UserLikesAdventureId = id,
        //         AdventureIsLikedId = recipientAdventureId
        //     };

        //     _repo.Add<AdventureLike>(like);

        //     if (await _repo.SaveAll())
        //         return Ok();

        //     return BadRequest("Nie można polubić użytkownika");
        // }
    }
}