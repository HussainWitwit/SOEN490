using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationJobLog")]
    public class DBRecommendationJobLog
    {
        public int RecommendationJobLogId { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public string Level { get; set; }
        public virtual DBRecommendationJob RecommendationJob { get; set; }
    }
}
