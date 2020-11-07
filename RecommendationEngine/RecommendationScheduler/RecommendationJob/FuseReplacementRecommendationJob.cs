using System.Threading.Tasks;
using Models.DB;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public class FuseReplacementRecommendationJob: RecommendationJob
    {
        public override Task Execute(IJobExecutionContext context)
        {
            throw new System.NotImplementedException();
        }

        protected override void CreateRecommendationJob()
        {
            throw new System.NotImplementedException();
        }
    }
}