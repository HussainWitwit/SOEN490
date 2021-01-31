using System.Threading.Tasks;
using Models.DB;

namespace Interfaces.RecommendationScheduler
{
    public interface IRecommendationScheduler
    {
        public Task Start();
        public Task ScheduleJobAsync(DBRecommendationSchedule schedule);
        public Task TriggerJobAsync(int scheduleId);
    }
}