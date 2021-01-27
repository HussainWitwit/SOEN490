using Interfaces.RecommendationScheduler;
using Interfaces.Services;

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
            _scheduler.TriggerJobAsync(id);
        }
    }
}