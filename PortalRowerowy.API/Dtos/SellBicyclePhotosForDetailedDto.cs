using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class SellBicyclePhotosForDetailedDto
    {
        public int Id { get; set; }
        //public DateTime DateAdded { get; set; }
        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        //public int UserId { get; set; }
    }
}