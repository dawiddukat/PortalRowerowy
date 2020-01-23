using System;
using System.Collections.Generic;

namespace PortalRowerowy.API.Models
{
    public class SellBicycle
    {
        public int Id { get; set; }

        public string Url { get; set; }
        
        public ICollection<SellBicyclePhoto> SellBicyclePhotos { get; set; }

        public int Price { get; set; }

        public string TypeBicycle { get; set; }

        //public string Voivodeship { get; set; }
        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

    }
}