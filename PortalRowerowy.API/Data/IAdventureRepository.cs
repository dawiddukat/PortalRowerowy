using System.Collections.Generic;
using System.Threading.Tasks;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public interface IAdventureRepository : IGenericRepository
    {
        Task<IEnumerable<Adventure>> GetAdventures();
        Task<Adventure> GetAdventure(int id);
    }
}