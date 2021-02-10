using System;
using RecommendationEngine.ExceptionHandler;
using System.Linq;
using Models.DB;
using Models.Application;

namespace RecommendationEngine.ConfiguredRecommendationValidator
{

    public static class ConfiguredRecommendationValidator
    {

        public static void Validate(this ConfiguredRecommendation configuredRecommendation)
        {
            string[] strs = new string[] { configuredRecommendation.Name, configuredRecommendation.CreatedBy, configuredRecommendation.Granularity, configuredRecommendation.Type };

            //subject to change (until we globalize the type of recommendation & not hard-code them)
            if (!configuredRecommendation.Type.Equals("Yearly Wash Optimization"))
            {
                throw new GlobalException(400, "Bad Request", "Recommendation Type is not correct!", "Recommendation Engine");
            }

            if (Array.Exists(strs, str => string.IsNullOrEmpty(str)))
            {
                throw new GlobalException(400, "Bad Request", "string empty or null", "Recommendation Engine");
            }

            if (!Enumerable.Range(1, 7).Contains(configuredRecommendation.RecurrenceDayOfWeek))
            {
                throw new GlobalException(400, "Bad Request", "Day of week must be an int between 1 and 7.", "Recommendation Engine");
            }

            DateTime[] dates = new DateTime[] {configuredRecommendation.RecurrenceDatetime };
            if (Array.Exists(dates, date => date < DateTime.Today))
            {
                throw new GlobalException(400, "Bad Request", "date must be later or equal to today", "Recommendation Engine");
            }

            if (Array.Exists(configuredRecommendation.Parameters.ToArray(), param => param.ParameterValue is null))
            {
                throw new GlobalException(400, "Bad Request", "parameters cannot be empty", "Recommendation Engine");
            }
        }
    }
}