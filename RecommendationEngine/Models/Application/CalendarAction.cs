using System;
namespace Models.Application
{
    public class CalendarAction
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public int NbOfActions { get; set; }
        public string Status { get; set; }
    }
}
