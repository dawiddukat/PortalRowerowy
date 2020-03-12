using System.Collections.Generic;
using System.Threading.Tasks;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public interface IAdventureRepository : IGenericRepository
    {
        Task<PagesList<Adventure>> GetAdventures(AdventureParams adventureParams);
        Task<Adventure> GetAdventure(int id);
        Task<AdventurePhoto> GetAdventurePhoto(int id);
        Task<AdventurePhoto> GetMainPhotoForAdventure(int adventureId);
        Task<AdventureLike> GetAdventureLike(int userId, int recipientAdventureId);

        
        // Task<AdventureLike> GetAdventureLikes(int adventureId, int userId);
    }
}