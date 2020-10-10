using System;
using System.Collections.Generic;

namespace RecommendationEngine.Models.DB
{
    public class RecommendationJobResult
    {
        public int RecommendationJobResultId { get; set; }
        public string DisplayText { get; set; }
        public string Status { get; set; }
        public string Result { get; set; }
        public string TriggeredBy { get; set; }
        public DateTime JobDuration { get; set; }
        public DateTime Timestamp { get; set; }
        public List<Action> ActionsSuggestedList { get; set; }
        public Asset Asset { get; set; }
        public RecommendationSchedule RecommendationSchedule { get; set; }
        public List<RecommendationJobLog> RecommendationJobLogsList { get; set; }
    }
}
