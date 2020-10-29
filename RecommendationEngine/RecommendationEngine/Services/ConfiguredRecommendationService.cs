using System;
using System.Collections.Generic;
using RecommendationEngine.Models.Application;
using Interfaces.Services;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngine.configuredRecommendationHelper;

namespace RecommendationEngine.Services
{
    public class ConfiguredRecommendationService : IConfiguredRecommendationService
    {
        private IDriveService _driveService;
        public List<ConfiguredRecommendation> list = new List<ConfiguredRecommendation>();

        public ConfiguredRecommendationService(IDriveService driveService)
        {
            this._driveService = driveService;
        }

        public List<ConfiguredRecommendation> getConfiguredRecommendationList() {
            return list;
        }

        public void addConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation) {
            configuredRecommendation.validate();
            list.Add(configuredRecommendation);
        }
    }
}
