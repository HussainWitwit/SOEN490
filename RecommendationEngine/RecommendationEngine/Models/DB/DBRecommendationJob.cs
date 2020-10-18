using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationJob")]
    public class DBRecommendationJob
    {
        public int RecommendationJobId { get; set; }
        public string Status { get; set; }
        public string Result { get; set; }
        public string TriggeredBy { get; set; }
        public DateTime JobDuration { get; set; }
        public DateTime Timestamp { get; set; }
        public virtual List<DBRecommendationJobResult> ResultsList { get; set; }
        public virtual DBAsset Asset { get; set; }
        public virtual DBRecommendationSchedule Schedule { get; set; }
        public virtual List<DBRecommendationJobLog> LogsList { get; set; }
    }
}