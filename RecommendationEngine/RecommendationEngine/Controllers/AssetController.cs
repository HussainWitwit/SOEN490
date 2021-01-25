using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;

        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet()]
        public IActionResult GetAssetsList()
        {
            try
            {
                return Ok(_assetService.GetAssetsList());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.ErrorList, e.AppName });
            }
        }

        [HttpGet("nested")]
        public IActionResult GetAssetsNested()
        {
            try
            {
                return Ok(_assetService.GetAssetsTreeview());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.ErrorList, e.AppName });
            }
        }
    }
}
