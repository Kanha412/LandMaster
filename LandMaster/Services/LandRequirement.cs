using LandMaster.Data;
using LandMaster.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using LandMaster.Exceptions;

namespace LandMaster.Services
{
    public class LandRequirementService
    {
        private ApplicationDbContext _context;

        /* 
          Constructor to initialize the database context
          param context: The ApplicationDbContext instance used to interact with the database
         */
        public LandRequirementService(ApplicationDbContext context)
        {
            _context = context;
        }

        /* 
          Retrieves all LandRequirements from the database
         return A list of all LandRequirement objects from the database
         */
        public async Task<IEnumerable<LandRequirement>> GetAllLandRequirements()
        {
            IEnumerable<LandRequirement> list = await _context.LandRequirements.ToListAsync();
            return list;
        }

        /* 
          Retrieves a specific LandRequirement by its ID
          param landRequirementId: The ID of the LandRequirement to retrieve
          return The LandRequirement object if found, otherwise null
         */
        public async Task<LandRequirement> GetLandRequirementById(int landRequirementId)
        {
            LandRequirement landRequirement = await _context.LandRequirements.FindAsync(landRequirementId);
            if (landRequirement != null)
            {
                return landRequirement;
            }
            return null;
        }

        /* 
         Adds a new LandRequirement to the database
         param landRequirement: The LandRequirement object to add
         return True if the requirement is successfully added, otherwise an exception is thrown
         throws RequirementException: If a LandRequirement with the same title already exists
         */
        public async Task<bool> AddLandRequirement(LandRequirement landRequirement)

        {
            LandRequirement land = await _context.LandRequirements.Where(data => data.Title == landRequirement.Title).FirstOrDefaultAsync();
            if (land != null)
            {
                throw new RequirementException("A requirement with the title already exists");
            }
            await _context.LandRequirements.AddAsync(landRequirement);
            await _context.SaveChangesAsync();
            return true; // Return true if the requirement is successfully added
        }

        /* 
          Updates an existing LandRequirement in the database
         param landRequirementId: The ID of the LandRequirement to update
         param landRequirement: The updated LandRequirement object
         return True if the update is successful, otherwise false
         */
        public async Task<bool> UpdateLandRequirement(int landRequirementId, LandRequirement landRequirement)
        {
            LandRequirement oldlandRequirement = await _context.LandRequirements.FindAsync(landRequirementId);
            if (oldlandRequirement != null)
            {


                oldlandRequirement.Title = landRequirement.Title;
                oldlandRequirement.Description = landRequirement.Description;
                oldlandRequirement.Location = landRequirement.Location;
                oldlandRequirement.AreaSize = landRequirement.AreaSize;
                oldlandRequirement.PostedDate = landRequirement.PostedDate;
                oldlandRequirement.Status = landRequirement.Status;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        /* 
          Deletes a LandRequirement from the database
         param landRequirementId: The ID of the LandRequirement to delete
         return True if the deletion is successful, otherwise false
         */
        public async Task<bool> DeleteLandRequirement(int landRequirementId)
        {
            LandRequirement landRequirement = await _context.LandRequirements.FindAsync(landRequirementId);
            if (landRequirement != null)
            {
                _context.LandRequirements.Remove(landRequirement);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
