using System.Threading.Tasks;
using Models.DB;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public abstract class RecommendationJob: IJob
    {
        public abstract Task Execute(IJobExecutionContext context);
    }
}