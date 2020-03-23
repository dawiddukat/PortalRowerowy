using System;
using System.Collections.Generic;

namespace PortalRowerowy.API.Models
{
    public class SellBicycle
    {
        public int Id { get; set; }
        public string SellBicycleName { get; set; }
        public string Url { get; set; }
        public ICollection<SellBicyclePhoto> SellBicyclePhotos { get; set; }
        public int Price { get; set; }
        public string TypeBicycle { get; set; }
        //public string Voivodeship { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public User User { get; set; }
        public ICollection<SellBicycleLike> UserLikesSellBicycle { get; set; } // wyprawa jest lubiana
        public int UserId { get; set; }

        // public string City { get { return User.City; } }

    }
}