using System;
using RecommendationEngine.ExceptionHandler;
using System.Linq;
using Models.Application;
using System.Collections.Generic;

namespace RecommendationEngine.ConfiguredRecommendationValidator
{

    public static class ConfiguredRecommendationValidator
    {
        public static List<Error> ErrorList = new List<Error>();
        private const string APP_NAME = "Recommendation Engine";

        public static void Validate(this ConfiguredRecommendation configuredRecommendation)
        {
            EmptyOrNullField(configuredRecommendation);
            ValidRecommendationType(configuredRecommendation);
            ValidRecurrenceDayOfWeek(configuredRecommendation);
            ValidDateRange(configuredRecommendation);
            ValidPreferredScenario(configuredRecommendation);
            ThrowPotentialError();
        }

        private static void ThrowPotentialError() {
            if (ErrorList.Any()) {
                List<Error> copyList = new List<Error>(ErrorList);
                ErrorList.Clear();
                throw new GlobalException(copyList, APP_NAME);
            }
        }

        private static void AddToErrors(string errorType, int errorCode, string message)
        {
            ErrorList.Add(new Error(errorType, errorCode, message));
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
                AddToErrors(ErrorType.VALIDATION, 400, "Empty or null field");
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

            if (Array.Exists(validRecommendationTypes, type => !type.Equals(recommendationType)))
            {
                AddToErrors(ErrorType.VALIDATION, 400, "The recommendation type " + recommendationType  + " is not valid.");
            }
        }

        private static void ValidRecurrenceDayOfWeek(ConfiguredRecommendation configuredRecommendation) {
            int dayOfWeek = configuredRecommendation.RecurrenceDayOfWeek;

            if (!Enumerable.Range(1, 7).Contains(dayOfWeek))
            {
                AddToErrors(ErrorType.VALIDATION, 400, "The reccurence day of week "  + dayOfWeek  + " is not valid. Day of week must be between 1 and 7.");
            }
        }

        private static void ValidDateRange(ConfiguredRecommendation configuredRecommendation) {
            if (configuredRecommendation.RecurrenceDatetime < DateTime.Today) {
                AddToErrors(ErrorType.VALIDATION, 400, "The date must be later or equal to today.");
            }
        }

        private static void ValidPreferredScenario(ConfiguredRecommendation configuredRecommendation) {
            string scenario = configuredRecommendation.PreferredScenario;

            if (!scenario.Equals("ROI") || !scenario.Equals("NetSaving")) {
                AddToErrors(ErrorType.VALIDATION, 400, "The scenario " + scenario + " is not a valid scenario.");
            }
        }
    }
}