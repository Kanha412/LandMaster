using System;

namespace LandMaster.Models
{
    public class LandRequirement
    {
        public int LandRequirementId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Location { get; set; }

        public double AreaSize { get; set; }

        public DateTime PostedDate { get; set; }

        public string Status { get; set; }
    }
}