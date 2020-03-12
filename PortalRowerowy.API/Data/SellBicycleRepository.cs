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
            var sellBicycle = await _context.SellBicycles.Include(s => s.SellBicyclePhotos).FirstOrDefaultAsync(b => b.Id == id); //jak przypisać Adventures, SellBicyclePhotos, SellBicycles??
            return sellBicycle;
        }

        public async Task<PagesList<SellBicycle>> GetSellBicycles(SellBicycleParams sellBicycleParams)
        {
            var sellBicycles = _context.SellBicycles.Include(s => s.SellBicyclePhotos).OrderByDescending(s => s.DateAdded).AsQueryable();
            
            if (!string.IsNullOrEmpty(sellBicycleParams.OrderBy))
            {
                switch (sellBicycleParams.OrderBy)
                {
                    case "created":
                        sellBicycles = sellBicycles.OrderByDescending(a => a.DateAdded);
                        break;
                    default:
                        sellBicycles = sellBicycles.OrderByDescending(a => a.Price);
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
    }
}