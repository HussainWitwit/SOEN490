using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;
using Interfaces.Utilities;
using Models.Application.Asset;
using Models.DB;
using RecommendationScheduler.RecommendationTypes;

namespace RecommendationScheduler.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob: RecommendationJob
    {
        private 
        public YearlyWashOptimizationRecommendationJob(IRecommendationJobLogger jobLogger, IRecommendationSchedulerRepository schedulerRepository)
        {
            _jobLogger = jobLogger;
            _schedulerRepository = schedulerRepository;
        }

        protected override void ExecuteJob()
        {
            YearlyWashOptimizationRecommendation ywoRecommendation = new YearlyWashOptimizationRecommendation(_jobLogger);
            DBRecommendationJobResult result = ywoRecommendation.ExecuteAlgorithm(_recommendationJob, apiValuesList, );
        }

        protected override void GetFromApi()
        {
            throw new NotImplementedException();
        }

        protected override void GetFromDB()
        {
            throw new NotImplementedException();
        }
    }
}