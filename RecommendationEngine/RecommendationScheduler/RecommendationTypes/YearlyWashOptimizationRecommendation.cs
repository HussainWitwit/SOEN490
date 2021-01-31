using Interfaces.Utilities;
using Models.DB;
using Models.Recommendation.YearlyWashOptimization;
using System;
using System.Collections.Generic;

namespace RecommendationScheduler.RecommendationTypes
{

    public class YearlyWashOptimizationRecommendation : IRecommendationType<YearlyWashParameters, YearlyWashApiValues>
        {
            //Dependency Injection variables
            private readonly IRecommendationJobLogger _jobLogger;
            private readonly DBRecommendationJob _job;

            //Variable declarations
            private readonly SoilingCalculations _soilingNoAction = new SoilingCalculations(); // object for Soiling Calculation , based on no action , aka the impact of soiling without any cleaning 
            private readonly SoilingCalculations _soilingWithAction = new SoilingCalculations();// object for Soiling Calculation , with action , aka the impact of soiling with cleaning schedule  
            private readonly List<DateTime> _cleaningDates = new List<DateTime>(); //List of Cleaning days for a specific centerPoint and span combination
            private int _cumulativeCleaning = 0;
            private int _dayCount = 1;
            private Boolean _isWashDay = false;

            //Temporary output variables for Result soilingScenarioect
            private readonly DBRecommendationJobResult _result = new DBRecommendationJobResult();
            private readonly DBRecommendationJobResult _tempResult = new DBRecommendationJobResult();

            //Execute method params passed by _job sheduler
            private YearlyWashParameters _userParameters = new YearlyWashParameters();

            private readonly List<DBAction> _actions = new List<DBAction>(); //list of actions after finding the best center point + span

            public YearlyWashOptimizationRecommendation(IRecommendationJobLogger jobLogger, DBRecommendationJob job)
            {
                _jobLogger = jobLogger;
                _job = job;
            }

            public DBRecommendationJobResult ExecuteAlgorithm(YearlyWashParameters parameters, YearlyWashApiValues apiValues)
            {
                _jobLogger.LogInformation(_job, "Starting Yearly Wash Optimization Recommendation");

                _userParameters = parameters;

                //Initializing scenario parameters
                DateTime centerPoint = _userParameters.StartSoiling;
                DateTime currentDate;
                double span;

                //Initializing variables
                _soilingNoAction.SoilingDerate = 1.0;
                _soilingWithAction.SoilingDerate = 1.0;

                //Initializing output 
                _result.ReturnOnInvestment = 0;
                _result.NetSaving = 0;
                _result.Asset = _userParameters.Asset;

                _jobLogger.LogInformation(_job, "Looking for best cleaning dates...");

                while (centerPoint < _userParameters.EndSoiling)
                {
                    span = _userParameters.SpanIncrement;

                    while (centerPoint.AddDays(span) < _userParameters.EndSoiling || centerPoint.AddDays(-span) > _userParameters.StartSoiling)
                    {
                        ResetValues();

                        // computes various outputs for a all day within soiling season with a specific combination of center point + span
                        // start at day 2, since first day values are given by ResetValues() -> there is no soiling yet...
                        for (currentDate = _userParameters.StartSoiling.AddDays(1); _userParameters.EndSoiling.CompareTo(currentDate) > 0; currentDate = currentDate.AddDays(1))// iterate through all days within soiling season
                        {
                            //NoAction
                            CalculateSoilingDerateNoAction();
                            CalculateSoilingImpact(_soilingNoAction, apiValues.PredictEnergyList, apiValues.EnergyPricesList);

                            CheckIfWashDay(currentDate, centerPoint, span);

                            //WithAction
                            CalculateSoilingDerateWithAction(currentDate, _isWashDay, _cumulativeCleaning);
                            CalculateSoilingImpact(_soilingWithAction, apiValues.PredictEnergyList, apiValues.EnergyPricesList);

                            _dayCount += 1;
                        }

                        UpdateTempOutput(_cumulativeCleaning, apiValues.PlantDCCapacity);

                        if ((_userParameters.PreferredScenario == "ROI" && _tempResult.ReturnOnInvestment >= _result.ReturnOnInvestment)
                            || (_userParameters.PreferredScenario == "netSaving" && _tempResult.NetSaving >= _result.NetSaving)) //check if scenario gives better ROI or netSaving
                        {
                            UpdateBestResult();

                        }

                        span += _userParameters.SpanIncrement;
                    }
                    centerPoint = centerPoint.AddDays(_userParameters.CenterPointIncrement);
                }

                _jobLogger.LogInformation(_job, "Best combination found!");

                return _result;
            }

