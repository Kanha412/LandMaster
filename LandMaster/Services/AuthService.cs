using LandMaster.Data;
using LandMaster.Models;
using LandMaster.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LandMaster.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IConfiguration _configuration;

        // Constructor to initialize dependencies
        public AuthService(
            ApplicationDbContext context,
            IConfiguration configuartion,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager
        )
        {
            this._context = context;
            this._configuration = configuartion;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._roleManager = roleManager;
        }

        /* Method to register a new user with a specified role */
        // public async Task<(int, string)> Registration(User model, string role)
        // {
        //     // Check if the username already exists
        //     var userNameExists = await _userManager.FindByNameAsync(model.Username);

        //     if (userNameExists != null)
        //     {
        //         return (0, "User name already exists");
        //     }

        //     // Check if the email already exists
        //     var emailExists = await _userManager.FindByEmailAsync(model.Email);

        //     if (emailExists != null)
        //     {
        //         return (0, "A user with this email already exists");
        //     }

        //     // Create a new ApplicationUser instance
        //     ApplicationUser applicationUser = new()
        //     {
        //         Email = model.Email,
        //         UserName = model.Username
        //     };

        //     // Create the user with the specified password
        //     IdentityResult result = await _userManager.CreateAsync(applicationUser, model.Password);

        //     // Assign the user to the specified role if creation is successful
        //     if (result.Succeeded && (role == UserRoles.Admin || role == UserRoles.User))
        //     {
        //         if (!await _roleManager.RoleExistsAsync(role))
        //         {
        //             await _roleManager.CreateAsync(new IdentityRole(role));
        //         }

        //         await _userManager.AddToRoleAsync(applicationUser, role);
        //         await _context.Users.AddAsync(model);
        //         await _context.SaveChangesAsync();

        //         return (1, "User Created Successfully");
        //     }

        //     return (0, "Failed to register user, please check user details");
        // }

        public async Task<(int, string)> Registration(User model, string role)
        {
            var userNameExists = await _userManager.FindByNameAsync(model.Username);

            if (userNameExists != null)
            {
                return (0, "User name already exists");
            }

            var emailExists = await _userManager.FindByEmailAsync(model.Email);

            if (emailExists != null)
            {
                return (0, "A user with this email already exists");
            }

            ApplicationUser applicationUser = new()
            {
                Email = model.Email,
                UserName = model.Username
            };

            IdentityResult result = await _userManager.CreateAsync(applicationUser, model.Password);

            if (result.Succeeded)
            {
                if (role == UserRoles.Admin)
                {
                    // Check if user is allowed to be a Program Managerdrsftcqq
                    bool isApprovedForAdmin = CheckIfUserIsApprovedForAdmin(model);

                    if (!isApprovedForAdmin)
                    {
                        return (0, "User is not approved to become an Admin");
                    }
                }

                if (role == UserRoles.Admin || role == UserRoles.User)
                {
                    if (!await _roleManager.RoleExistsAsync(role))
                    {
                        await _roleManager.CreateAsync(new IdentityRole(role));
                    }

                    await _userManager.AddToRoleAsync(applicationUser, role);
                    await _context.Users.AddAsync(model);
                    await _context.SaveChangesAsync();

                    return (1, "User Created Successfully");
                }
            }

            return (0, "Failed to register user, please check user details");
        }

        private bool CheckIfUserIsApprovedForAdmin(User model)
        {
            List<string> approvedEmails = new List<string> { "kanha@admin.com","landmaster@admin.com"};

            return approvedEmails.Contains(model.Email);
        }

        // Method to log in a user and generate a JWT token
        public async Task<(int, string)> Login(LoginModel model)
        {
            // Find the user by email
            ApplicationUser savedUser = await _userManager.FindByEmailAsync(model.Email);
            if (savedUser == null)
            {
                return (0, "Invalid email");
            }

            // Attempt to sign in the user with the specified password
            var result = await _signInManager.PasswordSignInAsync(savedUser.UserName, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                //Retreiving User from Db to save UserId in Claims
                var customUser = _context.Users.FirstOrDefault(u => u.Email == model.Email);

                IList<string> roles = await _userManager.GetRolesAsync(savedUser);

                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, savedUser.UserName),
                    new Claim(ClaimTypes.Email, savedUser.Email),
                    //Saving UserId in token
                    new Claim(ClaimTypes.NameIdentifier, customUser?.UserId.ToString()),
                    new Claim(ClaimTypes.Role, roles.FirstOrDefault("User"))
                };

                // Generate the JWT token
                string token = GenerateJwtToken(claims);

                return (1, token);
            }

            return (0, "Invalid password");
        }

        // Method to generate a JWT token with the specified claims
        private string GenerateJwtToken(List<Claim> claims)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            // Define the token descriptor with claims, expiration, issuer, audience, and signing credentials
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(3),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            // Create the token
            SecurityToken generatedToken = tokenHandler.CreateToken(tokenDescriptor);

            // Write the token to a string
            return tokenHandler.WriteToken(generatedToken);
        }

    }

}
