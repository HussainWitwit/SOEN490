using System.Collections.Generic;

namespace Models.Application.APIModels
{
    public class PFPredictedEnergy
    {
        public string Id { get; set; }
        public string Interval { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public List<Dictionary<string, dynamic>> Attributes { get; set; }
    }
}
