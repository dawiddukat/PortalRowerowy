using System;

namespace PortalRowerowy.API.Models
{
    public class AdventurePhoto
    {

        public int Id { get; set; }

        public string Url { get; set; }

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public bool IsMain { get; set; }
        public Adventure Adventure { get; set; }
        public int AdventureId { get; set; }
        public string public_id { get; set;}
    }
}