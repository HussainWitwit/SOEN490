using System.Threading.Tasks;
using Quartz;

namespace Models.Application.RecommendationJob
{
    public interface IRecommendationJob: IJob
    {
        public Task Execute(IJobExecutionContext context);
    }
}