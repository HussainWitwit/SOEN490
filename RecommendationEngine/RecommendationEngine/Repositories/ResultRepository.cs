using System;
using System.Linq;
using System.Collections.Generic;
using Models.DB;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using RecommendationEngine.ExceptionHandler;

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
            try
            {
                return _recommendationEngineDb.RecommendationJobResults.Include(result => result.Job).ThenInclude(job => job.Schedule)
                    .Include(result => result.Asset).ThenInclude(x=>x.ParentAsset).ToList();
            }
            catch (Exception) {
                throw new DbException();
            }
        }

        public List<DBRecommendationJobResult> GetResultWithActions()
        {
            try
            {
                return _recommendationEngineDb.RecommendationJobResults.Include(result => result.ActionsSuggestedList).ToList();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }


    }
}