using System;
using Interfaces.RecommendationScheduler;
using Interfaces.Services;
using Microsoft.AspNetCore.Http;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Services
{
    public class SchedulerService: ISchedulerService
    {
        private IRecommendationScheduler _scheduler;
        public SchedulerService(IRecommendationScheduler scheduler)
        {
            _scheduler = scheduler;
        }
        public void ScheduleJob(int id)
        {
            try
            {
                _scheduler.TriggerJobAsync(id);
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }
    }
}