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
        private IConfiguredRecommendationHelper _configRecommendationHelper;
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
            if(configuredRecommendation.validate())
            list.Add(configuredRecommendation);
        }

        /* TODO 
         * 
         * 1- Error handling list
         *
         * All string (title) not null or whitespace
         * DayOfWeek (M T W T F S S) is not null or empty
         * Check for other variables to have valid values
         * 
         * In case of exception, throw a custom exception!
         * Handle business logic in a seperate file.
         * 
         * 
         */
    }
}
