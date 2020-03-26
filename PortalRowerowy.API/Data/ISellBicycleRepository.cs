using System.Collections.Generic;
using System.Threading.Tasks;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public interface ISellBicycleRepository : IGenericRepository
    {
        Task<PagesList<SellBicycle>> GetSellBicycles(SellBicycleParams sellBicycleParams);
        Task<SellBicycle> GetSellBicycle(int id);

        Task<SellBicyclePhoto> GetSellBicyclePhoto(int id);
        Task<SellBicyclePhoto> GetMainPhotoForSellBicycle(int sellBicycleId);
        Task<SellBicycleLike> GetSellBicycleLike(int userId, int recipientSellBicycleId);
        Task<SellBicycle> Add(SellBicycle sellBicycle);

    }
}