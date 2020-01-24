using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
            var sellBicycle = await _context.SellBicycles.Include(s => s.SellBicyclePhotos).FirstOrDefaultAsync(b => b.Id == id); //jak przypisać Adventures, SellBicyclePhotos, SellBicycles??
            return sellBicycle;
        }

        public async Task<IEnumerable<SellBicycle>> GetSellBicycles()
        {
            var sellBicycles = await _context.SellBicycles.Include(s => s.SellBicyclePhotos).ToListAsync();
            return sellBicycles;
        }
    }
}