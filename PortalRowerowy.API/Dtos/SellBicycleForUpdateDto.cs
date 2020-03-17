using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class SellBicycleForUpdateDto
    {

        public string SellBicycleName { get; set; }
        public int Price { get; set; }
        public string TypeBicycle { get; set; }
        //public string Voivodeship { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
    }
}