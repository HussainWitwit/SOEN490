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
                var assetsList = _assetRepository.GetAssetsList();
                if (assetId != null)
                {
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
                var assetsList = _assetRepository.GetAssetsList();
                if (assetId != null)
                {
                    resultsList = resultsList
                        .Where(result => result.Asset.IsChildOrEquivalent((int)assetId, assetsList)).ToList();
                }


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