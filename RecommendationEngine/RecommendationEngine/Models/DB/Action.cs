using System;

namespace RecommendationEngine.Models.DB
{
    public class Action
    {
        public int ActionId { get; set; }
        public string Title { get; set; }
        public string DisplayText { get; set; }
        public double CostOfAction { get; set; }
        public double CostOfInaction { get; set; }
        public double BenefitOfAction { get; set; }
        public double ConfidencePercetange { get; set; }
        public DateTime Date { get; set; }
        public WorkOrder WorkOrderOpened { get; set; }
        public RecommendationJobResult RecommendationJobResult { get; set; }
    }
}

