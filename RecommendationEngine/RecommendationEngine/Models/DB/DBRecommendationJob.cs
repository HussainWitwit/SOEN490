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
        public List<DBRecommendationJobResult> ResultsList { get; set; }
        public DBAsset Asset { get; set; }
        public DBRecommendationSchedule Schedule { get; set; }
        public List<DBRecommendationJobLog> LogsList { get; set; }
    }
}