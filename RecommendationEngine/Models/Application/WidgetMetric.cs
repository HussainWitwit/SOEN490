namespace Models.Application
{
    public class WidgetMetric
    {
        public string Title { get; set; }
        public double Value { get; set; }
        public string Description { get; set; }

        public WidgetMetric(string title, double value, string description)
        {
            this.Title = title;
            this.Value = value;
            this.Description = description;
        }
    }
}

