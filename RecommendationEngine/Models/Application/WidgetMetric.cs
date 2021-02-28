namespace Models.Application
{
    public class WidgetMetric
    {
        public string Title { get; set; }
        public double Value { get; set; }

        public WidgetMetric(string title, double value)
        {
            this.Title = title;
            this.Value = value;
        }
    }
}

