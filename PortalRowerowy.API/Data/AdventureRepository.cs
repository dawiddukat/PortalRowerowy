using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<Adventure>> GetAdventures()
        {
            var adventures = await _context.Adventures.Include(aP => aP.AdventurePhotos).ToListAsync();
            return adventures;
        }

        public async Task<AdventurePhoto> GetAdventurePhoto(int id)
        {
            var adventurePhoto = await _context.AdventurePhotos.FirstOrDefaultAsync(p => p.Id == id);
            return adventurePhoto;
        }

    }
}