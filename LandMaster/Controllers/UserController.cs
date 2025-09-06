using LandMaster.Services;
using LandMaster.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LandMaster.Controllers
{
    [ApiController]
    [Route("api/users/")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            try
            {
                IEnumerable<User> users = await _userService.GetAllUsers();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpGet("id/{userId}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserById(int userId)
        {
            try
            {
                User user = await _userService.GetUserById(userId);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUserByEmail(string email)
        {
            try
            {
                User user = await _userService.GetUserByEmail(email);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpPut("{userId}")]
        public async Task<ActionResult> UpdateUser(int userId, User user)
        {
            try
            {
                bool isUpdated = await _userService.UpdateUser(userId, user);

                if (isUpdated)
                {
                    return Ok(new { result = "User updated successfully" });
                }

                return NotFound(new { result = "could not update user" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUserById(int userId)
        {
            try
            {
                bool isDeleted = await _userService.DeleteUserById(userId);

                if (isDeleted)
                {
                    return Ok(new { result = "User deleted successfully" });
                }
                else
                {
                    return NotFound(new { result = "could not delete user" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete("{email}")]
        public async Task<ActionResult> DeleteUserByEmail(string email)
        {
            try
            {
                bool isDeleted = await _userService.DeleteUserByEmail(email);

                if (isDeleted)
                {
                    return Ok(new { result = "User deleted successfully" });
                }
                else
                {
                    return NotFound(new { result = "could not delete user" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
