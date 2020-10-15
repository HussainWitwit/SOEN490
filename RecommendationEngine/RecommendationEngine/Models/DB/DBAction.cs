using System;

namespace RecommendationEngine.Models.DB
{
    public class DBAction
    {
        public int ActionId { get; set; }
        public string Title { get; set; }
        public string DisplayText { get; set; }
        public double CostOfAction { get; set; }
        public double CostOfInaction { get; set; }
        public double BenefitOfAction { get; set; }
        public double ConfidencePercetange { get; set; }
        public DateTime Date { get; set; }
        public DBAsset Asset { get; set; }
        public DBWorkOrder WorkOrderOpened { get; set; }
        public DBRecommendationJobResult RecommendationJobResult { get; set; }
    }
}

