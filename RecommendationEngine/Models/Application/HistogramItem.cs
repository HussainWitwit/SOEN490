namespace Models.Application
{
    public class HistogramItem
    {
        public int Month { get; set; }
        public string MonthName { get; set; }
        public double Total { get; set; }

        public HistogramItem(int month, string monthName, double total)
        {
            this.Month = month;
            this.MonthName = monthName;
            this.Total = total;
        }
    }
}