using System.Collections.Generic;
using System.Threading.Tasks;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public interface ISellBicycleRepository : IGenericRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}