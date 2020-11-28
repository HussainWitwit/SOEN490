using Microsoft.AspNetCore.Mvc;
using RecommendationEngine.Services;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetMetadataController : ControllerBase
    {
        private AssetMetadataService _assetMetadataService;
        public AssetMetadataController(AssetMetadataService assetMetadataService)
        {
            _assetMetadataService = assetMetadataService;
        }
    }
}
