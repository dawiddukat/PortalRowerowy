using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class SellBicycleForListDto
    {
        public int Id { get; set; }
        public string SellBicycleName { get; set; }
        public string Url { get; set; }
        //public ICollection<SellBicyclePhoto> SellBicyclePhotos { get; set; }
        public int Price { get; set; }
        public string TypeBicycle { get; set; }
        //public string Voivodeship { get; set; }
        //public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public int UserId { get; set; }
        public string PhotoUrl { get; set; }
    }
}