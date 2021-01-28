using System;
using System.Linq;
using System.Collections.Generic;
using Models.DB;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace RecommendationEngine.Repositories
{
    public class JobRepository : IJobRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public JobRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public List<DBRecommendationJob> GetJobList()
        {
            return _recommendationEngineDb.RecommendationJobs.Include(recJob => recJob.Result).Include(recJob => recJob.Asset).Include(recJob => recJob.Schedule).Include(recJob => recJob.LogsList).ToList();
        }
    }
}