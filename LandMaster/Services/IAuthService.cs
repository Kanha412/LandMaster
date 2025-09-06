using LandMaster.Models;

namespace LandMaster.Services
{
    public interface IAuthService
    {
        Task<(int, string)> Registration(User model, string role);

        Task<(int, string)> Login(LoginModel model);
    }
}
