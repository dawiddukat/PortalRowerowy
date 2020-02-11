using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public class UserRepository : GenericRepository, IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context) : base(context)
        {
            _context = context;

        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.UserPhotos)
            .Include(a => a.Adventures)
            .Include(s => s.SellBicycles)
            .FirstOrDefaultAsync(u => u.Id == id); //jak przypisać Adventures, UserPhotos, SellBicycles??
            return user;
        }



        public async Task<PagesList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(p => p.UserPhotos)
            .Include(a => a.Adventures)
            .Include(s => s.SellBicycles)
            .OrderByDescending(u => u.LastActive)
            .AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);
            //users = users.Where(u => u.Gender == userParams.Gender); //wybieranie płci => UsersController
                        if(userParams.Gender != "Wszystkie")
            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.MinAge != 0 || userParams.MaxAge != 100)
            {
                var minDate = DateTime.Today.AddYears(-userParams.MaxAge -1);
                var maxDate = DateTime.Today.AddYears(-userParams.MinAge);
                users = users.Where(u => u.DateOfBirth >= minDate && u.DateOfBirth <= maxDate);
            }

            if(userParams.TypeBicycle != "Wszystkie")
            users = users.Where(u => u.TypeBicycle == userParams.TypeBicycle);

            if (!string.IsNullOrEmpty(userParams.OrderBy)){
                switch(userParams.OrderBy){
                    case "created": users = users.OrderByDescending(u => u.Created);
                    break;
                    default:
                    users = users.OrderByDescending(u => u.LastActive);
                    break;
                }
            }          




            return await PagesList<User>.CreateListAsync(users, userParams.PageNumber, userParams.PageSize);
        }
        public async Task<UserPhoto> GetUserPhoto(int id)
        {
            var userPhoto = await _context.UserPhotos.FirstOrDefaultAsync(p => p.Id == id);
            return userPhoto;
        }

        public async Task<UserPhoto> GetMainPhotoForUser(int userId)
        {
            return await _context.UserPhotos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.UserLikesId == userId && u.UserIsLikedId == recipientId);
        }
    }
}