using System.Threading.Tasks;
using Quartz;

namespace Models.Application.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob: IRecommendationJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}