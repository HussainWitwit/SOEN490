using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
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

        public DBRecommendationSchedule Add(DBRecommendationSchedule schedule)
        {
            if (!_recommendationEngineDb.Assets.Any())
            {
                throw new GlobalException(400, "Bad Request", "There are no assets associated to this recommendation.", "RecommendationEngine");
            }
            _recommendationEngineDb.RecommendationSchedules.Add(schedule);
            _recommendationEngineDb.SaveChanges();
            return schedule;
        }

        public List<DBRecommendationSchedule> GetRecommendationScheduleList()
        {
             return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).ToList();
            
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return _recommendationEngineDb.RecommendationTypes
                .Where(rec => rec.Type.Equals(recommendationType))
                .FirstOrDefault();
        }
    }
}
