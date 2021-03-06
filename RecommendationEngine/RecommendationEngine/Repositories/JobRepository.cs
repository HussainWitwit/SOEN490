using System;
using System.Linq;
using System.Collections.Generic;
using Models.DB;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using RecommendationEngine.ExceptionHandler;

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
            try
            {
                return _recommendationEngineDb.RecommendationJobs
                    .Include(recJob => recJob.Result)
                    .Include(recJob => recJob.Asset).ThenInclude(x=>x.ParentAsset)
                    .Include(recJob => recJob.Schedule)
                    .ToList();
            }
            catch (Exception) {
                throw new DbException();
            }
        }

        public List<DBRecommendationJobLog> GetJobLogById(int id)
        {
            try
            {
                return _recommendationEngineDb.RecommendationJobLogs
                    .Where(x => x.RecommendationJob.RecommendationJobId == id).ToList();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }
    }
}