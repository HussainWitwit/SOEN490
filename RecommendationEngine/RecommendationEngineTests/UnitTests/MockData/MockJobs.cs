using Models.Application.APIModels;
using Models.DB;
using System.Collections.Generic;

namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockJobs
    {

        public static List<DBRecommendationJob> BasicDBJobList = Jobs.BasicDBJobList();
        public static List<DBRecommendationJob> BadDBJobList = Jobs.BadDBJobList();

        public static class Jobs
        {
            public static List<DBRecommendationJob> BasicDBJobList()
            {
                DBRecommendationJob job = new DBRecommendationJob
                {
                    RecommendationJobId = 1,
                    JobDuration = 30,
                    Status = "Success",
                    TriggeredBy = "Zohal",
                    Asset = MockAssets.BasicDBAsset,
                    Schedule = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST[0],
                    LogsList = null
                };

                List<DBRecommendationJob> jobList = new List<DBRecommendationJob>()
                {
                    job
                };

                return jobList;
            }

            public static List<DBRecommendationJob> BadDBJobList()
            {
                DBRecommendationJob jobBad = BasicDBJobList()[0];

                jobBad.Schedule = null;

                return new List<DBRecommendationJob>()
                {
                    jobBad
                };
            }
        }
    }
}

