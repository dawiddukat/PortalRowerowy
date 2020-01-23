using System.Threading.Tasks;

namespace PortalRowerowy.API.Data
{
    public interface IGenericRepository
    {
         void Add<T>(T entity) where T: class; //metoda generyczna
         void Delete<T>(T entity) where T:class;
         Task<bool> SaveAll();
    }
}