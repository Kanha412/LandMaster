using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;
using LandMaster.Models;


namespace LandMaster.Models
{
    public class Property
    {
        public int PropertyId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public double AreaSize { get; set; }
        public decimal Price { get; set; }
        public DateTime PostedDate { get; set; }
        public string Status { get; set; }
        public int NumberOfOwners { get; set; }
        public bool IsDtcpApproved { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }

    }

}
