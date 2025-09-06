using LandMaster.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using LandMaster.Services;

namespace LandMaster.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthenticationController : ControllerBase
    {

        private readonly IAuthService _authService;
        private readonly ILogger<AuthenticationController> _logger;


        public AuthenticationController(IAuthService authService, ILogger<AuthenticationController> logger)
        {
            this._authService = authService;
            this._logger = logger;
        }


        // Attempt to login with provided model credentials

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                /*
                Check if login was unsuccessful
         Return bad request with error message if login failed
         Return success status and token if login was successful
         */
                var (status, message) = await _authService.Login(model);

                if (status == 0)
                {
                    return BadRequest(message);
                }

                return Ok(
                    new
                    {
                        Status = "Success",
                        token = message
                    }
                );
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in Login!", ex);

                // Handle any exceptions that occur during login
                return StatusCode(
                        StatusCodes.Status500InternalServerError,
                        new { Status = "Error", Message = ex.Message }
                    );
            }
        }


        //Attempt to register with provided model and user role

        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            try
            {

                /*
                Check if registration was unsuccessful
       Return bad request with error message if registration failed
       Return success status and message if registration was successful
       */
                var (status, message) = await _authService.Registration(model, model.UserRole);

                if (status == 0)
                {
                    return BadRequest(message);
                }

                return Ok(new { msg = message });
            }
            catch (Exception ex)
            {
                _logger.LogError("Error in Register!", ex);

                // Handle any exceptions that occur during registration
                return StatusCode(
                        StatusCodes.Status500InternalServerError,
                        new { Status = "Error", Message = ex.Message }
                    );
            }
        }

    }
}
