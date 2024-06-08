using Microsoft.AspNetCore.Mvc;
using Shofy_back.Models;
using Shofy_back.Services.Interfaces;
using Shofy_back.ViewModel;
using System.Diagnostics;

namespace Shofy_back.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        public HomeController(ICategoryService categoryService,IProductService productService)
        {
            _categoryService = categoryService;
            _productService = productService;
        }
        public async Task<IActionResult> Index()
        {
            List<Category> categories = await _categoryService.GetAllAsync();
            List<Product> products= await _productService.GetAllProductsAsync();

            HomeVM model = new()
            {
               
                Products = products,
                Categories = categories,
              
            };
            return View(model);
        }
    }
}