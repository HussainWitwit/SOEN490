using System.Threading.Tasks;
using Quartz;

namespace RecommendationEngine.Models.Application.RecommendationJob
{
    public class WindTurbineChangeRecommendationJob: IRecommendationJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            throw new System.NotImplementedException();
        }
    }
}