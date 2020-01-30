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
        public ICollection<SellBicycleForDetailedDto> SellBicyclePhotos { get; set; }
        public int Price { get; set; }
        public string TypeBicycle { get; set; }
        //public string Voivodeship { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }

        
    }
}