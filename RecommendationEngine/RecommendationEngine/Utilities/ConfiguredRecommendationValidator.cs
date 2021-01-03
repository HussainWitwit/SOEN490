using System;
using RecommendationEngine.ExceptionHandler;
using System.Linq;
using Models.DB;
using Models.Application;
using System.Collections.Generic;

namespace RecommendationEngine.ConfiguredRecommendationValidator
{

    public static class ConfiguredRecommendationValidator
    {
        private const string APP_NAME = "Recommendation Engine";

        public static void Validate(this ConfiguredRecommendation configuredRecommendation)
        {
            EmptyOrNullField(configuredRecommendation);
            ValidRecommendationType(configuredRecommendation);
            ValidRecurrenceDayOfWeek(configuredRecommendation);
            ValidDateRange(configuredRecommendation);
            ValidPreferredScenario(configuredRecommendation);
        }

        private static void throwException(int code, string errorType, string message)
        {
            throw new GlobalException(code, errorType, message, APP_NAME);
        }

        private static void EmptyOrNullField(ConfiguredRecommendation configuredRecommendation) {
            string[] fields = new string[] {
                configuredRecommendation.Name,
                configuredRecommendation.CreatedBy,
                configuredRecommendation.Granularity,
                configuredRecommendation.Type,
                configuredRecommendation.PreferredScenario
            };

            if (Array.Exists(fields, field => string.IsNullOrEmpty(field))) {
                throwException(400, "Bad Request", "Empty or null field");
            }
        }

        private static void ValidRecommendationType(ConfiguredRecommendation configuredRecommendation) {
            string recommendationType = configuredRecommendation.Type;

            string[] validRecommendationTypes = new string[] {
                "Yearly Wash Optimization",
                "Gear Replacement",
                "Fuse Replacement",
                "Panel Angle",
                "ETC",
                "Other"
            };

            if (Array.Exists(validRecommendationTypes, type => type.Equals(recommendationType)))
            {
                throwException(400, "Bad Request", "The recommendation type \"" + recommendationType + "\" is not valid.");
            }
        }

        private static void ValidRecurrenceDayOfWeek(ConfiguredRecommendation configuredRecommendation) {
            int dayOfWeek = configuredRecommendation.RecurrenceDayOfWeek;

            if (!Enumerable.Range(1, 7).Contains(dayOfWeek))
            {
                throwException(400, "Bad Request", "The reccurence day of week \"" + dayOfWeek + "\" is not valid. Day of week must be between 1 and 7.");
            }
        }

        private static void ValidDateRange(ConfiguredRecommendation configuredRecommendation) {
            if (configuredRecommendation.RecurrenceDatetime < DateTime.Today) {
                throwException(400, "Bad Request", "The date must be later or equal to today.");
            }
        }

        private static void ValidPreferredScenario(ConfiguredRecommendation configuredRecommendation) {
            string scenario = configuredRecommendation.PreferredScenario;

            if (!scenario.Equals("ROI") || !scenario.Equals("NetSaving")) {
                throwException(400, "Bad Request", "The scenario \"" + scenario + "\" is not a valid scenario.");
            }
        }
    }
}