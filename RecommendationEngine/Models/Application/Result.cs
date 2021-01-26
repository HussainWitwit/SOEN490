using System;

namespace Models.Application
{
    public class Result
    {
        public int Id { get; set; }
        public int ConfiguredRecommendationId { get; set; }
        public int JobId { get; set; }
        public double NetSaving { get; set; }
        public double ReturnOnInvestment { get; set; }
        public double CostOfAction { get; set; }
        public double CostOfInaction { get; set; }
    }
}