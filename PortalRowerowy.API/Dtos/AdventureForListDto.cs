using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class AdventureForListDto
    {
        public ICollection<AdventureForDetailedDto> AdventurePhotos { get; set; }
        
        public string adventureName { get; set; }
       /* public int Distance { get; set; }
        public string Description { get; set; }*/
        public DateTime DateAdded { get; set; }
    }
}