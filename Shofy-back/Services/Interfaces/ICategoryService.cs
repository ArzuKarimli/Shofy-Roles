using Shofy_back.Models;

namespace Shofy_back.Services.Interfaces
{
    public interface ICategoryService
    {
        Task <List<Category>> GetAllAsync();
    }
}
