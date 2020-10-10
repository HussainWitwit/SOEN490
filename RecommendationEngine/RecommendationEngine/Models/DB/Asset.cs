using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecommendationEngine.Models
{
    public class Asset
    {
        private int assetId { get; set; }
        private string name { get; set; }
        private string displayText { get; set; }
        private string energyType { get; set; } 
        private string timeZone { get; set; } 
        private string elementPath { get; set; } 
        private double acPower { get; set; }
        private Asset assetChild { get; set; }
    }
}
