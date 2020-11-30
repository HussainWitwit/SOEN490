using System;

namespace Models.Application.APIModels
{
    public class PFPPAPrice
    {
        public string PlantElementPath { get; set; }
        public DateTime EffectiveStartTime { get; set; }
        public DateTime EffectiveEndTime { get; set; }
        public double Price { get; set; }
    }
}
