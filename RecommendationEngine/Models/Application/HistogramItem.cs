namespace Models.Application
{
    public class HistogramItem
    {
        public string Month { get; set; }
        public string MonthName { get; set; }
        public double Total { get; set; }

        public HistogramItem(string month, string monthName, double total)
        {
            this.Month = month;
            this.MonthName = monthName;
            this.Total = total;
        }
    }
}