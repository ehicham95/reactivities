using Domain;

namespace Application.interfaces
{
    public interface IJwtGenerator
    {
        string createToken(AppUser user);
    }
}