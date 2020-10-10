using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationEngine.Models
{
    public class Action
    {
        private int actionId { get; set; }
        private string title { get; set; }
        private string displayText { get; set; }
        private double costOfAction { get; set; }
        private double costOfInaction { get; set; }
        private double benefitOfAction { get; set; }
        private double confidencePercetange { get; set; }
        private DateTime date { get; set; }
    }
}

