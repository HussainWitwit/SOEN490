using System;
using RecommendationEngine.ExceptionHandler;
using System.Linq;
using Models.Application;
using System.Collections.Generic;
using Models.DB;

namespace RecommendationEngine.ConfiguredRecommendationValidator
{

    public static class ConfiguredRecommendationValidator
    {
        public static List<Error> ErrorList = new List<Error>();
        private const string APP_NAME = "Recommendation Engine";

        public static void ThrowPotentialException(this ConfiguredRecommendation configuredRecommendation, List<DBAssetRecommendationSchedule> assetList) {
            Validate(configuredRecommendation, assetList);

            if (ErrorList.Any())
            {
                List<Error> copyList = new List<Error>(ErrorList);
                ErrorList.Clear();
                throw new GlobalException(copyList, APP_NAME);
            }
        }

        private static void Validate(this ConfiguredRecommendation configuredRecommendation, List<DBAssetRecommendationSchedule> assetsList)
        {
            EmptyOrNullField(configuredRecommendation);
            ValidRecommendationType(configuredRecommendation);
            ValidRecurrenceDayOfWeek(configuredRecommendation);
            ValidDateRange(configuredRecommendation);
            ValidPreferredScenario(configuredRecommendation);
            ValidAssetsList(assetsList);
        }

        private static void AddToErrors(string errorType, int errorCode, string message)
        {
            ErrorList.Add(new Error(errorType, errorCode, message));
        }

        private static void EmptyOrNullField(ConfiguredRecommendation configuredRecommendation) {
            List<string> fields = new List<string> {
                configuredRecommendation.Name,
                configuredRecommendation.CreatedBy,
                configuredRecommendation.Granularity,
                configuredRecommendation.Type,
                configuredRecommendation.PreferredScenario
            };

            List<string> fieldNames = new List<string> {"Name", "CreatedBy", "Granularity", "Type", "PreferredScenario" };

            int fieldIndex = 0;
            fields.ForEach(field =>
            {
                if (string.IsNullOrEmpty(field))
                {
                    AddToErrors(ErrorType.VALIDATION, 400, "The field " + fieldNames.ElementAt(fieldIndex) + " is empty or null.");
                }
                fieldIndex++;
            });
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

            if (!scenario.Equals("ROI") && !scenario.Equals("NetSaving")) {
                AddToErrors(ErrorType.VALIDATION, 400, "The scenario " + scenario + " is not a valid scenario.");
            }
        }

        private static void ValidAssetsList(List<DBAssetRecommendationSchedule> assetsList)
        {
            if (assetsList.Count() == 0) {
                AddToErrors(ErrorType.VALIDATION, 400, "The assets list is empty.");
                return;
            }

            List<int> assetListIds = assetsList.Select(asset => asset.AssetId).ToList();
            if (assetListIds.Count != assetListIds.Distinct().Count())
            {
                AddToErrors(ErrorType.VALIDATION, 400, "The assets list contains one or more duplicates.");
            }

            assetsList.ForEach(asset =>
            {
                string assetType = asset.Asset.Name;
                int assetId = asset.AssetId;

                // We would like to check if the asset in question is plant by ensuring the number of decimals is more than 2.
                if (assetType.Count(pattern => pattern == '.') < 2)
                {
                    AddToErrors(ErrorType.VALIDATION, 400, "The asset ID " + assetId + " is not a plant.");
                }
            });
        }
    }
}