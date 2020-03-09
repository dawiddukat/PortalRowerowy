using System;
using System.Collections.Generic;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Dtos
{
    public class AdventureForUpdateDto
    {
        public string adventureName { get; set; }
        public int Distance { get; set; }
        public string Description { get; set; }
    
    // public int UserId { get; set; }
    }
}