using System.Text.Json.Serialization;
using LandMaster.Models;

namespace LandMaster.Models
{
    public class Feedback
    {

        public int FeedbackId { get; set; }

        public int UserId { get; set; }

        // [ForeignKey("UserId")]
        //[JsonIgnore]
        public User? User { get; set; }

        public string FeedbackText { get; set; }
        //[JsonIgnore]
        public DateTime Date { get; set; }

    }

}