using Microsoft.EntityFrameworkCore;
using Shofy_back.Data;
using Shofy_back.Models;
using Shofy_back.Services.Interfaces;

namespace Shofy_back.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        public CategoryService(AppDbContext context)
        {
            _context = context; 
        }
        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.Include(m => m.Products).Where(m=>m.Products.Count != 0).ToListAsync();
        }
    }
}
