using Interfaces.RecommendationScheduler;
using Interfaces.Repositories;
using Interfaces.Services;
using Interfaces.Services.ExternalAPI;
using Models.Application;
using Models.Application.Asset;
using Models.DB;
using RecommendationEngine.ConfiguredRecommendationValidator;
using System.Collections.Generic;
using System.Linq;
using RecommendationEngine.ExceptionHandler;

namespace RecommendationEngine.ConfiguredRecommendationServices
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        private IConfiguredRecommendationRepository _recommendationRepository;
        private IAssetRepository _assetRepository;
        private IRecommendationScheduler _scheduler;

        public ConfiguredRecommendationService(
                IDriveService driveService,
                IConfiguredRecommendationRepository recommendationRepository,
                IAssetRepository assetRepository,
                IRecommendationScheduler scheduler
        )
        {
            _driveService = driveService;
            _recommendationRepository = recommendationRepository;
            _assetRepository = assetRepository;
            _scheduler = scheduler;
        }

        public List<ConfiguredRecommendation> GetConfiguredRecommendationList()
        {
            List<DBRecommendationSchedule> dbconfiguredRecommendations = _recommendationRepository.GetRecommendationScheduleList();

            List<ConfiguredRecommendation> recommendations = new List<ConfiguredRecommendation>();

            foreach (DBRecommendationSchedule dbConfigRecommendation in dbconfiguredRecommendations)
            {
                recommendations.Add(
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
                    });
            }
            return recommendations;
        }

        public void AddConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation)
        {
            var recommendationType = _recommendationRepository.GetRecommendationTypeByType(configuredRecommendation.Type);
            configuredRecommendation.Validate();

            DBRecommendationSchedule config = new DBRecommendationSchedule
            {
                Name = configuredRecommendation.Name,
                DisplayText = recommendationType.DisplayText,
                Granularity = configuredRecommendation.Granularity,
                PreferedScenario = configuredRecommendation.PreferredScenario,
                CreatedOn = configuredRecommendation.CreatedOn,
                ModifiedBy = configuredRecommendation.CreatedBy,
                RecurrenceDatetime = configuredRecommendation.RecurrenceDatetime,
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

            var schedule = _recommendationRepository.Add(config);

            _scheduler.ScheduleJobAsync(schedule);
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
                throw new GlobalException
                {
                    ApplicationName = "RecommendationEngine",
                    ErrorMessage = "Could not find a configured recommendation",
                    Code = 404,
                    Type = "Not Found"
                };
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
                LastJobs = schedule.JobsList.TakeLast(5).Select(x => new ConfiguredRecommendationJob
                {
                    Id = x.RecommendationJobId,
                    Status = x.Status,
                    Timestamp = x.Timestamp
                }).ToList(),
                AssetList = schedule.AssetsList.Select(x => new AssetLeaf
                {
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
    }
}