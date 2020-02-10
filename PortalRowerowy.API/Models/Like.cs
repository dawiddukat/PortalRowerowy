namespace PortalRowerowy.API.Models
{
    public class Like
    {
        public int UserLikesId { get; set; } // użytkownik lubi kogoś
        public int UserIsLikedId { get; set; } // użytkownik jest lubiany przez kogoś
        public User UserLikes { get; set; }
        public User UserIsLiked { get; set; }
    }
}