using System.Collections.Generic;
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
                DBRecommendationJobResult result = new DBRecommendationJobResult
                {
                    RecommendationJobResultId = 1,
                    CostOfAction = 400,
                    CostOfInaction = 78,
                    NetSaving = 45,
                    ReturnOnInvestment = 899,
                    Job = MockJobs.BasicDBJobList[0],
                    Asset =  new DBAsset
                    {
                        DisplayText = "Test Asset"
                    }
                };

                List<DBRecommendationJobResult> resultList = new List<DBRecommendationJobResult>()
                {
                   result
                };

                return resultList;
            }

            public static List<DBRecommendationJobResult> BadDBResultList()
            {
                DBRecommendationJobResult badResult = BasicDBResultList()[0];

                badResult.Job = null;

                return new List<DBRecommendationJobResult>()
                {
                    badResult
                };
            }
        }
    }
}
