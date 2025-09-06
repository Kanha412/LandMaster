using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using LandMaster.Models;
using LandMaster.Services;


namespace LandMaster.Controllers
{
    [ApiController]
    [Route("api/properties")]
    public class PropertyController : ControllerBase
    {
        private readonly PropertyService _propertyService;
        private readonly ILogger<PropertyController> _logger;

        public PropertyController(PropertyService propertyService, ILogger<PropertyController> logger)
        {
            _propertyService = propertyService;
            _logger = logger;
        }

        /*Method for retrieving all properties
        can be accessed by Admin and User*/

        //[Authorize(Roles = "Admin,User")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Property>>> getAllPropertiesByUserId(int userId)
        {
            try
            {
                /*
                Retrieve all properties from the service.
                If successful, return the list of properties
                */
                var properties = await this._propertyService.GetAllPropertiesByUserId(userId);
                return Ok(properties);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error Fetching properties!", ex);
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> getAllProperties()
        {
            try
            {
                /*
                Retrieve all properties from the service.
                If successful, return the list of properties
                */
                var properties = await this._propertyService.GetAllProperties();
                return Ok(properties);

            }
            catch (Exception ex)
            {
                _logger.LogError("Error Fetching properties!", ex);
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        /*Method for retrieving a specific property by ID
        can be accessed by Admin and User*/

        //[Authorize(Roles = "Admin,User")]
        [HttpGet("{propertyId}")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertyById(int propertyId)
        {
            try
            {
                /*
               Retrieve the property by ID from the service.
               If the property is found, return it
               Else return NotFound
               */
                var p = await this._propertyService.GetPropertyById(propertyId);
                if (p == null)
                {
                    return NotFound(new { res = "Property Not found" });
                }
                return Ok(p);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Fetching property!", ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /*Method for adding a new property
        can be accessed only by User*/

        //[Authorize(Roles = "User")]
        [HttpPost]
        public async Task<ActionResult> AddProperty([FromBody] Property property)
        {
            try
            {
                /*
                Add the new property via the service.
                If successful, return a success message
                */
                await this._propertyService.AddProperty(property);
                return Ok(new { res = "Property added successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Adding property!", ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        /*Method for updating an existing property by propertyId
       can be accessed by User and Admin*/

        //[Authorize(Roles = "User,Admin")]
        [HttpPut("{propertyId}")]
        public async Task<ActionResult> UpdateProperty(int propertyId, [FromBody] Property property)
        {
            try
            {
                /*
                Retrieve the existing property by ID from the service.
                If the property is found, update it
                Else return NotFound
                */
                var propertyfound = await this._propertyService.GetPropertyById(propertyId);
                if (propertyfound != null)
                {
                    var updatedProperty = await this._propertyService.UpdateProperty(propertyId, property);
                    return Ok(new { res = "Property updated successfully" });
                }
                else
                {
                    return NotFound(new { res = "Property not Found" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Updating property!", ex);
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }

        /*Method for deleting a property by proprtyId
        can be accessed only by User*/

        //[Authorize(Roles = "User")]
        [HttpDelete("{propertyId}")]
        public async Task<ActionResult> DeleteProperty(int propertyId)
        {
            try
            {
                /*
               Check if the property object to be deleted is available.
               If available, delete the property
               Else return NotFound
               */
                bool result = await this._propertyService.DeleteProperty(propertyId);
                if (result)
                {
                    return Ok(new { res = "Property deleted successfully" });
                }
                else
                {
                    return NotFound(new { res = "Property not Found" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Deleting property!", ex);
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        // [Authorize(Roles="User")]
        // [HttpGet("property/{userId}")]
        // public async Task<ActionResult> GetPropertiesByUserId(int userId)
        // {
        //     try
        //     {
        //         var properties=_propertyService.GetAllProperties(userId);
        //         return Ok(properties);
        //     }
        //     catch(Exception ex){
        //         _logger.LogError("Error Fetching properties!", ex);
        //         return StatusCode(500,$"Internal Server Error: {ex.Message}");
        //     }
        // }
    }
}
