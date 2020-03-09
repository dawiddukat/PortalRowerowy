using System;
using Microsoft.AspNetCore.Http;

namespace PortalRowerowy.API.Dtos
{
    public class SellBicyclePhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set;}
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public SellBicyclePhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}