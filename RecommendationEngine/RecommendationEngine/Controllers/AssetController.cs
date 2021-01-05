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
        private IAssetService _assetService;

        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet("getAssetsNested")]
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

        [HttpGet("getAssetsList")]
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
                return BadRequest(new { e.ErrorList, e.AppName });
            }
        }
    }
}
