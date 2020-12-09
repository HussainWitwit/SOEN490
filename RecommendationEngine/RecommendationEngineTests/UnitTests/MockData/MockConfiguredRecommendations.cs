using System;
using System.Collections.Generic;
using Models.Application;
using Models.Application.Asset;
using Models.DB;
using Moq;

namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockConfiguredRecommendations
    {
        public static ConfiguredRecommendation BASIC_CONFIGURED_RECOMMENDATION = RecommendationList.BasicConfiguredRecommendation();
        public static ConfiguredRecommendation BAD_CONFIGURED_RECOMMENDATION = RecommendationList.BadConfiguredRecommendation();
        public static ConfiguredRecommendation EMPTY_CONFIGURED_RECOMMENDATION = RecommendationList.EmptyConfiguredRecommendation();
        public static List<DBRecommendationSchedule> BASIC_CONFIGURED_RECOMMENDATION_LIST = RecommendationList.BasicConfiguredRecommendationList();
        public static DBRecommendationType YEARLY_RECOMMENDATION_TYPE = RecommendationList.YearlyRecType();
        public static DBRecommendationSchedule CONVERTED_CONFIGURED_RECOMMENDATION = RecommendationList.BasicDBRecommendationSchedule();

        public static class RecommendationList
        {
            public static List<DBRecommendationSchedule> BasicConfiguredRecommendationList()
            {
                List<DBRecommendationSchedule> list = new List<DBRecommendationSchedule>() {
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 1,
                        Name = "Wash Recommendation 1",
                        ModifiedBy = "Mohanad",
                        CreatedOn = new DateTime().Date,
                        Granularity = "Yearly",
                        PreferedScenario = "ROI",
                        DisplayText = "Wash Recommendation 1",
                        RecurrenceDatetime = new DateTime().Date,
                        RecurrenceDayOfWeek = 2,
                        RecommendationType = new DBRecommendationType() { Type = "Yearly Wash Optimization" },
                        ParametersList = null,
                        AssetsList = new List<DBAssetRecommendationSchedule>()
                        
                    },
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 2,
                        Name = "Wash Recommendation 2",
                        ModifiedBy = "Mohanad",
                        CreatedOn = new DateTime().Date,
                        Granularity = "Yearly",
                        PreferedScenario = "ROI",
                        DisplayText = "Wash Recommendation 2",
                        RecurrenceDatetime = new DateTime().Date,
                        RecurrenceDayOfWeek = 2,
                        RecommendationType = new DBRecommendationType() { Type = "Yearly Wash Optimization" },
                        ParametersList = null,
                        AssetsList = new List<DBAssetRecommendationSchedule>()
                    }
                };

                return list;
            }

            public static DBRecommendationType YearlyRecType()
            {
                return new DBRecommendationType
                {
                    Type = "Yearly Wash Optimization",
                    DisplayText = "Yearly Wash Optimization (yearly)",
                    Description = "Runs the wash optimization on a yearly basis",
                };
            }

            public static ConfiguredRecommendation BasicConfiguredRecommendation()
            {
                AssetLeaf asset = new AssetLeaf
                {
                    Id = 44,
                    Name = "asset44",
                    AcPower = 5,
                    AssetType = YearlyRecType().Description,
                    DisplayText = "asset 44",
                    ElementPath = "asset44.path",
                    EnergyType = "pv"
                };

                return new ConfiguredRecommendation
                {
                    Name = "Wash Rec",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    PreferedScenario = "ROI",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Parameters = null,
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset}
                };
            }

            public static ConfiguredRecommendation EmptyConfiguredRecommendation()
            {
                return new ConfiguredRecommendation
                {
                    Name = "Wash Rec",
                    CreatedBy = "",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Parameters = null
                };
            }

            public static ConfiguredRecommendation BadConfiguredRecommendation()
            {
                return new ConfiguredRecommendation
                {
                    Name = "Wash Rec",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash",
                    Parameters = null
                };
            }

            public static DBRecommendationSchedule BasicDBRecommendationSchedule()
            {
                return new DBRecommendationSchedule
                {
                    Name = "Wash Rec",
                    DisplayText = YEARLY_RECOMMENDATION_TYPE.DisplayText,
                    Granularity = "Yearly",
                    Description = YEARLY_RECOMMENDATION_TYPE.Description,
                    CreatedOn = new DateTime().Date,
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    RecommendationType = YEARLY_RECOMMENDATION_TYPE
                };
            }
        }
    }
}
