using System;
using System.Text;
using System.Threading.Tasks;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        #region method public
        public AuthRepository(DataContext context)
        {
            _context = context;

        }
        public Task<User> Login(string username, string password)
        {
            throw new System.NotImplementedException();
        }

        public async Task<User> Register(User user, string password) //rejestracja użytkownika
        {   
            byte[] passwordHash, passwordSalt;
            CreatePasswordHashSalt(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public Task<bool> UserExist(string username)
        {
            throw new System.NotImplementedException();
        }
        #endregion

        
        #region method private
        private void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }            
        }
        #endregion
    }
}