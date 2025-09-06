using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace LandMaster.Models
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(30)]
        public string? Name { get; set; }
    }
}