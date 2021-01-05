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
             return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).Include(x => x.AssetsList).ThenInclude(asset => asset.Asset).
                ThenInclude(asset => asset.Type).ToList();
            
        }

        public void Delete(int id)
        {
            if (!_recommendationEngineDb.RecommendationSchedules.Any(x => x.RecommendationScheduleId == id))
            {
                throw new GlobalException(400, "Bad Request", "Recommendation ID " + id + " does not exist!", "Recommendation Engine");
            }
            DBRecommendationSchedule configToRemove = _recommendationEngineDb.RecommendationSchedules
                .FirstOrDefault(x => x.RecommendationScheduleId == id);
            _recommendationEngineDb.RecommendationSchedules.Remove(configToRemove);
            _recommendationEngineDb.SaveChanges();
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            return _recommendationEngineDb.RecommendationTypes
                .Where(rec => rec.Type.Equals(recommendationType))
                .FirstOrDefault();
        }

        public DBRecommendationSchedule GetRecommendationScheduleById(int id)
        {
            return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType)
                .Include(x => x.AssetsList).ThenInclude(x => x.Asset)
                .Include(x => x.ParametersList).ThenInclude(x => x.RecommendationParameter)
                .Include(x => x.JobsList)
                .FirstOrDefault(x => x.RecommendationScheduleId == id);
        }
    }
}
