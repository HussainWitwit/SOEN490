using System;
using System.Collections.Generic;
using Models.Application;
using Models.Application.Asset;
using Models.DB;
using Models.Recommendation;
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
        public static ConfiguredRecommendation UNEDITED_CONFIGURED_RECOMMENDATION = RecommendationList.UneditedConfiguredRecommendation();
        public static ConfiguredRecommendation EDITED_CONFIGURED_RECOMMENDATION = RecommendationList.EditedConfiguredRecommendation();
        public static DBRecommendationSchedule UNEDITED_DB_RECOMMENDATION = RecommendationList.UneditedDBRecommendationSchedule();
        public static DBRecommendationSchedule EDITED_DB_RECOMMENDATION = RecommendationList.EditedDBRecommendationSchedule();
        public static List<DBRecommendationType> RECOMMENDATION_TYPE = RecommendationList.RecommendationType();

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
                        ParametersList = new List<DBRecommendationScheduleParameter>{ new DBRecommendationScheduleParameter
                        {
                            ParamValue = "1",
                            RecommendationParameter = new DBRecommendationParameter
                            {
                                Name = "TestParam"
                            }
                        }},
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

            public static List<DBRecommendationType> RecommendationType()
            {
                List<DBRecommendationType> dbRecTypes = new List<DBRecommendationType>()
                {
                    new DBRecommendationType {
                        RecommendationTypeId = 1,
                        DisplayText = "Yearly Wash Optimzation",
                        Description = "Description",
                        EnergyType = "pv",
                        Type = "Yearly Wash Optimzation",
                        DefaultParametersList = new List<DBRecommendationParameter>() {
                            new DBRecommendationParameter {
                                DisplayText = "Center Point",
                                DefaultValue = "3.25"
                            }
                        }
                    }
                };

                return dbRecTypes;
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
                    Name = "RENEW01_2070.93.011",
                    AcPower = 5,
                    AssetType = YearlyRecType().Description,
                    DisplayText = "Bearford II",
                    ElementPath = "RENEW01_2070.93.011",
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
                    Parameters = null,
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset}
                };
            }

            public static ConfiguredRecommendation EmptyConfiguredRecommendation()
            {
                AssetLeaf asset = new AssetLeaf
                {
                    Id = 44,
                    Name = "RENEW01_2070.93.011",
                    AcPower = 5,
                    AssetType = YearlyRecType().Description,
                    DisplayText = "Bearford II",
                    ElementPath = "RENEW01_2070.93.011",
                    EnergyType = "pv"
                };

                return new ConfiguredRecommendation
                {
                    Name = "",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    PreferredScenario = "",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Parameters = null,
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset }
                };
            }

            public static ConfiguredRecommendation BadConfiguredRecommendation()
            {
                AssetLeaf asset = new AssetLeaf
                {
                    Id = 44,
                    Name = "RENEW01_2070",
                    AcPower = 5,
                    AssetType = YearlyRecType().Description,
                    DisplayText = "Parent",
                    ElementPath = "RENEW01_2070",
                    EnergyType = "pv"
                };

                return new ConfiguredRecommendation
                {
                    Name = "",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    PreferredScenario = "ROI",
                    Parameters = null,
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset }
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

            public static DBRecommendationSchedule UneditedDBRecommendationSchedule()
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

            public static DBRecommendationSchedule EditedDBRecommendationSchedule() {
                return new DBRecommendationSchedule
                {
                    Name = "Wash Rec W20",
                    DisplayText = YEARLY_RECOMMENDATION_TYPE.DisplayText,
                    Granularity = "Yearly",
                    Description = YEARLY_RECOMMENDATION_TYPE.Description,
                    CreatedOn = new DateTime().Date,
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 5,
                    RecommendationType = YEARLY_RECOMMENDATION_TYPE
                };
            }

            public static ConfiguredRecommendation UneditedConfiguredRecommendation()
            {
                AssetLeaf asset = new AssetLeaf
                {
                    Id = 44,
                    Name = "RENEW01_2070.93.011",
                    AcPower = 5,
                    AssetType = YearlyRecType().Description,
                    DisplayText = "Bearford II",
                    ElementPath = "RENEW01_2070.93.011",
                    EnergyType = "pv"
                };

                return new ConfiguredRecommendation
                {
                    Id = 1,
                    Name = "Wash Rec",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Description = "Description of algo",
                    PreferredScenario = "ROI",
                    Parameters = null,
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset }
                };
            }

            public static ConfiguredRecommendation EditedConfiguredRecommendation()
            {
                AssetLeaf asset = new AssetLeaf
                {
                    Id = 44,
                    Name = "RENEW01_2070.93.011",
                    AcPower = 5,
                    AssetType = YearlyRecType().Description,
                    DisplayText = "Bearford II",
                    ElementPath = "RENEW01_2070.93.011",
                    EnergyType = "pv"
                };

                return new ConfiguredRecommendation
                {
                    Id = 1,
                    Name = "Wash Rec W20",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Monthly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 5,
                    Type = "Yearly Wash Optimization",
                    Description = "Description of algo",
                    PreferredScenario = "ROI",
                    Parameters = null,
                    AssetIdList = new List<int>() { 44 },
                    AssetList = new List<AssetLeaf>() { asset }
                };
            }
        }
    }
}
