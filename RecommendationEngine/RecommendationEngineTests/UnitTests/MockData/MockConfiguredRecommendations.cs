using System;
using System.Collections.Generic;
using Models.DB;
using RecommendationEngine.Models.Application;

namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockConfiguredRecommendations
    {
        public static ConfiguredRecommendation BASIC_CONFIGURED_RECOMMENDATION = RecommendationList.BasicConfiguredRecommendation();
        public static ConfiguredRecommendation BAD_CONFIGURED_RECOMMENDATION = RecommendationList.BadConfiguredRecommendation();
        public static ConfiguredRecommendation EMPTY_CONFIGURED_RECOMMENDATION = RecommendationList.EmptyConfiguredRecommendation();
        public static List<ConfiguredRecommendation> BASIC_CONFIGURED_RECOMMENDATION_LIST = RecommendationList.BasicConfiguredRecommendationList();
        public static DBRecommendationType YEARLY_RECOMMENDATION_TYPE = RecommendationList.YearlyRecType();
        public static DBRecommendationSchedule CONVERTED_CONFIGURED_RECOMMENDATION = RecommendationList.BasicDBRecommendationSchedule();
        public static ConfiguredRecommendation UNEDITED_CONFIGURED_RECOMMENDATION = RecommendationList.UneditedConfiguredRecommendation();
        public static ConfiguredRecommendation EDITED_CONFIGURED_RECOMMENDATION = RecommendationList.EditedConfiguredRecommendation();
        public static DBRecommendationSchedule UNEDITED_DB_RECOMMENDATION = RecommendationList.UneditedDBRecommendationSchedule();
        public static DBRecommendationSchedule EDITED_DB_RECOMMENDATION = RecommendationList.EditedDBRecommendationSchedule();


        public static class RecommendationList
        {
            public static List<ConfiguredRecommendation> BasicConfiguredRecommendationList()
            {
                List<ConfiguredRecommendation> list = new List<ConfiguredRecommendation>() {
                    new ConfiguredRecommendation
                    {
                        Name = "Wash Recommendation 1",
                        CreatedBy = "Mohanad",
                        CreatedOn = new DateTime().Date,
                        Granularity = "Yearly",
                        RecurrenceDatetime = new DateTime().Date,
                        RecurrenceDayOfWeek = 2,
                        Type = "Yearly Wash Optimization",
                        Parameters = null
                    },
                    new ConfiguredRecommendation
                    {
                        Name = "Wash Recommendation 1",
                        CreatedBy = "Mohanad",
                        CreatedOn = new DateTime().Date,
                        Granularity = "Yearly",
                        RecurrenceDatetime = new DateTime().Date,
                        RecurrenceDayOfWeek = 2,
                        Type = "Yearly Wash Optimization",
                        Parameters = null
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
                    Description = "Runs the wash optimization on a yearly basis"
                };
            }

            public static ConfiguredRecommendation BasicConfiguredRecommendation()
            {
                return new ConfiguredRecommendation
                {
                    Name = "Wash Rec",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Parameters = null
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
                    Granularity = "Monthly",
                    Description = YEARLY_RECOMMENDATION_TYPE.Description,
                    CreatedOn = new DateTime().Date,
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 5,
                    RecommendationType = YEARLY_RECOMMENDATION_TYPE
                };
            }

            public static ConfiguredRecommendation UneditedConfiguredRecommendation()
            {
                return new ConfiguredRecommendation
                {
                    Name = "Wash Rec",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Yearly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 2,
                    Type = "Yearly Wash Optimization",
                    Parameters = null
                };
            }

            public static ConfiguredRecommendation EditedConfiguredRecommendation()
            {
                return new ConfiguredRecommendation
                {
                    Name = "Wash Rec W20",
                    CreatedBy = "Zohal",
                    CreatedOn = new DateTime(),
                    Granularity = "Monthly",
                    RecurrenceDatetime = new DateTime(2025, 10, 10),
                    RecurrenceDayOfWeek = 5,
                    Type = "Yearly Wash Optimization",
                    Parameters = null
                };
            }
        }
    }
}
