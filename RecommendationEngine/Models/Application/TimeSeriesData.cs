using System;

namespace Models.Application
{
    public class TimeSeriesData
    {
        public int AssetId { get; set; }
        public string Attribute { get; set; }
        public double Value { get; set; }

        public DateTime Timestamp { get; set; }


    }
}