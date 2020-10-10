using System;

namespace RecommendationEngine.Models.DB
{
    public class RecommendationJobLog
    {
        public int RecommendationJobLogId { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public string Level { get; set; }
        public RecommendationJobResult RecommendationJobResult { get; set; }
    }
}
