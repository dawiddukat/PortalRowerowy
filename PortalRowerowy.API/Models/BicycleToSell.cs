using System;
using System.Collections.Generic;

namespace PortalRowerowy.API.Models
{
    public class BicycleToSell
    {
        public int Id { get; set; }

        //public string Url { get; set; }
        
        public ICollection<PhotoBicycleToSell> PhotosBicycleToSell { get; set; }

        public int Price { get; set; }

        public string BicycleType { get; set; }
        //public string Voivodeship { get; set; }
        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

    }
}