            private void ResetValues()
            {
                //reset values for new date
                _soilingNoAction.SoilingDerate = 1;
                _soilingWithAction.SoilingDerate = 1;
                _tempResult.CostOfInaction = 0;
                _tempResult.Benefit = 0;
                _tempResult.CostOfAction = 0;
                _tempResult.ReturnOnInvestment = 0;
                _tempResult.NetSaving = 0;
                _soilingNoAction.SumOfPredictedRevenueLoss = 0;
                _soilingWithAction.SumOfPredictedRevenueLoss = 0;
                _cumulativeCleaning = 0;
                _cleaningDates.Clear();
                _dayCount = 1;
            }
            private void CalculateSoilingDerateNoAction()
            {
                _soilingNoAction.SoilingDerate = (1 + _userParameters.SoilingRate) * _soilingNoAction.SoilingDerate;
            }
            private void CalculateSoilingImpact(SoilingCalculations soilingScenario, List<double> predictEnergyList, List<double> energyPricesList)
            {
                soilingScenario.PredictedEnergyAfterSoiling = soilingScenario.SoilingDerate * predictEnergyList[_dayCount];
                soilingScenario.PredictedEnergyLoss = predictEnergyList[_dayCount] - soilingScenario.PredictedEnergyAfterSoiling;
                soilingScenario.PredictedRevenueLoss = energyPricesList[_dayCount] * soilingScenario.PredictedEnergyLoss;
                soilingScenario.SumOfPredictedRevenueLoss += soilingScenario.PredictedRevenueLoss; // for every day, add the predicted revenue loss
            }
            private void CheckIfWashDay(DateTime currentDate, DateTime centerPoint, double span)
            {
                _isWashDay = false;
                if (currentDate > _userParameters.StartSoiling.AddDays(_userParameters.SoilingBuffer) && currentDate < _userParameters.EndSoiling.AddDays(-_userParameters.SoilingBuffer) && (((currentDate - centerPoint).Days % span) == 0))
                {
                    _cleaningDates.Add(currentDate);
                    _soilingWithAction.SoilingDerate = 1.0;// reset to 1 because cleaning will be done
                    _cumulativeCleaning += 1;
                    _isWashDay = true;
                }
            }
            private void CalculateSoilingDerateWithAction(DateTime currentDate, Boolean _isWashDay, int _cumulativeCleaning)
            {
                if (currentDate > _userParameters.StartSoiling && currentDate < _userParameters.EndSoiling && !_isWashDay)
                {
                    //_soilingWithAction.SoilingDerate holds the value of the previous day as it has not been calculated yet
                    _soilingWithAction.SoilingDerate = Math.Max(_soilingNoAction.SoilingDerate, (_soilingWithAction.SoilingDerate * (1 + _userParameters.SoilingRate * (1 + _cumulativeCleaning * _userParameters.Accelerator))));
                }
            }
            private void UpdateTempOutput(int _cumulativeCleaning, double plantDCCapacity)
            {
                _tempResult.CostOfInaction = _soilingNoAction.SumOfPredictedRevenueLoss;
                _tempResult.Benefit = _tempResult.CostOfInaction - _soilingWithAction.SumOfPredictedRevenueLoss;
                _tempResult.CostOfAction = _cumulativeCleaning * _userParameters.CostCleaning * plantDCCapacity;
                _tempResult.ReturnOnInvestment = _tempResult.Benefit / _tempResult.CostOfAction * 100;
                _tempResult.NetSaving = _tempResult.Benefit - _tempResult.CostOfAction;
            }
            private void UpdateBestResult()
            {
                _actions.Clear();
                _cleaningDates.ForEach(date =>
                {
                    _actions.Add(new DBAction() { Date = date, Asset = _result.Asset, DisplayText = "wash day", Title = "ywo" + _result.Asset.AssetId });
                });

                _result.ActionsSuggestedList = _actions;
                _result.CostOfAction = _tempResult.CostOfAction;
                _result.CostOfInaction = _tempResult.CostOfInaction;
                _result.NetSaving = _tempResult.NetSaving;
                _result.Benefit = _tempResult.Benefit;
                _result.ReturnOnInvestment = _tempResult.ReturnOnInvestment;
            }
        }
    }