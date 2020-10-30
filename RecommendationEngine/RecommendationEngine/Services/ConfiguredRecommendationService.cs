using System;
using System.Collections.Generic;
using RecommendationEngine.Models.Application;
using Interfaces.Services;
using Interfaces.Services.ExternalApi;
using Models.DB;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.configuredRecommendationHelper;

namespace RecommendationEngine.ConfiguredRecommendationService
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        private RecommendationEngineDBContext _recommendationEngineRepository;
        public List<ConfiguredRecommendation> list = new List<ConfiguredRecommendation>();

        public ConfiguredRecommendationService(IDriveService driveService, RecommendationEngineDBContext recommendationEngineRepository)
        {
            _driveService = driveService;
            _recommendationEngineRepository = recommendationEngineRepository;
        }

        public List<ConfiguredRecommendation> getConfiguredRecommendationList() {
            return list;
        }

        public void addConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation) {
            configuredRecommendation.Validate();
            list.Add(configuredRecommendation);
        }
    }
}
