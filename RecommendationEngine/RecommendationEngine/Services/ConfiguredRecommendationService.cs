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
                        Name = dbConfigRecommendation.Name,
                        Type = dbConfigRecommendation.RecommendationType.Type,
                        Granularity = dbConfigRecommendation.Granularity,
                        CreatedBy = dbConfigRecommendation.ModifiedBy,
                        PreferedScenario = dbConfigRecommendation.PreferedScenario,
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
            configuredRecommendation.Validate(recommendationType);

            DBRecommendationSchedule config = new DBRecommendationSchedule
            {
                Name = configuredRecommendation.Name,
                DisplayText = recommendationType.DisplayText,
                Granularity = configuredRecommendation.Granularity,
                PreferedScenario = configuredRecommendation.PreferedScenario,
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
    }
}