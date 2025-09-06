using LandMaster.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;


namespace LandMaster.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>


    {
        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Feedback> Feedbacks { get; set; } = null!;
        public  DbSet<User> Users { get; set; } = null!;
        public DbSet<LandRequirement> LandRequirements { get; set; } = null!;
        public DbSet<Property> Properties { get; set; } = null!;
    }
}