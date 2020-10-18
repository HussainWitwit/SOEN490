using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationJobResult")]
    public class DBRecommendationJobResult
    {
        [Key]
        public int RecommendationJobResultId { get; set; }
        public string DisplayText { get; set; }
        public string Result { get; set; }
        public double Cost { get; set; }
        public double CostOfInaction { get; set; }
        public double BenefitOfResult { get; set; }
        public double ConfidencePercentage { get; set; }
        public virtual ICollection<DBAction> ActionsSuggestedList { get; set; }
        public virtual DBAsset Asset { get; set; }
        public virtual DBRecommendationJob Job { get; set; }
    }
}
