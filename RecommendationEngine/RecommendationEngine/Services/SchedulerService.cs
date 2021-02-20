using System;
using System.Linq;
using Interfaces.RecommendationScheduler;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using Models.Application;
using Models.Application.Asset;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Services
{
    public class SchedulerService: ISchedulerService
    {
        private readonly IRecommendationScheduler _scheduler;
        private readonly IConfiguredRecommendationService _configuredRecommendationService;
        
        public SchedulerService(IRecommendationScheduler scheduler, IConfiguredRecommendationService configuredRecommendationService)
        {
            _scheduler = scheduler;
            _configuredRecommendationService = configuredRecommendationService;
        }
        public void ScheduleJob(int id)
        {
            try
            {
                ConfiguredRecommendation rec =  _configuredRecommendationService.GetConfiguredRecommendationById(id);
                foreach (AssetLeaf asset in rec.AssetList)
                {
                    _scheduler.TriggerJobAsync(id, asset.Id);
                };
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }
    }
}