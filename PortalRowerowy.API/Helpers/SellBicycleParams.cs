namespace PortalRowerowy.API.Helpers
{
    public class SellBicycleParams
    {
        public const int MaxPageSize = 24;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 12;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public string TypeBicycle { get; set; } = "Wszystkie";
        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } = 10000;
        // public string OrderBy { get; set; }
        // public bool UserLikes { get; set; } = false;
        // public bool UserIsLiked { get; set; } = false;
        // public bool UserLikesAdventure { get; set; } = false;
        // public bool AdventureIsLiked { get; set; } = false;


    }
}