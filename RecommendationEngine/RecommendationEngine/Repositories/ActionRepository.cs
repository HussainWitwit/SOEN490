using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Models.DB;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.Repositories
{
    public class ActionRepository : IActionRepository
    {
        private RecommendationEngineDBContext _recommendationEngineDb;

        public ActionRepository(RecommendationEngineDBContext recommendationEngineDb)
        {
            _recommendationEngineDb = recommendationEngineDb;
        }

        public List<DBAction> GetActionList()
        {
            try
            {
                return _recommendationEngineDb.Actions.ToList();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public List<DBAction> GetActionsByResultId(int id)
        {
            try {
                return _recommendationEngineDb.Actions.Where(action => action.RecommendationJobResult.RecommendationJobResultId == id)
                    .Include(action => action.RecommendationJobResult)
                    .ThenInclude(result => result.Job)
                    .ThenInclude(job => job.Schedule)
                    .ThenInclude(schedule => schedule.AssetsList)
                    .ThenInclude(asset => asset.Asset).ToList();
            } catch (Exception) {
                throw new DbException();
            }
        }

        public List<DBAction> GetActionsByDate(DateTime date)
        {
            try {
                return _recommendationEngineDb.Actions.Where(action => action.Date.Date.CompareTo(date.Date) == 0)
                    .Include(action => action.RecommendationJobResult)
                    .ThenInclude(result => result.Job)
                    .ThenInclude(job => job.Schedule)
                    .Include(action => action.Asset).ToList();
            }
            catch (Exception) {
                throw new DbException();
            }
        }
    }
}
