using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.DB
{
    [Table("RecommendationJobResult")]
    public class DBRecommendationJobResult
    {
        [Key]
        public int RecommendationJobResultId { get; set; }
        public string DisplayText { get; set; }
        public string Result { get; set; }
        public double CostOfAction { get; set; } // changed, check db
        public double CostOfInaction { get; set; }
        public double Benefit { get; set; } // changed, check db
        public double ConfidencePercentage { get; set; }
        public double ReturnOfInvestment { get; set; }
        public double NetSaving { get; set; }
        public virtual ICollection<DBAction> ActionsSuggestedList { get; set; }
        public virtual DBAsset Asset { get; set; }
        public virtual DBRecommendationJob Job { get; set; }
    }
}
