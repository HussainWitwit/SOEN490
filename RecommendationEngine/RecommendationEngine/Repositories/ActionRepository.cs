using System.Collections.Generic;
using System.Linq;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Models.DB;

namespace RecommendationEngine.Repositories
{
    public class ActionRepository : IActionRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ActionRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public List<DBAction> GetActionsByResultId(int id)
        {

            return _recommendationEngineDb.Actions.Where(action => action.RecommendationJobResult.RecommendationJobResultId == id)
                .Include(action => action.RecommendationJobResult)
                .ThenInclude(result => result.Job)
                .ThenInclude(job => job.Schedule)
                .ThenInclude(schedule => schedule.AssetsList)
                .ThenInclude(asset => asset.Asset).ToList();

        }
    }
}
