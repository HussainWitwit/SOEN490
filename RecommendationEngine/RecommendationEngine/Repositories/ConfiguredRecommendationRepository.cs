using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using System.Collections.Generic;
using System.Linq;

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