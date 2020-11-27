using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Interfaces.Services;
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
        private RecommendationEngineDBContext _dbContext;//

        public AssetController(IAssetService assetService, RecommendationEngineDBContext dbContext)
        {
            _assetService = assetService;
            _dbContext = dbContext;
        }

        [HttpGet("get")]
        public IActionResult GetAssets()
        {
            try
            {
                var parameters = _dbContext.RecommendationScheduleParameters.ToList();
                var assetRecSchedule = new DBAssetRecommendationSchedule()
                {
                    Asset = _dbContext.Assets.Where(asset => asset.Name == "RENEW01_2070.92.003").FirstOrDefault(),
                    AssetId = _dbContext.Assets.Where(asset => asset.Name == "RENEW01_2070.92.003").FirstOrDefault().AssetId,
                };

                var assetList = new List<DBAssetRecommendationSchedule>();
                assetList.Add(assetRecSchedule);

                _dbContext.AssetRecommendationSchedules.Add(assetRecSchedule);

                var configuredRecommendation = new DBRecommendationSchedule
                {
                    ModifiedBy = "Voldemort",
                    DisplayText = "Sample configured ywo",
                    CreatedOn = new DateTime(2019, 01, 12),
                    Description = "this is a description",
                    Granularity = "yearly",
                    Name = "SampleConfiguredRec",
                    RecurrenceDatetime = new DateTime(2019, 05, 12),
                    RecurrenceDayOfWeek = 2,
                    PreferedScenario = "netSaving",
                    RecommendationType = _dbContext.RecommendationTypes.Where(type => type.RecommendationTypeId == 1).FirstOrDefault(),
                    ParametersList = parameters,
                    AssetsList = assetList
                };

                _dbContext.RecommendationSchedules.Add(configuredRecommendation);

                _dbContext.AssetRecommendationSchedules.FirstOrDefault().ScheduleId = _dbContext.RecommendationSchedules.Where(schedule => schedule.Name == "SampleConfiguredRec").FirstOrDefault().RecommendationScheduleId;
                _dbContext.AssetRecommendationSchedules.FirstOrDefault().Schedule = _dbContext.RecommendationSchedules.Where(schedule => schedule.Name == "SampleConfiguredRec").FirstOrDefault();
                _dbContext.SaveChanges();


                DBRecommendationJob job = new DBRecommendationJob();
                YearlyWashOptimizationRecommendation.ExecuteAlgorithm(job);
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
