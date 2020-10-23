using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Models.Application;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class ConfiguredRecommendationService
    {
        public List<ConfiguredRecommendation> list = new List<ConfiguredRecommendation>();

        public ConfiguredRecommendationService() {
        }

        public List<ConfiguredRecommendation> getConfiguredRecommendationList() {
            return list;
        }

        public void addConfiguredRecommendation(ConfiguredRecommendation configuredRecommendation) {
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
         * 2- Merge dev changes
         * Dependency Injections
         */
    }
}
