﻿using Interfaces.RecommendationScheduler;
using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application;
using Models.Application.Asset;
using Models.DB;
using RecommendationEngine.ConfiguredRecommendationValidator;
using System.Collections.Generic;
using System.Linq;
using RecommendationEngine.ExceptionHandler;
using System;
using Microsoft.AspNetCore.Http;

namespace RecommendationEngine.Services
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IConfiguredRecommendationRepository _recommendationRepository;
        private IAssetRepository _assetRepository;
        private IRecommendationScheduler _scheduler;

        public ConfiguredRecommendationService(
                IConfiguredRecommendationRepository recommendationRepository,
                IAssetRepository assetRepository,
                IRecommendationScheduler scheduler
        )
        {
            _recommendationRepository = recommendationRepository;
            _assetRepository = assetRepository;
            _scheduler = scheduler;
        }

        public List<ConfiguredRecommendation> GetConfiguredRecommendationList()
        {
            return _recommendationRepository.GetRecommendationScheduleList().Select(dbConfigRecommendation =>
                    new ConfiguredRecommendation
                    {
                        Id = dbConfigRecommendation.RecommendationScheduleId,
                        Name = dbConfigRecommendation.Name,
                        Type = dbConfigRecommendation.RecommendationType.Type,
                        Granularity = dbConfigRecommendation.Granularity,
                        CreatedBy = dbConfigRecommendation.ModifiedBy,
                        PreferredScenario = dbConfigRecommendation.PreferedScenario,
                        AssetIdList = dbConfigRecommendation.AssetsList.Select(asset => asset.AssetId).ToList(),
                        AssetList = dbConfigRecommendation.AssetsList.Select(asset => ConvertDBAssetIntoAssetLeaf(asset.Asset)).ToList(),
                        RecurrenceDayOfWeek = dbConfigRecommendation.RecurrenceDayOfWeek,
                        RecurrenceDatetime = dbConfigRecommendation.RecurrenceDatetime,
                        CreatedOn = dbConfigRecommendation.CreatedOn,
                        Parameters = null
                    }).ToList();
        }

        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            var recommendationType = _recommendationRepository.GetRecommendationTypeByType(configuredRecommendation.Type);

            DBRecommendationSchedule config = new DBRecommendationSchedule
            {
                Name = configuredRecommendation.Name,
                DisplayText = recommendationType.DisplayText,
                Granularity = configuredRecommendation.Granularity,
                PreferedScenario = configuredRecommendation.PreferredScenario,
                CreatedOn = (configuredRecommendation.CreatedOn).ToLocalTime(),
                ModifiedBy = configuredRecommendation.CreatedBy,
                RecurrenceDatetime = (configuredRecommendation.RecurrenceDatetime).ToLocalTime(),
                RecurrenceDayOfWeek = configuredRecommendation.RecurrenceDayOfWeek,
                RecommendationType = recommendationType
            };

            List<DBAssetRecommendationSchedule> dbAssets = new List<DBAssetRecommendationSchedule>();

            configuredRecommendation.AssetIdList.ForEach(id =>
            {
                DBAsset asset = _assetRepository.GetAssetById(id);
                DBAssetRecommendationSchedule assetSchedule = new DBAssetRecommendationSchedule
                {
                    Asset = asset,
                    AssetId = asset.AssetId,
                    Schedule = config,
                };

                dbAssets.Add(assetSchedule);
            });

            config.AssetsList = dbAssets;

            configuredRecommendation.ThrowPotentialException(dbAssets);

            var schedule = _recommendationRepository.Add(config);

            _scheduler.ScheduleJobAsync(schedule);
        }

        public void DeleteConfiguredRecommendation(int id)
        {
            _recommendationRepository.Delete(id);
        }

        public AssetLeaf ConvertDBAssetIntoAssetLeaf(DBAsset asset)
        {
            return new AssetLeaf
            {
                Id = asset.AssetId,
                Name = asset.Name,
                AcPower = asset.AcPower,
                AssetType = asset.Type.Name,
                DisplayText = asset.DisplayText,
                ElementPath = asset.ElementPath,
                EnergyType = asset.EnergyType,
                TimeZone = asset.TimeZone,
            };
        }

        public ConfiguredRecommendation GetConfiguredRecommendationById(int id)
        {

            DBRecommendationSchedule schedule = _recommendationRepository.GetRecommendationScheduleById(id);

            if (schedule == null)
            {
                Error error = new Error
                {
                    Type = ErrorType.BAD_REQUEST,
                    ErrorCode = 400,
                    ErrorMessage = "There is no configured recommendation with recommendaion ID " + id
                };
                throw new GlobalException(error, "Recommendaiton Engine");
            }

            ConfiguredRecommendation configuredRecommendation = new ConfiguredRecommendation
            {
                Id = schedule.RecommendationScheduleId,
                Name = schedule.Name,
                Type = schedule.RecommendationType.Type,
                Description = schedule.Description,
                CreatedBy = schedule.ModifiedBy,
                CreatedOn = schedule.CreatedOn,
                PreferredScenario = schedule.PreferedScenario,
                RecurrenceDatetime = schedule.RecurrenceDatetime,
                RecurrenceDayOfWeek = schedule.RecurrenceDayOfWeek,
                Granularity = schedule.Granularity,
                LastJobs = schedule.JobsList.TakeLast(5).Select(x => new Job
                {
                    Id = x.RecommendationJobId,
                    Status = x.Status,
                    Timestamp = x.Timestamp
                }).ToList(),
                AssetList = schedule.AssetsList.Select(x => new AssetLeaf
                {
                    Id = x.AssetId,
                    Name = x.Asset.Name,
                    DisplayText = x.Asset.DisplayText,
                    AcPower = x.Asset.AcPower,
                    ElementPath = x.Asset.ElementPath,
                    EnergyType = x.Asset.EnergyType,
                    TimeZone = x.Asset.TimeZone
                }).ToList(),
                Parameters = schedule.ParametersList.Select(x => new ConfiguredRecommendationParameter
                {
                    ParameterName = x.RecommendationParameter.DisplayText,
                    ParameterValue = x.ParamValue
                }).ToList()
            };
            // We need last 5 jobs status, and if we have less, we populate with null to simplify frontend manipulation
            while (configuredRecommendation.LastJobs.Count < 5) configuredRecommendation.LastJobs.Insert(0, null);
            return configuredRecommendation;
        }

        public ConfiguredRecommendation EditConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation, int id)
        {
            var recommendationType = _recommendationRepository.GetRecommendationTypeByType(configuredRecommendation.Type);

            DBRecommendationSchedule config = new DBRecommendationSchedule
            {
                RecommendationScheduleId = id,
                Name = configuredRecommendation.Name,
                DisplayText = recommendationType.DisplayText,
                Granularity = configuredRecommendation.Granularity,
                Description = recommendationType.Description,
                CreatedOn = configuredRecommendation.CreatedOn,
                RecurrenceDatetime = configuredRecommendation.RecurrenceDatetime,
                RecurrenceDayOfWeek = configuredRecommendation.RecurrenceDayOfWeek,
                PreferedScenario = configuredRecommendation.PreferredScenario,
                ModifiedBy = configuredRecommendation.CreatedBy,
                RecommendationType = recommendationType
            };

            List<DBAssetRecommendationSchedule> dbAssets = new List<DBAssetRecommendationSchedule>();

            configuredRecommendation.AssetIdList.ForEach(id =>
            {
                DBAsset asset = _assetRepository.GetAssetById(id);
                DBAssetRecommendationSchedule assetSchedule = new DBAssetRecommendationSchedule
                {
                    Asset = asset,
                    AssetId = asset.AssetId,
                    Schedule = config,
                };

                dbAssets.Add(assetSchedule);
            });

            config.AssetsList = dbAssets;
            configuredRecommendation.ThrowPotentialException(dbAssets);
            var schedule = _recommendationRepository.Edit(config, id);
            _scheduler.ScheduleJobAsync(config);
            return configuredRecommendation;
        }
    }
}