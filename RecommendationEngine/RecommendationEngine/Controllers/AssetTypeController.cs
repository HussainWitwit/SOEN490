using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.Controllers {
        [ApiController]
        [Route("[controller]")]
        public class AssetTypeController : ControllerBase {
                private IAssetTypeService _assetTypeService;

                public AssetTypeController(IAssetTypeService assetTypeService) {
                        _assetTypeService = assetTypeService;
                }

                [HttpGet("get")]
                public IActionResult GetAssets() {
                        return Ok(_assetTypeService.GetAssetTypeByName());
                }
        }
}