using Shofy_back.Models;

namespace Shofy_back.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProductsAsync();
    }
}
