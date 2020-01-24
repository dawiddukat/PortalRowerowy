using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class AdventureForDetailedDto
    {
        public int Id { get; set; }

        //public string Url { get; set; }

        public ICollection<AdventurePhoto> AdventurePhotos { get; set; }
        public int Distance { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
    }
}