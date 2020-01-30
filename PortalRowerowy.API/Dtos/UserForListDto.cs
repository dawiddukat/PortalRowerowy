using System;
using System.Collections.Generic;

namespace PortalRowerowy.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        //PODSTAWOWE INFORMACJE O UŻYTKOWNIKU
        public string Gender { get; set; }
        public int Age { get; set; }
        public string TypeBicycle { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Country { get; set; }
        //public string Voivodeship { get; set; }
        //public string County { get; set; }   
        public string City { get; set; }

        public string PhotoUrl { get; set;}
        public ICollection<UserPhotosForDetailedDto> UserPhotos { get; set; }
        
    }
}