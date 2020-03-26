using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public class SellBicycleRepository : GenericRepository, ISellBicycleRepository
    {
        private readonly DataContext _context;
        public SellBicycleRepository(DataContext context) : base(context)
        {
            _context = context;

        }

        public async Task<SellBicycle> GetSellBicycle(int id)
        {
            var sellBicycle = await _context.SellBicycles.Include(s => s.SellBicyclePhotos).Include(u => u.User).FirstOrDefaultAsync(b => b.Id == id); //jak przypisać Adventures, SellBicyclePhotos, SellBicycles??
            return sellBicycle;
        }

        public async Task<PagesList<SellBicycle>> GetSellBicycles(SellBicycleParams sellBicycleParams)
        {
            var sellBicycles = _context.SellBicycles.Include(s => s.SellBicyclePhotos).Include(u => u.User).OrderByDescending(s => s.DateAdded).AsQueryable();

            if (sellBicycleParams.MinPrice != 0 || sellBicycleParams.MaxPrice != 10000)
            {
                var minPrice = (sellBicycleParams.MinPrice);
                var maxPrice = (sellBicycleParams.MaxPrice);
                sellBicycles = sellBicycles.Where(s => s.Price >= minPrice && s.Price <= maxPrice);
            }

            if (sellBicycleParams.TypeBicycle != "Wszystkie")
                sellBicycles = sellBicycles.Where(a => a.TypeBicycle == sellBicycleParams.TypeBicycle);


            if (sellBicycleParams.UserLikesSellBicycle)
            {
                // var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var userLikesAdventure = await GetSellBicycleLikes(sellBicycleParams.UserId, sellBicycleParams.SellBicycleIsLiked);
                sellBicycles = sellBicycles.Where(u => userLikesAdventure.Contains(u.Id));
            }

            if (sellBicycleParams.SellBicycleIsLiked)
            {
                // var UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

                var adventureIsLiked = await GetSellBicycleLikes(sellBicycleParams.UserId, sellBicycleParams.UserLikesSellBicycle);
                sellBicycles = sellBicycles.Where(u => adventureIsLiked.Contains(u.Id));
            }

            if (!string.IsNullOrEmpty(sellBicycleParams.OrderBy))
            {
                switch (sellBicycleParams.OrderBy)
                {
                    case "dateAdded":
                        sellBicycles = sellBicycles.OrderByDescending(a => a.DateAdded);
                        break;
                    default:
                        sellBicycles = sellBicycles.OrderBy(a => a.Price);
                        break;
                }
            }


            return await PagesList<SellBicycle>.CreateListAsync(sellBicycles, sellBicycleParams.PageNumber, sellBicycleParams.PageSize);
        }

        public async Task<SellBicyclePhoto> GetSellBicyclePhoto(int id)
        {
            var sellBicyclePhoto = await _context.SellBicyclePhotos.FirstOrDefaultAsync(p => p.Id == id);
            return sellBicyclePhoto;
        }

        public async Task<SellBicyclePhoto> GetMainPhotoForSellBicycle(int sellBicycleId)
        {
            return await _context.SellBicyclePhotos.Where(s => s.SellBicycleId == sellBicycleId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<SellBicycle> Add(SellBicycle sellBicycle) //dodanie wyprawy
        {
            // byte[] passwordHash, passwordSalt;
            // CreatePasswordHashSalt(password, out passwordHash, out passwordSalt);

            // user.PasswordHash = passwordHash;
            // user.PasswordSalt = passwordSalt;

            await _context.SellBicycles.AddAsync(sellBicycle);
            await _context.SaveChangesAsync();

            return sellBicycle;
        }

        public async Task<SellBicycleLike> GetSellBicycleLike(int userId, int recipientSellBicycleId)
        {
            return await _context.SellBicycleLikes
            .FirstOrDefaultAsync(u => u.UserLikesSellBicycleId == userId && u.SellBicycleIsLikedId == recipientSellBicycleId);
        }


        private async Task<IEnumerable<int>> GetSellBicycleLikes(int id, bool userLikesSellBicycle)
        {
            var sellBicycle = await _context.SellBicycles
            .Include(x => x.UserLikesSellBicycle)
            .FirstOrDefaultAsync(u => u.Id == id);

            // var user = await _context.Users
            // .Include(x => x.AdventureIsLiked)
            // .FirstOrDefaultAsync(u => u.Id == id);

            if (userLikesSellBicycle)
            {
                return sellBicycle.UserLikesSellBicycle.Where(u => u.SellBicycleIsLikedId == id)
                .Select(i => i.UserLikesSellBicycleId);
            }
            else
            {
                return sellBicycle.UserLikesSellBicycle.Where(u => u.SellBicycleIsLikedId == id)
                .Select(i => i.UserLikesSellBicycleId);

            }
        }
    }
}