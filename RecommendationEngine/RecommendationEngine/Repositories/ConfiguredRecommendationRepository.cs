using System;
using System.Linq;
using Models.DB;
using Interfaces.Repositories;
using System.Collections.Generic;

namespace RecommendationEngine.Repositories
{
    public class ConfiguredRecommendationRepository : IConfiguredRecommendationRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ConfiguredRecommendationRepository(RecommendationEngineDBContext recommendationEngineDb) {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public void Add(DBRecommendationSchedule schedule) {
            _recommendationEngineDb.RecommendationSchedules.Add(schedule);
            _recommendationEngineDb.SaveChanges();
        }

        public List<DBRecommendationSchedule> Get() {
            return _recommendationEngineDb.RecommendationSchedules.ToList();
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType) {
            return _recommendationEngineDb.RecommendationTypes
                .Where(rec => rec.Type.Equals(recommendationType))
                .FirstOrDefault();
        }
    }
}
