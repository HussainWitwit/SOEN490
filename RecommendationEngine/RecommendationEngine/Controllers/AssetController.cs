using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace RecommendationEngine.Controllers {
        [ApiController]
        [Route("[controller]")]
        public class AssetController : ControllerBase {
                private IAssetService _assetService;

                public AssetController(IAssetService assetService) {
                        _assetService = assetService;
                }

                [HttpGet("get")]
                public IActionResult GetAssets() {
                        return Ok(_assetService.GetAssets());
                }
        }
}
