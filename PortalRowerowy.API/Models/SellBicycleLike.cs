namespace PortalRowerowy.API.Models
{
    public class SellBicycleLike
    {
        public int UserLikesSellBicycleId { get; set; } // użytkownik lubi wyprawę
        public int SellBicycleIsLikedId { get; set; } // wyprawa jest lubiana przez kogoś
        public User UserLikesSellBicycle { get; set; }

        public SellBicycle SellBicycleIsLiked { get; set; }


        // public int UserLikesId { get; set; } // użytkownik lubi kogoś
        // public int UserIsLikedId { get; set; } // użytkownik jest lubiany przez kogoś
        // public User UserLikes1 { get; set; }
        // public Adventure UserIsLiked1 { get; set; }


    }
}