using System.Threading.Tasks;
using Quartz;

namespace RecommendationEngine.Models.Application.RecommendationJob
{
    public interface IRecommendationJob: IJob
    {
        //public Task Execute(IJobExecutionContext context);
    }
}