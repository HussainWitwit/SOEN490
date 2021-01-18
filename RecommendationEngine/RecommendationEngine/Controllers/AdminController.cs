using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
using System.Threading.Tasks;
using Interfaces.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController: ControllerBase
    {
        private readonly IAssetService _assetService;

        public AdminController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet("convert")]
        public async Task<IActionResult> ConvertAsync()
        {
            try
            {
                await _assetService.Convert();
                return Ok();
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }
    }
}
