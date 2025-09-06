using LandMaster.Data;
using LandMaster.Models;
using Microsoft.EntityFrameworkCore;

namespace LandMaster.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            IEnumerable<User> users = await _context.Users.ToListAsync();

            foreach (User user in users)
            {
                user.Password = "";
            }

            return users;
        }

        public async Task<User> GetUserById(int userId)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);

            user.Password = "";

            return user;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            user.Password = "";

            return user;
        }

        public async Task<bool> UpdateUser(int userId, User user)
        {
            User dbUser = await _context.Users.FindAsync(userId);

            if (dbUser != null)
            {
                dbUser.MobileNumber = user.MobileNumber;
                dbUser.UserRole = user.UserRole;

                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteUserById(int userId)
        {
            User dbUser = await _context.Users.FindAsync(userId);

            if (dbUser != null)
            {
                _context.Users.Remove(dbUser);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<bool> DeleteUserByEmail(string email)
        {
            User dbUser = await _context.Users.FindAsync(email);

            if (dbUser != null)
            {
                _context.Users.Remove(dbUser);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
