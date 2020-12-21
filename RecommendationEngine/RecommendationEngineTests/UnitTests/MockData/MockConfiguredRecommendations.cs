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
        public static ConfiguredRecommendation BASIC_CONFIGURED_RECOMMENDATION_2 = RecommendationList.BasicConfiguredRecommendation2();
        public static ConfiguredRecommendation EMPTY_CONFIGURED_RECOMMENDATION = RecommendationList.EmptyConfiguredRecommendation();
        public static List<DBRecommendationSchedule> BASIC_CONFIGURED_RECOMMENDATION_LIST = RecommendationList.BasicConfiguredRecommendationList();
        public static DBRecommendationType YEARLY_RECOMMENDATION_TYPE = RecommendationList.YearlyRecType();
        public static DBRecommendationSchedule CONVERTED_CONFIGURED_RECOMMENDATION = RecommendationList.BasicDBRecommendationSchedule();
        public static List<DBRecommendationScheduleParameter> BASIC_PARAMETER_LIST = RecommendationList.BasicParameters();

        public static class RecommendationList
        {
            public static List<DBRecommendationSchedule> BasicConfiguredRecommendationList()
            {
                DBAsset asset = new DBAsset
                {
                    AssetId = 9,
                    Name = "dbasset9",
                    AcPower = 17,
                    Type = new DBAssetType() { Name = "plant" },
                    DisplayText = "asset 9",
                    ElementPath = "path9",
                    EnergyType = "pv",
                    TimeZone = "timezoneTest"

                };

                DBAssetRecommendationSchedule dbAssetRecSchedule = new DBAssetRecommendationSchedule()
                {
                    Asset = asset,
                    AssetId = 9
                };

                List<DBRecommendationSchedule> list = new List<DBRecommendationSchedule>() {
                    new DBRecommendationSchedule
                    {
                        RecommendationScheduleId = 1,
                        Name = "Wash Recommendation 1",
                        ModifiedBy = "Mohanad",
                        CreatedOn = new DateTime().Date,
                        Description = "Description",
                        Granularity = "Yearly",
                        PreferedScenario = "ROI",
                        DisplayText = "Wash Recommendation 1",
                        RecurrenceDatetime = new DateTime().Date,
                        RecurrenceDayOfWeek = 2,
                        RecommendationType = new DBRecommendationType() { Type = "Yearly Wash Optimization" },
                        ParametersList = BasicParameters(),
                        AssetsList = new List<DBAssetRecommendationSchedule>() { dbAssetRecSchedule },
                        JobsList = new List<DBRecommendationJob>{new DBRecommendationJob{RecommendationJobId = 1, Status = "Success", Timestamp = DateTime.Now}},

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
                        AssetsList = new List<DBAssetRecommendationSchedule>() { dbAssetRecSchedule }
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

            public static List<DBRecommendationScheduleParameter> BasicParameters()
            {
                return new List<DBRecommendationScheduleParameter>
                {
                    new DBRecommendationScheduleParameter
                    {
                        ParamValue = 1,
                        RecommendationParameter = new DBRecommendationParameter
                        {
                            Name = "Soiling level"
                        }
                    },
                    new DBRecommendationScheduleParameter
                    {
                        ParamValue = 31,
                        RecommendationParameter = new DBRecommendationParameter
                        {
                            Name = "Span increment"
                        }
                    }
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
                    PreferredScenario = "ROI",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Parameters = new List<ConfiguredRecommendationParameter>
                    {
                        new ConfiguredRecommendationParameter
                        {
                            ParameterName = "Soiling level",
                            ParameterValue = 1
                        },
                        new ConfiguredRecommendationParameter
                        {
                            ParameterName = "Span increment",
                            ParameterValue = 31
                        }
                    },
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset}
                };
            }

            public static ConfiguredRecommendation BasicConfiguredRecommendation2()
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
                    PreferredScenario = "ROI",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Parameters = new List<ConfiguredRecommendationParameter>
                    {
                        new ConfiguredRecommendationParameter
                        {
                            ParameterName = "Soiling level",
                            ParameterValue = 1
                        },
                    },
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset }
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
