using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecommendationEngine.Models.DB
{
    [Table("Action")]
    public class DBAction
    {
        public int ActionId { get; set; }
        public string Title { get; set; }
        public string DisplayText { get; set; }
        public DateTime Date { get; set; }
        public virtual DBAsset Asset { get; set; }
        public virtual DBWorkOrder WorkOrderOpened { get; set; }
        public virtual DBRecommendationJobResult RecommendationJobResult { get; set; }
    }
}

