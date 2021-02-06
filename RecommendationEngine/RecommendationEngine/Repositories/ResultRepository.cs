using System;
using System.Linq;
using System.Collections.Generic;
using Models.DB;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace RecommendationEngine.Repositories
{
    public class ResultRepository : IResultRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ResultRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public List<DBRecommendationJobResult> GetResultList()
        {
            return _recommendationEngineDb.RecommendationJobResults.Include(result => result.Job).ThenInclude(job => job.Schedule).ToList();
        }
    }
}