using System;
using System.ComponentModel.DataAnnotations;

namespace PortalRowerowy.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "Nazwa użytkownika jest wymagana!")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Hasło jest wymagane!")]
        [StringLength(12, MinimumLength = 6, ErrorMessage = "Hasło musi się składać od 6 do 12 znaków")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string TypeBicycle { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Voivodeship { get; set; }
        //public string County { get; set; }   
        [Required]
        public string City { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;

            LastActive = DateTime.Now;
        }


    }
}