using System;
using Microsoft.AspNetCore.Http;

namespace PortalRowerowy.API.Dtos
{
    public class AdventurePhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile File { get; set;}
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public AdventurePhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}