using LandMaster.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Runtime.CompilerServices;
using System.Runtime.Versioning;
using System.Threading.Tasks;
using LandMaster.Models;

namespace LandMaster.Services

{
    // Service class to handle CRUD operations for Property entities
    public class PropertyService
    {
        private ApplicationDbContext _context; // Private field to hold the database context


        // Constructor to initialize the database context
        public PropertyService(ApplicationDbContext context)
        {
            _context = context;
        }

        /*GetAllProperties Method
        Retrieves all properties from the database asynchronously
        Returns an IEnumerable collection of Property objects*/
        public async Task<IEnumerable<Property>> GetAllProperties()
        {
            // Fetches the list of properties from the database asynchronously
            IEnumerable<Property> properties = await _context.Properties.ToListAsync();
            return properties; // Returns the list of properties
        }

        /* GetPropertyById Method
        Retrieves a property by its ID from the database asynchronously
        Returns a single Property object if found, otherwise null */
        public async Task<Property> GetPropertyById(int propertyId)
        {
            // Fetches the property by ID from the database asynchronously
            Property property = await _context.Properties.FindAsync(propertyId);
            if (property != null)
            {
                return property; // Returns the property if found
            }
            return null; // Returns null if property is not found
        }

        /* AddProperty Method
        Adds a new property to the database asynchronously
        Takes a Property object as a parameter */
        public async Task AddProperty(Property property)
        {
            // Adds the property to the database context asynchronously
            await _context.Properties.AddAsync(property);
            // Saves the changes to the database asynchronously
            await _context.SaveChangesAsync();
        }

        /* UpdateProperty Method
        Updates an existing property in the database asynchronously
        Takes the property ID and a Property object as parameters
        Returns a boolean indicating success or failure */
        public async Task<bool> UpdateProperty(int propertyId, Property property)
        {
            // Fetches the existing property by ID from the database asynchronously
            Property oldProperty = await _context.Properties.FindAsync(propertyId);
            if (oldProperty != null)
            {
                // Sets the current values of the old property to the new property values
                oldProperty.Title = property.Title;
                oldProperty.Description = property.Description;
                oldProperty.Location = property.Location;
                oldProperty.AreaSize = property.AreaSize;
                oldProperty.Price = property.Price;
                oldProperty.PostedDate = property.PostedDate;
                oldProperty.Status = property.Status;
                oldProperty.NumberOfOwners = property.NumberOfOwners;
                oldProperty.IsDtcpApproved = property.IsDtcpApproved;
                // Saves the changes to the database asynchronously
                await _context.SaveChangesAsync();
                return true; // Returns true indicating the update was successful
            }
            return false; // Returns false if the old property was not found
        }

        /* DeleteProperty Method
        Deletes a property from the database asynchronously
        Takes the property ID as a parameter
        Returns a boolean indicating success or failure */
        public async Task<bool> DeleteProperty(int propertyId)
        {
            // Fetches the property by ID from the database asynchronously
            Property property = await _context.Properties.FindAsync(propertyId);
            if (property != null)
            {
                // Removes the property from the database context
                _context.Properties.Remove(property);
                // Saves the changes to the database asynchronously
                await _context.SaveChangesAsync();
                return true; // Returns true indicating the deletion was successful
            }
            return false; // Returns false if the property was not found
        }
        public async Task<IEnumerable<Property>> GetAllPropertiesByUserId(int userId)
        {
            IEnumerable<Property> properties = await _context.Properties.Where(o => o.UserId == userId).ToListAsync();

            // IEnumerable<Property> properties = await _context.Properties.ToListAsync();
            return properties;
        }
    }
}
