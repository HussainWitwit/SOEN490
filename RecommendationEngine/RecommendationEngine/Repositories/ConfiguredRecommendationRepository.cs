﻿using Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Models.DB;
using RecommendationEngine.ExceptionHandler;
using System.Collections.Generic;
using System.Linq;
using Models.Application;
using System;

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
            try
            {
                if (!_recommendationEngineDb.Assets.Any())
                {
                    Error error = new Error
                    {
                        Type = ErrorType.BAD_REQUEST,
                        ErrorMessage = "There are no assets associated to this recommendation."
                    };
                    throw new RequestValidationException(error, "RecommendationEngine");
                }
                _recommendationEngineDb.RecommendationSchedules.Add(schedule);
                _recommendationEngineDb.SaveChanges();
                return schedule;
            }
            catch (RequestValidationException)
            {
                throw;
            }
            catch (Exception) {
                throw new DbException();
            }
        }

        public DBRecommendationSchedule Edit(DBRecommendationSchedule schedule, int id) {
            try
            {
                if (!_recommendationEngineDb.RecommendationSchedules.Any(x => x.RecommendationScheduleId == id))
                {
                    Error error = new Error
                    {
                        Type = ErrorType.BAD_REQUEST,
                        ErrorMessage = "There are no assets associated to this recommendation."
                    };
                    throw new RequestValidationException(error, "RecommendationEngine");
                }

                DBRecommendationSchedule recToEdit = _recommendationEngineDb.RecommendationSchedules
                    .Include(x => x.AssetsList)
                    .ThenInclude(x => x.Asset)
                    .Include(x => x.AssetsList)
                    .ThenInclude(x => x.Schedule)
                    .Where(x => x.RecommendationScheduleId == id)
                    .FirstOrDefault();

                _recommendationEngineDb.Entry(recToEdit).CurrentValues.SetValues(schedule);
                recToEdit.AssetsList = schedule.AssetsList;
                _recommendationEngineDb.SaveChanges();
                return schedule;
            }
            catch (RequestValidationException) {
                throw;
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public List<DBRecommendationSchedule> GetRecommendationScheduleList()
        {
            try
            {
                return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType).Include(x => x.AssetsList).ThenInclude(asset => asset.Asset).
                                ThenInclude(asset => asset.Type).Include(x => x.AssetsList).ThenInclude(asset => asset.Asset).ThenInclude(x => x.ParentAsset).ToList();
            }
            catch (Exception) {
                throw new DbException();
            }
        }

        public void Delete(int id)
        {
            try
            {
                if (!_recommendationEngineDb.RecommendationSchedules.Any(x => x.RecommendationScheduleId == id))
                {
                    Error error = new Error
                    {
                        Type = ErrorType.BAD_REQUEST,
                        ErrorMessage = "Recommendation ID " + id + " does not exist!"
                    };
                    throw new RequestValidationException(error, "RecommendationEngine");
                }
                DBRecommendationSchedule configToRemove = _recommendationEngineDb.RecommendationSchedules
                    .FirstOrDefault(x => x.RecommendationScheduleId == id);
                _recommendationEngineDb.RecommendationSchedules.Remove(configToRemove);
                _recommendationEngineDb.SaveChanges();
            }
            catch (RequestValidationException) {
                throw;
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public DBRecommendationType GetRecommendationTypeByType(string recommendationType)
        {
            try {
                return _recommendationEngineDb.RecommendationTypes.Include(x => x.AssetTypes).ThenInclude(y => y.AssetType)
                        .Where(rec => rec.Type.Equals(recommendationType))
                        .FirstOrDefault();
            }
            catch (Exception)
            {
                throw new DbException();
            }
        }

        public DBRecommendationSchedule GetRecommendationScheduleById(int id)
        {
            try
            {
                return _recommendationEngineDb.RecommendationSchedules.Include(x => x.RecommendationType)
                    .Include(x => x.AssetsList).ThenInclude(x => x.Asset)
                    .Include(x => x.ParametersList).ThenInclude(x => x.RecommendationParameter)
                    .Include(x => x.JobsList)
                    .FirstOrDefault(x => x.RecommendationScheduleId == id);
            }
            catch (Exception) {
                throw new DbException();
            }
        }

        public List<DBRecommendationParameter> GetParametersForSchedule(DBRecommendationSchedule schedule)
        {
            return _recommendationEngineDb.RecommendationParameters
                .Where(x => x.ForRecommendationType.RecommendationTypeId == schedule.RecommendationType.RecommendationTypeId).ToList();
        }
    }
}
