using System;
using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class DBRecommendationJobResult
    {
        public int RecommendationJobResultId { get; set; }
        public string DisplayText { get; set; }
        public string Status { get; set; }
        public string Result { get; set; }
        public string TriggeredBy { get; set; }
        public DateTime JobDuration { get; set; }
        public DateTime Timestamp { get; set; }
        public List<DBAction> ActionsSuggestedList { get; set; }
        public DBAsset Asset { get; set; }
        public DBRecommendationSchedule RecommendationSchedule { get; set; }
        public List<DBRecommendationJobLog> RecommendationJobLogsList { get; set; }
    }
}
