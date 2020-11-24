using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using Quartz.Impl.AdoJobStore;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetController : ControllerBase
    {
        private IAssetService _assetService;
        private IDriveService _driveService;

        public AssetController(IAssetService assetService, IDriveService driveService)
        {
            _assetService = assetService;
            _driveService = driveService;
        }

        [HttpGet("get")]
        public Task<IActionResult> GetAssets()
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

        [HttpGet("convert")]
        public async Task<IActionResult> ConvertAsync()
        {
            try
            {
                await _assetService.Convert();
                return Ok();
            }
            catch (GlobalException e){
                return BadRequest(new { e.Code, e.Data, e.ErrorMessage, e.ApplicationName });
            }
        }
    }
}
