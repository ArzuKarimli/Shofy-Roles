using Microsoft.EntityFrameworkCore;
using Shofy_back.Data;
using Shofy_back.Models;
using Shofy_back.Services.Interfaces;

namespace Shofy_back.Services
{
    public class ProductService : IProductService
    {
        public readonly AppDbContext _context;
        public ProductService(AppDbContext context)
        {
            _context = context; 
        }
        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products.Include(m => m.Category)
                                          .Include(m => m.ProductImages)
                                          .ToListAsync();
        }
    }
}
