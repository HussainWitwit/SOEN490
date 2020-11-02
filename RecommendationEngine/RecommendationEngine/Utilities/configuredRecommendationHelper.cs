using System;
using RecommendationEngine.Models.Application;
using RecommendationEngine.ExceptionHandler;
using System.Linq;

namespace RecommendationEngine.configuredRecommendationHelper
{

    public static class ConfiguredRecommendationHelper
    { 

        public static void Validate(this ConfiguredRecommendation configuredRecommendation)
        {
            string[] strs = new string[] { configuredRecommendation.Title, configuredRecommendation.CreatedBy, configuredRecommendation.Granularity, configuredRecommendation.Periodicity, configuredRecommendation.Type };

            if (Array.Exists(strs, str => string.IsNullOrEmpty(str)))
            {
                throw new GlobalException(400, "Bad Request", "string empty or null", "Recommendation Engine");
            }
            if (!Enumerable.Range(1, 7).Contains(configuredRecommendation.DayOfWeek) || configuredRecommendation.FrequencyOfRepetiton <= 0)
            {
                throw new GlobalException(400, "Bad Request", "int out of range", "Recommendation Engine");
            }
            DateTime[] dates = new DateTime[] { configuredRecommendation.StartDate, configuredRecommendation.EndDate, configuredRecommendation.OccurrenceDatetime };
            if (Array.Exists(dates, date => date < DateTime.Today))
            {
                throw new GlobalException(400, "Bad Request", "date must be later or equal to today", "Recommendation Engine");
            }
        }
    }
}