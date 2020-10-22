using System;

namespace Models.Application
{
    public class Event
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime Duration { get; set; }
        public double EnergyLoss { get; set; }
        public string Status { get; set; }
    }
}