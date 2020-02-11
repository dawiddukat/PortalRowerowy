using System.Collections.Generic;
using System.Threading.Tasks;
using PortalRowerowy.API.Helpers;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public interface IUserRepository : IGenericRepository
    {
        Task<PagesList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser(int id);
        Task<UserPhoto> GetUserPhoto(int id);
        Task<UserPhoto> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int recipientId);
        Task<Message> GetMessage(int id);
        Task<PagesList<Message>> GetMessagesForUser();
        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}