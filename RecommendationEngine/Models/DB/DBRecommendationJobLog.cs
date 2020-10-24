using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("RecommendationJobLog")]
    public class DBRecommendationJobLog
    {
        [Key]
        public int RecommendationJobLogId { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public string Level { get; set; }
        public virtual DBRecommendationJob RecommendationJob { get; set; }
    }
}
