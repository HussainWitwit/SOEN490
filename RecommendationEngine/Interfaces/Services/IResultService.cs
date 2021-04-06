using System.Collections.Generic;
using Models.Application;

namespace Interfaces.Services
{

    public interface IResultService
    {
        public List<Result> GetResultList(int? assetId);
        public List<WidgetMetric> GetWidgetMetrics(int? assetId);
        public List<HistogramItem> GetHistogram(int year, int? assetId);
        public List<int> GetHistogramYears(int? assetId);
    }
}