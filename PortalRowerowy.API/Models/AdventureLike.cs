namespace PortalRowerowy.API.Models
{
    public class AdventureLike
    {
        public int UserLikesAdventureId { get; set; } // użytkownik lubi wyprawę
        public int AdventureIsLikedId { get; set; } // wyprawa jest lubiana przez kogoś
        public User UserLikesAdventure { get; set; }
        public Adventure AdventureIsLiked { get; set; }


        // public int UserLikesId { get; set; } // użytkownik lubi kogoś
        // public int UserIsLikedId { get; set; } // użytkownik jest lubiany przez kogoś
        // public User UserLikes1 { get; set; }
        // public Adventure UserIsLiked1 { get; set; }


    }
}