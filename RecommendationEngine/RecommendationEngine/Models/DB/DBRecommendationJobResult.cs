using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("RecommendationJobResult")]
    public class DBRecommendationJobResult
    {
        public int RecommendationJobResultId { get; set; }
        public string DisplayText { get; set; }
        public string Result { get; set; }
        public double Cost { get; set; }
        public double CostOfInaction { get; set; }
        public double BenefitOfResult { get; set; }
        public double ConfidencePercentage { get; set; }
        public List<DBAction> ActionsSuggestedList { get; set; }
        public DBAsset Asset { get; set; }
        public DBRecommendationJob Job { get; set; }
    }
}
