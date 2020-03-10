using System.Collections.Generic;
using System.Threading.Tasks;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public interface ISellBicycleRepository : IGenericRepository
    {
        Task<IEnumerable<SellBicycle>> GetSellBicycles();
        Task<SellBicycle> GetSellBicycle(int id);

        Task<SellBicyclePhoto> GetSellBicyclePhoto(int id);
        Task<SellBicyclePhoto> GetMainPhotoForSellBicycle(int sellBicycleId);

    }
}