using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class SellBicycleForDetailedDto
    {
        public int Id { get; set; }
        public string SellBicycleName { get; set; }
        public string Url { get; set; }
        public ICollection<SellBicyclePhotosForDetailedDto> SellBicyclePhotos { get; set; }
        public int Price { get; set; }
        public string TypeBicycle { get; set; }
        //public string Voivodeship { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public int UserId { get; set; }
        public string PhotoUrl { get; set; }

        // public string City { get {return User.City; }}
        public User User { get; set; }
    }
}