using System;
namespace Models.Application
{
    public class Action
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string DisplayText { get; set; }
        public DateTime recommendedDate { get; set; }
        public DateTime recommendedOnDate { get; set; }
    }
}