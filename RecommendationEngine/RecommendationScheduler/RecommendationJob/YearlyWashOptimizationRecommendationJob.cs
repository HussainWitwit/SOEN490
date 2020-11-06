using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Utilities;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob: RecommendationJob
    {
        private IRecommendationJobLogger _jobLogger = RecommendationScheduler.JobLogger;
        private IRecommendationSchedulerRepository _schedulerRepository = RecommendationScheduler.RecommendationSchedulerRepository;
        public override Task Execute(IJobExecutionContext context)
        {
            var recommendationJob = _schedulerRepository.GetDbRecommendationJobById(RecommendationScheduleId);
            _jobLogger.LogInformation(recommendationJob, "Job started!");
            return Task.CompletedTask;
        }
    }
}