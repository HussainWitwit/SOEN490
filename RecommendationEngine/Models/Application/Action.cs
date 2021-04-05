using System;

namespace Models.Application
{
    public class Action
    {
        public int Id { get; set; }
        public double NetSaving { get; set; }
        public double ReturnOnInvestment { get; set; }
        public string RecommendationName { get; set; }
        public string Title { get; set; }
        public string DisplayText { get; set; }
        public string AssetName { get; set; }
        public DateTime recommendedDate { get; set; }
        public DateTime recommendedOnDate { get; set; }
    }
}