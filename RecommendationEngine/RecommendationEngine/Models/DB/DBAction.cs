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
        public DBAsset Asset { get; set; }
        public DBWorkOrder WorkOrderOpened { get; set; }
        public DBRecommendationJobResult RecommendationJobResult { get; set; }
    }
}

