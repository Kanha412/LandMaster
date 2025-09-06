using LandMaster.Services;
using LandMaster.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.IO;




namespace LandMaster.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {

        private readonly FeedbackService _feedbackService;
        private readonly ILogger<FeedbackController> _logger;


        public FeedbackController(FeedbackService feedbackService, ILogger<FeedbackController> logger)
        {
            _feedbackService = feedbackService;
            _logger = logger;
        }

        /* 
        Retrieve all feedbacks from the feedback service
        Return the list of feedbacks
        */
        //[Authorize(Roles = "Admin,User")]
        [HttpGet]
        /*Method for getting all the feedbacks
        User and Admin can access*/

        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {

            try
            {
                var feed = await this._feedbackService.GetAllFeedbacks();
                _logger.LogInformation("Feedbacks Fetched successfully!");
                return Ok(feed);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching feedbacks!", ex);
                // Handle any exceptions that occur during retrieval
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }



        //  Method for getting the feedback on the basis of userId
        //[Authorize(Roles = "Admin,User")]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                /*Return feedback for the user if found
                Return not found response if no feedbacks were found for this user*/
                /* 
                Return feedback for the user if found
                Return not found response if no feedbacks were found for this user
                */
                var feed = await this._feedbackService.GetFeedbacksByUserId(userId);
                if (feed == null)
                {
                    _logger.LogWarning("No feedbacks were found for this user!");
                    return NotFound(new { res = "No feedbacks were found for this user" });
                }
                _logger.LogInformation("Feedback Fetched successfully!");
                return Ok(feed);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error fetching feedback!", ex);

                // Handle any exceptions that occur during retrieval
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }


        }

        /*Method for adding the feedback 
        Can be accessed by only User*/


        //[Authorize(Roles = "User")]
        [HttpPost]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {

                /* Add new feedback using the feedback service
                 Return success message if feedback is added successfully
                */
                await this._feedbackService.AddFeedback(feedback);
                _logger.LogInformation("Feedback added successfully!");
                return Ok(new { res = "Feedback added successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Adding feedback!", ex);

                // Handle any exceptions that occur during feedback addition
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }




        // Delete feedback by feedbackId using the feedback service
        //[Authorize(Roles = "User")]
        [HttpDelete("{feedbackId}")]
        /*Method for deleting the feedback based on the basis of feedbackId
        Can be accessed by only User*/
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                /* Return success message if feedback is deleted successfully
                Return not found response if no feedback is found for the given feedbackId*/

                bool result = await this._feedbackService.DeleteFeedback(feedbackId);
                if (result)
                {
                    _logger.LogInformation("Feedback deleted successfully!");
                    return Ok(new { res = "Feedback deleted successfully" });
                }
                else
                {
                    return NotFound(new { res = "Cannot find any feedback" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Error Deleting feedback!", ex);

                // Handle any exceptions that occur during feedback deletion
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
