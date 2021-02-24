using System;
using System.Collections.Generic;
using Models.DB;
using Models.Recommendation;

namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockRecommendationType
    {
        public static List<DBRecommendationType> BASIC_CONFIGURED_RECOMMENDATION_TYPE = RecommendationType.BasicRecommendationType();

        public static class RecommendationType
        {
            public static List<DBRecommendationType> BasicRecommendationType()
            {
                return new List<DBRecommendationType> {
                    new DBRecommendationType {
                        DisplayText = "YWO",
                        Type = "Yearly Wash Optimization",
                        Description = "Description of YWO",
                        DefaultParametersList = new List<DBRecommendationParameter>{
                            new DBRecommendationParameter {
                                DefaultValue = "3.25",
                                Name = "Center Point"
                            }
                        },
                        AssetTypes = new List<DBAssetTypeRecommendationType>
                        {
                            new DBAssetTypeRecommendationType
                            {
                                AssetType = new DBAssetType
                                {
                                    Name = "Plant"
                                }
                            },
                        }
                    },
                    new DBRecommendationType {
                        DisplayText = "Gear Replacement",
                        Type = "Gear Replacement",
                        Description = "Description of GR",
                        DefaultParametersList = new List<DBRecommendationParameter>{
                            new DBRecommendationParameter {
                                DefaultValue = "1.23",
                                Name = "Some param"
                            }
                        },
                        AssetTypes = new List<DBAssetTypeRecommendationType>
                        {
                            new DBAssetTypeRecommendationType
                            {
                                AssetType = new DBAssetType
                                {
                                    Name = "Plant"
                                }
                            },
                        }
                    }
                };
            }
        }
            
    }
}
