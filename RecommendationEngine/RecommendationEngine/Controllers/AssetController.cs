using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Interfaces.Repositories;
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
using Quartz.Impl;
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
        private IRecommendationSchedulerRepository _repo;

        public AssetController(IAssetService assetService, IRecommendationJobLogger jobLogger, IDriveService driveService, IRecommendationSchedulerRepository repository)
        {
            _assetService = assetService;

            _jobLogger = jobLogger;//TODO: REmove
            _driveService = driveService;// TODO: REMOVE
            _repo = repository; //TODO: remove
        }

        [HttpGet("get")]
        public IActionResult GetAssets()
        {
            try
            {
                YearlyWashOptimizationRecommendationJob job = new YearlyWashOptimizationRecommendationJob(_jobLogger, _repo, _driveService);
                job.ExecuteJob();
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
