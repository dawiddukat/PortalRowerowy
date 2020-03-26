namespace PortalRowerowy.API.Helpers
{
    public class UserParams
    {
        public const int MaxPageSize = 24;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 12;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }


        public int UserId { get; set; }
        public string Gender { get; set; } = "Wszystkie";
        public string TypeBicycle { get; set; } = "Wszystkie";
        public int MinAge { get; set; } = 0;
        public int MaxAge { get; set; } = 100;
        public string OrderBy { get; set; }
        public bool UserLikes { get; set; } = false;
        public bool UserIsLiked { get; set; } = false;




        public bool UserLikesAdventure { get; set; } = false;
        public bool AdventureIsLiked { get; set; } = false;

        public bool UserLikesSellBicycle { get; set; } = false;
        public bool SellBicycleIsLiked { get; set; } = false;



    }
}