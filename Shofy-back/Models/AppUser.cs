using Microsoft.AspNetCore.Identity;

namespace Shofy_back.Models
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
