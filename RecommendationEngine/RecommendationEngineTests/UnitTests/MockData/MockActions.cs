using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Security.Cryptography.X509Certificates;
using Microsoft.VisualBasic;
using Models.DB;
using NUnit.Framework;

namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockActions
    {
        public static List<DBAction> BasicDBActions = Actions.BasicDBActions();
        public static List<DBAction> BadDBActions = Actions.BadDBActions();

        public static class Actions
        {
            public static List<DBAction> BasicDBActions()
            {
                return new List<DBAction>(){
                    new DBAction
                    {
                        ActionId = 9,
                        Date = new DateTime(2020, 05, 17),
                        DisplayText = "wash day",
                        Title = "ywo55",
                        RecommendationJobResult = new DBRecommendationJobResult {
                            RecommendationJobResultId = 4,
                            Job = new DBRecommendationJob
                            {
                                RecommendationJobId = 3,
                                Timestamp = new DateTime(2020, 01, 18),
                                Schedule = new DBRecommendationSchedule
                                {
                                    RecommendationScheduleId = 67,
                                    Name = "Test Configured Rec",
                                    AssetsList = new Collection<DBAssetRecommendationSchedule>()
                                    {
                                        new DBAssetRecommendationSchedule()
                                        {
                                            AssetId = 44,
                                            Asset = MockAssets.BasicDBAsset
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
            }

            public static List<DBAction> BadDBActions()
            {
                return new List<DBAction>(){
                    new DBAction
                    {
                        ActionId = 9,
                        Date = new DateTime(2020, 05, 17),
                        DisplayText = "wash day",
                        Title = "ywo55",
                        RecommendationJobResult = new DBRecommendationJobResult {
                            Job = new DBRecommendationJob
                            {
                                Schedule = null
                            }
                        },
                    }
                };
            }

        }
    }
}
