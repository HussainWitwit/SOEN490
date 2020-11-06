using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Utilities;
using Quartz;

namespace RecommendationScheduler.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob: RecommendationJob
    {
        private IRecommendationJobLogger _jobLogger;
        private IRecommendationSchedulerRepository _schedulerRepository;
        
        public YearlyWashOptimizationRecommendationJob(IRecommendationJobLogger jobLogger, IRecommendationSchedulerRepository schedulerRepository)
        {
            _jobLogger = jobLogger;
            _schedulerRepository = schedulerRepository;
        }
        public override Task Execute(IJobExecutionContext context)
        {
            var recommendationJob = _schedulerRepository.GetDbRecommendationJobById(RecommendationScheduleId);
            _jobLogger.LogInformation(recommendationJob, "Job started!");
            return Task.CompletedTask;
        }
    }
}