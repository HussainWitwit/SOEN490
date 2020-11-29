using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Interfaces.Services;
using Interfaces.Services.ExternalAPI;
using Interfaces.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Models.DB;
using NUnit.Framework;
using NUnit.Framework.Internal;
using Quartz;
using RecommendationEngine.ExceptionHandler;
using RecommendationScheduler.RecommendationJob;
using RecommendationScheduler.RecommendationTypes;

namespace RecommendationEngine.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AssetController : ControllerBase
    {
        private IAssetService _assetService;
        private IRecommendationJobLogger _jobLogger;//TODO: remove
        private IDriveService _driveService;//TODO: remove

        public AssetController(IAssetService assetService, IRecommendationJobLogger jobLogger, IDriveService driveService)
        {
            _assetService = assetService;
            _jobLogger = jobLogger;
            _driveService = driveService;
        }

        [HttpGet("get")]
        public IActionResult GetAssets()
        {
            try
            {
                DBRecommendationJob job = new DBRecommendationJob();
                YearlyWashOptimizationRecommendation ywoRecommendation = new YearlyWashOptimizationRecommendation(_jobLogger, _driveService);
                ywoRecommendation.ExecuteAlgorithm(job);
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
