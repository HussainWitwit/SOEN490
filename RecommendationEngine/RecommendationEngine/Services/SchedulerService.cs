using System;
using Interfaces.RecommendationScheduler;
using Interfaces.Services;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Services
{
    public class SchedulerService: ISchedulerService
    {
        private readonly IRecommendationScheduler _scheduler;
        
        public SchedulerService(IRecommendationScheduler scheduler)
        {
            _scheduler = scheduler;
        }
        public void ScheduleJob(int id)
        {
            try
            {
                _scheduler.TriggerScheduleAsync(id);
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }
    }
}