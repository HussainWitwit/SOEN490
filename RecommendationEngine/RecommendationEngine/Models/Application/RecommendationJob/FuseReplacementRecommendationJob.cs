using System.Threading.Tasks;
using Quartz;

namespace RecommendationEngine.Models.Application.RecommendationJob
{
    public class FuseReplacementRecommendationJob: IRecommendationJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}