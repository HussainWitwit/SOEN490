using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RecommendationEngine.Services
{
    public class ResultService : IResultService
    {
        private IResultRepository _resultRepository;

        public ResultService(
            IResultRepository resultRepository
        )
        {
            _resultRepository = resultRepository;
        }
        public List<Result> GetResultList()
        {
            try
            {
                return _resultRepository.GetResultList().Select(dbResult =>
                        new Result
                        {
                            Id = dbResult.RecommendationJobResultId,
                            CostOfAction = dbResult.CostOfAction,
                            CostOfInaction = dbResult.CostOfInaction,
                            NetSaving = dbResult.NetSaving,
                            ReturnOnInvestment = dbResult.ReturnOnInvestment,
                            ConfiguredRecommendationId = dbResult.Job.Schedule.RecommendationScheduleId,
                            ConfiguredRecommendationTitle = dbResult.Job.Schedule.Name,
                            JobId = dbResult.Job.RecommendationJobId,
                            AssetName = dbResult.Asset.DisplayText,
                            ResultOutputDate = dbResult.Job.Timestamp
                        }).ToList();
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }

        public List<WidgetMetric> GetWidgetMetrics()
        {
            try
            {
                var netSavingSum = _resultRepository.GetResultList().GroupBy(obj => obj.Asset.AssetId)
                                    .Select(grp => grp.OrderByDescending(obj => obj.NetSaving).First()).ToList().Sum(asset => asset.NetSaving);

                var returnOnInvestmentAverage = _resultRepository.GetResultList().GroupBy(obj => obj.Asset.AssetId)
                                    .Select(grp => grp.OrderByDescending(obj => obj.ReturnOnInvestment).First()).ToList().Average(asset => asset.ReturnOnInvestment);

                var costOfInactionSum = _resultRepository.GetResultList().GroupBy(obj => obj.Asset.AssetId)
                                    .Select(grp => grp.OrderByDescending(obj => obj.CostOfInaction).First()).ToList().Sum(asset => asset.CostOfInaction);

                string netSavingDescription = "The potential net savings value represents the total possible" +
                "saving if the best suggested wash dates are followed. It should be noted that this " +
                "value has been generated while considering the best case scenario for each asset.";

                string returnOnInvestmentDescription = "The potential return on investment value represents the average potential rate of return " +
                "if the best suggested wash dates are followed. It should be noted that this value has been " +
                "generated while considering the best case scenario for each asset.";

                string costOfInactionDescription = "The potential cost of inaction value represents the total possible loss " +
                "if the best suggested wash dates are not followed. It should be noted that this value has been " +
                "generated while considering the best case scenario for each asset.";

                var WidgetMetricList = new List<WidgetMetric>();
                WidgetMetricList.Add(new WidgetMetric("Potential Net Savings", netSavingSum, netSavingDescription));
                WidgetMetricList.Add(new WidgetMetric("Average ROI", returnOnInvestmentAverage, returnOnInvestmentDescription));
                WidgetMetricList.Add(new WidgetMetric("Potential Losses", costOfInactionSum, costOfInactionDescription));

                return WidgetMetricList;
            }
            catch (GlobalException)
            {
                throw;
            }
            catch (Exception)
            {
                throw new InternalServerException();
            }
        }
    }
}