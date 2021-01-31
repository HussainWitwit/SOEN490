using System;
using Models.Application.APIModels;
using Models.DB;
using System.Collections.Generic;

namespace RecommendationEngineTests.UnitTests.MockData
{
    public class MockJobs
    {

        public static List<DBRecommendationJob> BasicDBJobList = Jobs.BasicDBJobList();
        public static List<DBRecommendationJob> BadDBJobList = Jobs.BadDBJobList();
        public static List<DBRecommendationJobLog> BasicDBJobLogList = Jobs.BasicDBJobLogList();
        public static List<DBRecommendationJobLog> BadDBJobLogList = Jobs.BadDBJobLogList();

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

            public static List<DBRecommendationJobLog> BasicDBJobLogList()
            {

                List<DBRecommendationJobLog> jobList = new List<DBRecommendationJobLog>()
                {
                    new DBRecommendationJobLog
                    {
                        RecommendationJobLogId = 1,
                        Description = "Test",
                        Level = "Warning",
                        Time = DateTime.Now
                    }
                };

                return jobList;
            }

            public static List<DBRecommendationJobLog> BadDBJobLogList()
            {
                return new List<DBRecommendationJobLog>();
            }
        }
    }
}

