using System;
using System.Linq;
using System.Collections.Generic;
using Models.DB;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Repositories
{
    public class RecommendationTypeRepository : IRecommendationTypeRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public RecommendationTypeRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public List<DBRecommendationType> GetRecommendationTypes() {
            try
            {
                return _recommendationEngineDb.RecommendationTypes.Include(x => x.DefaultParametersList).ToList();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }
    }
}