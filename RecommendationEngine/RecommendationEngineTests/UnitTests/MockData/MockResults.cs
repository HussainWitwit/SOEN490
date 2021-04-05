using System;
using System.Collections.Generic;
using Models.Application;
using Models.DB;


namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockResults
    {

        public static List<DBRecommendationJobResult> BasicDBResultList = Results.BasicDBResultList();
        public static List<DBRecommendationJobResult> BadDBResultList = Results.BadDBResultList();

        public static class Results
        {
            public static List<DBRecommendationJobResult> BasicDBResultList()
            {
                DBRecommendationJobResult result1 = new DBRecommendationJobResult
                {
                    RecommendationJobResultId = 1,
                    CostOfAction = 400,
                    CostOfInaction = 78,
                    NetSaving = 45,
                    ReturnOnInvestment = 7483.6,
                    Job = MockJobs.BasicDBJobList[0],
                    Asset = new DBAsset
                    {
                        DisplayText = "Test Asset",
                        AssetId = 44
                    }
                };

                DBRecommendationJobResult result2 = new DBRecommendationJobResult
                {
                    RecommendationJobResultId = 1,
                    CostOfAction = 400,
                    CostOfInaction = 726,
                    NetSaving = 65,
                    ReturnOnInvestment = 899,
                    Job = MockJobs.BasicDBJobList[0],
                    Asset = new DBAsset
                    {
                        DisplayText = "Test Asset",
                        AssetId = 45
                    }
                };

                List<DBRecommendationJobResult> resultList = new List<DBRecommendationJobResult>()
                {
                   result1, result2
                };

                return resultList;
            }

            public static List<DBRecommendationJobResult> BadDBResultList()
            {
                DBRecommendationJobResult badResult = BasicDBResultList()[0];

                badResult.Job = null;
                badResult.Asset = null;

                return new List<DBRecommendationJobResult>()
                {
                    badResult
                };
            }
        }
    }
}
