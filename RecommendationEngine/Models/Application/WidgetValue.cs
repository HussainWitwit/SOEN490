namespace Models.Application
{
    public class WidgetValue
    {
        public string Title { get; set; }
        public double Value { get; set; }

        public WidgetValue(string title, double value)
        {
            this.Title = title;
            this.Value = value;
        }
    }
}

