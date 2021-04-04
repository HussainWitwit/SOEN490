using Interfaces.Repositories;
using Interfaces.Services;
using Models.Application;
using RecommendationEngine.ExceptionHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using RecommendationEngine.Utilities;

namespace RecommendationEngine.Services
{
    public class ResultService : IResultService
    {
        private IResultRepository _resultRepository;
        private IAssetRepository _assetRepository;

        public ResultService(
            IResultRepository resultRepository, IAssetRepository assetRepository
        )
        {
            _resultRepository = resultRepository;
            _assetRepository = assetRepository;
        }

        public List<Result> GetResultList(int? assetId)
        {
            try
            {
                var resultsList = _resultRepository.GetResultList();
                if (assetId != null)
                {
                    var assetsList = _assetRepository.GetAssetsList();
                    resultsList = resultsList
                        .Where(result => result.Asset.IsChildOrEquivalent((int)assetId, assetsList)).ToList();
                }

                return resultsList.Select(dbResult =>
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

        public List<WidgetMetric> GetWidgetMetrics(int? assetId)
        {
            try
            {
                var resultsList = _resultRepository.GetResultList();
                if (assetId != null)
                {
                    var assetsList = _assetRepository.GetAssetsList();
                    resultsList = resultsList
                        .Where(result => result.Asset.IsChildOrEquivalent((int)assetId, assetsList)).ToList();
                }

                double netSavingSum=0;
                double returnOnInvestmentAverage=0;
                double costOfInactionSum=0;

                if (resultsList.Count > 0)
                {
                    netSavingSum = resultsList.GroupBy(obj => obj.Asset.AssetId)
                        .Select(grp => grp.OrderByDescending(obj => obj.NetSaving).First()).ToList()
                        .Sum(asset => asset.NetSaving);

                    returnOnInvestmentAverage = resultsList.GroupBy(obj => obj.Asset.AssetId)
                        .Select(grp => grp.OrderByDescending(obj => obj.ReturnOnInvestment).First()).ToList()
                        .Average(asset => asset.ReturnOnInvestment);

                    costOfInactionSum = resultsList.GroupBy(obj => obj.Asset.AssetId)
                        .Select(grp => grp.OrderByDescending(obj => obj.CostOfInaction).First()).ToList()
                        .Sum(asset => asset.CostOfInaction);
                }

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

        public List<HistogramItem> GetHistogram(int? assetId)
        {
            try
            {
                var resultsList = _resultRepository.GetResultWithActions();

                if (assetId != null)
                { 
                    var assetsList = _assetRepository.GetAssetsList();
                    resultsList = resultsList
                        .Where(result => result.Asset.IsChildOrEquivalent((int)assetId, assetsList)).ToList();
                }

                var netSavingFraction = 0.0;
                var month = 0;

                var monthlyTotal = new List<HistogramItem>
                {
                    new HistogramItem(1, "January", 0),
                    new HistogramItem(2, "February", 0),
                    new HistogramItem(3, "March", 0),
                    new HistogramItem(4, "April", 0),
                    new HistogramItem(5, "May", 0),
                    new HistogramItem(6, "June", 0),
                    new HistogramItem(7, "July", 0),
                    new HistogramItem(8, "August", 0),
                    new HistogramItem(9, "September", 0),
                    new HistogramItem(10, "October", 0),
                    new HistogramItem(11, "November", 0),
                    new HistogramItem(12, "December", 0),
                };

                resultsList.ForEach(result =>
                {
                    netSavingFraction = result.NetSaving / result.ActionsSuggestedList.Count();

                    result.ActionsSuggestedList.ToList().ForEach(action =>
                    {
                        month = action.Date.Month;
                        monthlyTotal.FirstOrDefault(mo => mo.Month == month).Total += netSavingFraction;
                    });
                });

                return monthlyTotal;
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