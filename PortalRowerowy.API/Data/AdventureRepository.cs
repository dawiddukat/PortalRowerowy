using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public class AdventureRepository : GenericRepository, IAdventureRepository
    {
        private readonly DataContext _context;
        public AdventureRepository(DataContext context) : base(context)
        {
            _context = context;

        }

        public async Task<Adventure> GetAdventure(int id)
        {
            var adventure = await _context.Adventures.Include(aP => aP.AdventurePhotos).FirstOrDefaultAsync(a => a.Id == id); //jak przypisać Adventures, SellBicyclePhotos, SellBicycles??
            return adventure;
        }

        public async Task<PagesList<Adventure>> GetAdventures(AdventureParams adventureParams)
        {
            var adventures = _context.Adventures
            .Include(aP => aP.AdventurePhotos)
            .OrderByDescending(a => a.DateAdded)
            .AsQueryable();


            // adventures = adventures.Where(a => a.TypeBicycle== adventureParams.TypeBicycle);

            if (adventureParams.MinDistance != 0 || adventureParams.MaxDistance != 10000)
            {
                var minDistance = (adventureParams.MinDistance);
                var maxDistance = (adventureParams.MaxDistance);
                adventures = adventures.Where(a => a.Distance >= minDistance && a.Distance <= maxDistance);
            }

            if (adventureParams.TypeBicycle != "Wszystkie")
                adventures = adventures.Where(a => a.TypeBicycle == adventureParams.TypeBicycle);


            if (!string.IsNullOrEmpty(adventureParams.OrderBy))
            {
                switch (adventureParams.OrderBy)
                {
                    case "dateAdded":
                        adventures = adventures.OrderByDescending(a => a.DateAdded);
                        break;
                    default:
                        adventures = adventures.OrderByDescending(a => a.Distance);
                        break;
                }
            }

            


            return await PagesList<Adventure>.CreateListAsync(adventures, adventureParams.PageNumber, adventureParams.PageSize);
        }

        public async Task<AdventurePhoto> GetAdventurePhoto(int id)
        {
            var adventurePhoto = await _context.AdventurePhotos.FirstOrDefaultAsync(p => p.Id == id);
            return adventurePhoto;
        }

        public async Task<AdventurePhoto> GetMainPhotoForAdventure(int adventureId)
        {
            return await _context.AdventurePhotos.Where(a => a.AdventureId == adventureId).FirstOrDefaultAsync(p => p.IsMain);
        }


        public async Task<AdventureLike> GetAdventureLike(int userId, int recipientAdventureId)
        {
            return await _context.AdventureLikes.FirstOrDefaultAsync(u => u.UserLikesAdventureId == userId && u.AdventureIsLikedId == recipientAdventureId);
        }

        // private async Task<IEnumerable<int>> GetAdventureLikes(int id, bool userLikesAdventure)
        // {
        //     var adventure = await _context.Adventures
        //     // .Include(x => x.AdventureIsLiked)
        //     .Include(x => x.UserLikesAdventure)
        //     .FirstOrDefaultAsync(a => a.Id == id);


        //     var user = await _context.Users
        //     .Include(x => x.AdventureIsLiked)
        //     // .Include(x => x.UserLikesAdventure)
        //     .FirstOrDefaultAsync(u => u.Id == id);


        //     if (userLikesAdventure)
        //     {
        //         return adventure
        //         .UserLikesAdventure.Where(u => u.UserLikesAdventureId == id)
        //         .Select(i => i.AdventureIsLikedId);
        //     }
        //     else
        //     {
        //         return user.AdventureIsLiked.Where(u => u.UserLikesAdventureId == id)
        //         .Select(i => i.AdventureIsLikedId);
        //     }
        // }


    }
}