using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.ExceptionHandler;
using System.Threading.Tasks;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;

        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet("assetsNested")]
        public IActionResult GetAssetsNested()
        {
            try
            {
                return Ok(_assetService.GetAssetsTreeview());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }

        [HttpGet("assetsList")]
        public IActionResult GetAssetsList()
        {
            try
            {
                return Ok(_assetService.GetAssetsList());
            }
            catch (GlobalException e)
            {
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }
    }
}
