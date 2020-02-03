using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
            var user = await _context.Users.Include(p => p.UserPhotos).Include(a => a.Adventures).Include(s => s.SellBicycles).FirstOrDefaultAsync(u => u.Id == id); //jak przypisać Adventures, UserPhotos, SellBicycles??
            return user;
        }



        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.UserPhotos).Include(a => a.Adventures).Include(s => s.SellBicycles).ToListAsync();
            return users;
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
    }
}