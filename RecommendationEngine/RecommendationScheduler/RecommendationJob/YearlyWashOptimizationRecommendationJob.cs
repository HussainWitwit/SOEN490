using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Utilities;

namespace RecommendationScheduler.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob: RecommendationJob
    {
        public YearlyWashOptimizationRecommendationJob(IRecommendationJobLogger jobLogger, IRecommendationSchedulerRepository schedulerRepository)
        {
            _jobLogger = jobLogger;
            _schedulerRepository = schedulerRepository;
        }

        protected override void ExecuteJob()
        {
            System.Threading.Thread.Sleep(5000);
        }
    }
}