using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Models.DB
{
    [Table("RecommendationJobResult")]
    public class DBRecommendationJobResult
    {
        [Key, ForeignKey("RecommendationJob")]
        public int RecommendationJobResultId { get; set; }
        public string DisplayText { get; set; }
        public string Result { get; set; }
        public double CostOfAction { get; set; }
        public double CostOfInaction { get; set; }
        public double Benefit { get; set; }
        public double ConfidencePercentage { get; set; }
        public double ReturnOnInvestment { get; set; }
        public double NetSaving { get; set; }
        [JsonIgnore]
        public virtual ICollection<DBAction> ActionsSuggestedList { get; set; }
        [JsonIgnore]
        public virtual DBAsset Asset { get; set; }
        [JsonIgnore]
        public virtual DBRecommendationJob Job { get; set; }
    }
}
