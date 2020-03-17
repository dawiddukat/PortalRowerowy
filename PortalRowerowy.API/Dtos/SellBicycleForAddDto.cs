using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class SellBicycleForAddDto
    {
        public string sellBicycleName { get; set; }
        public string TypeBicycle { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public int UserId { get; set; }
        public SellBicycleForAddDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}