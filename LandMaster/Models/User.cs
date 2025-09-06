using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace LandMaster.Models
{

    public class User
    {

        public int UserId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Username { get; set; }

        public string MobileNumber { get; set; }
        //[JsonIgnore]
        public string UserRole { get; set; }
        // public ICollection<Feedback> Feedbacks{get;set;}
        // public ICollection<Property> Properties{get;set;}

    }

}
