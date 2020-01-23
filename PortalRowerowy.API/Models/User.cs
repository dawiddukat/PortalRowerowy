using System;
using System.Collections.Generic;

namespace PortalRowerowy.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        //PODSTAWOWE INFORMACJE O UŻYTKOWNIKU

        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string BicycleType { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }   
        public string Country { get; set; }           
        //public string Voivodeship { get; set; }
        //public string County { get; set; }   
        public string City { get; set; }


        //DODATKOWE INFORMACJE - ZAKŁADKA INFO

        public string Bicycles { get; set; }
        public string Profession { get; set; }

        //ZAKŁADKA O MNIE

        public string Description { get; set; }


        //Zakładka PASJE, ZAINTERESOWANIE


        public string Interests { get; set; }

        public string DreamBicycle { get; set;  }


        //ZAKŁADKA ZDJĘCIA

        public ICollection<Photo> Photos { get; set; }

        //Zakładka Ogłoszenia

        public ICollection<BicycleToSell> BicyclesToSell { get; set; }


        //ZAKŁADKA WYPRAWY

        public ICollection<Adventure> Adventures { get; set; }
        




        




        
        

    }
}