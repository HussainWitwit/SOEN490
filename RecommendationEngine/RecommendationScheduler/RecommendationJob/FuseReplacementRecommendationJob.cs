using System.Threading.Tasks;
using Models.DB;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public class FuseReplacementRecommendationJob: RecommendationJob
    {
        private DBRecommendationSchedule _schedule;
        public FuseReplacementRecommendationJob(DBRecommendationSchedule schedule)
        {
            _schedule = schedule;
        }
        public override Task Execute(IJobExecutionContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}