using System;
using System.Linq;
using Models.DB;
using Interfaces.Repositories;
using System.Collections.Generic;
using Models.Application;
using Microsoft.EntityFrameworkCore;

namespace RecommendationEngine.Repositories
{
    public class ConfiguredRecommendationRepository : IConfiguredRecommendationRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ConfiguredRecommendationRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public List<DBRecommendationSchedule> GetRecommendationScheduleList()
        {
            return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).ToList();
        }
    }
}