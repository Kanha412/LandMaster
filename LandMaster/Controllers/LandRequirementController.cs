using LandMaster.Services;
using LandMaster.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;

namespace LandMaster.Controllers
{
    [ApiController]
    [Route("api/landrequirements")]
    public class LandRequirementController : ControllerBase
    {
        private readonly LandRequirementService _landrequirementService;
        private readonly ILogger<LandRequirementController> _logger;

        public LandRequirementController(LandRequirementService landrequirementService, ILogger<LandRequirementController> logger)
        {
            _landrequirementService = landrequirementService;
            _logger = logger;
        }

        /*Method for retrieving all land requirements
        can be accessed by Admin and User*/

        //[Authorize(Roles = "Admin,User")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LandRequirement>>> GetAllLandRequirements()
        {
            try
            {
                /*
               Retrieve all land requirements from the service.
               If successful, return the list of land requirements
               */
                var landRequirements = await this._landrequirementService.GetAllLandRequirements();
                _logger.LogInformation("Land Requirements Fetched successfully!");
                return Ok(landRequirements);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Fetching land requirements!", ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /*Method for retrieving a specific land requirement by ID
       can be accessed by Admin and User*/

        //[Authorize(Roles = "Admin,User")]
        [HttpGet("{landRequirementId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetLandRequirementById(int landRequirementId)
        {
            try
            {
                /*
               Retrieve the land requirement by ID from the service.
               If the land requirement is found, return it
               Else return NotFound
               */
                var landRequirement = await this._landrequirementService.GetLandRequirementById(landRequirementId);
                if (landRequirement == null)
                {
                    return NotFound(new { res = "Land Requirement not found" });
                }
                _logger.LogInformation("Land Requirement Fetched successfully!");
                return Ok(landRequirement);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Fetching land requirement!", ex);
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /*Method for adding a new land requirement
        can be accessed only by Admin*/

        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult> AddLandRequirement([FromBody] LandRequirement landRequirement)
        {
            try
            {

                /*
                Add the new land requirement via the service.
                If successful, return a success message
                */
                await this._landrequirementService.AddLandRequirement(landRequirement);


                _logger.LogInformation("Land Requirements Added successfully!");

                return Ok(new { res = "Land Requirement added successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Adding land requirements!", ex);
                return StatusCode(409, $"Internal server error: {ex.Message}");
            }
        }


        /*Method for updating an existing land requirement
        can be accessed by User and Admin*/
        //[Authorize(Roles = "User,Admin")]
        [HttpPut("{landRequirementId}")]
        public async Task<ActionResult> UpdateProperty(int landRequirementId, [FromBody] LandRequirement landRequirement)
        {
            try
            {
                /*
                Retrieve the existing land requirement by ID from the service.
                If the land requirement is found, update it
                Else return NotFound
                */
                var landRequirementfound = await this._landrequirementService.GetLandRequirementById(landRequirementId);
                if (landRequirementfound != null)
                {
                    var updatedLandRequirement = await this._landrequirementService.UpdateLandRequirement(landRequirementId, landRequirement);
                    _logger.LogInformation("Land Requirement Updated successfully!");


                    return Ok(new { mes = "Land Requirement updated successfully" });

                }
                else
                {
                    return NotFound(new { res = "Land Requirement not found" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Updating land requirements!", ex);
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        /*Method for deleting landRequirement
        can be accessed only by Admin*/
        //[Authorize(Roles = "Admin")]
        [HttpDelete("{landRequirementId}")]
        public async Task<ActionResult> DeleteLandRequirement(int landRequirementId)
        {
            try
            {
                /*
                check if the land requirement object to be deleted is available.
                If available,delete the land requirement

                Else return NotFound
                */
                bool result = await this._landrequirementService.DeleteLandRequirement(landRequirementId);
                if (result)
                {
                    _logger.LogInformation("Land Requirement Deleted successfully!");
                    return Ok(new { res = "Land Requirement deleted successfully" });
                }
                else
                {
                    return NotFound(new { res = "Land Requirement not found" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Deleting land requirements!", ex);
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
