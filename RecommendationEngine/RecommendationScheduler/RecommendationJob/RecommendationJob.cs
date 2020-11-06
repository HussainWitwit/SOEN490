using System;
using System.Threading.Tasks;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public abstract class RecommendationJob: IJob
    {
        public int RecommendationScheduleId { get; set; }
        public abstract Task Execute(IJobExecutionContext context);
    }
}