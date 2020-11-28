using Interfaces.Utilities;
using Models.DB;
using System;
using Interfaces.Services.ExternalAPI;
using System.Linq;
using System.Collections.Generic;
using Models.Application.APIModels;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Models.Application.RecommendationEngine.YearlyWash;
using RecommendationScheduler.RecommendationJob;

namespace RecommendationScheduler.RecommendationTypes
{
    public class YearlyWashOptimizationRecommendation : IRecommendationType
    {
        //Dependency Injection variables
        private IRecommendationJobLogger _jobLogger;
        private IDriveService _driveService;

        //Execute function variables
        //Temporary Hard Code values
        private int _centerPointIncrement = 1; //TODO: CHANGE DOUBLE TO INT IN DB
        private int _spanIncrement = 1; //TODO: CHANGE DOUBLE TO INT IN DB
        private DateTime _startSoiling = new DateTime(2020, 1, 1);
        private DateTime _endSoiling = new DateTime(2020, 10, 1);
        private double _soilingRate = -0.0025;
        private double _costCleaning = 2;
        private double _soilingBuffer = 10;
        private double _accelerator = 0.33;
        private string _preferedScenario = "returnOnInvestment";
        private List<string> _plantIds = new List<string>();
        //Variable declarations
        private SoilingCalculations _soilingNoAction = new SoilingCalculations(); // object for Soiling Calculation , based on no action , aka the impact of soiling without any cleaning 
        private SoilingCalculations _soilingWithAction = new SoilingCalculations();// object for Soiling Calculation , with action , aka the impact of soiling with cleaning schedule  
        List<DateTime> _cleaningDates = new List<DateTime>(); //List of Cleaning days for a specific centerPoint and span combination
        List<DateTime> _bestCleaningDates = new List<DateTime>(); //to temporary store the best cleaning dates / they are later transformed into actions
        private int _cumulativeCleaning = 0; //The number of cleanings so far
        private int _dayCount = 0; //needed for retrieving the predicted energy for a specific day
        private Boolean _isWashDay = false; //used for check if wash date method

        //Temporary output variables for Result soilingScenarioect
        private DBRecommendationJobResult _result = new DBRecommendationJobResult();
        private DBRecommendationJobResult _tempResult = new DBRecommendationJobResult();

        public YearlyWashOptimizationRecommendation(IRecommendationJobLogger jobLogger, IDriveService driveservice)
        {
            _jobLogger = jobLogger;
            _driveService = driveservice;
        }
        public DBRecommendationJobResult ExecuteAlgorithm(DBRecommendationJob job)
        {
            
            

            //Values from APIs
            List<double> predictedEnergyList = new List<double>();// stores predicted energy from API
            List<double> energyPricesList = new List<double>(); // stores energy prices from API
            double plantDCCapacity = 0.0;//stores the value of DC Capacity 

            _jobLogger.LogInformation(job, "Starting Yearly Wash Optimization Recommendation");

            //Parameters TODO: switch Start of soiling season, End of soiling season, Soiling rate, Cost of cleaning into API once we get the access 
            _plantIds.Add("RENEW01_2070.92.001"); //TODO: to remove once in the db

            GetAPIValues(predictedEnergyList, energyPricesList, plantDCCapacity);

            //Initializing scenario parameters
            DateTime centerPoint = _startSoiling;
            DateTime currentDate;
            int span;

            //Initializing variables
            _soilingNoAction.SoilingDerate = 1.0;
            _soilingWithAction.SoilingDerate = 1.0;

            //Initializing output 
            _result.ReturnOnInvestment = 0;
            _result.NetSaving = 0;

            _jobLogger.LogInformation(job, "Looking for best cleaning dates...");

            while (centerPoint < _endSoiling)
            {
                span = _spanIncrement;
                centerPoint = _startSoiling;

                while (centerPoint.AddDays(span) < _endSoiling || centerPoint.AddDays(-span) > _startSoiling)
                {
                    ResetValues();

                    // computes various outputs for a all day within soiling season with a specific combination of center point + span
                    for (currentDate = _startSoiling; _endSoiling.CompareTo(currentDate) > 0; currentDate = currentDate.AddDays(1))// iterate through all days within soiling season
                    {
                        //NoAction
                        CalculateSoilingDerateNoAction();
                        CalculateSoilingImpact(_soilingNoAction, predictedEnergyList, energyPricesList);

                        CheckIfWashDay(currentDate, centerPoint, span);

                        //WithAction
                        CalculateSoilingDerateWithAction(currentDate, _isWashDay, _cumulativeCleaning);
                        CalculateSoilingImpact(_soilingWithAction, predictedEnergyList, energyPricesList);
                    }

                    UpdateTempOutput(_cumulativeCleaning, plantDCCapacity);

                    if ((_preferedScenario == "returnOnInvestment" && _tempResult.ReturnOnInvestment >= _result.ReturnOnInvestment)
                        || (_preferedScenario == "netSaving" && _tempResult.NetSaving >= _result.NetSaving)) //check if scenario gives better ROI or netSaving  //TODO: VERIFY STRING NAME WITH FRONT END
                    {
                        UpdateBestResult();
                    }

                    span += _spanIncrement;
                    _dayCount += 1;
                }
                centerPoint = centerPoint.AddDays(_centerPointIncrement);
            }

            _jobLogger.LogInformation(job, "Best combination found!");

            return _result;
        }

        public void RetrieveFromDB()
        {
            //centerPointIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "centerpoint increment").FirstOrDefault().ParamValue;
            //spanIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "span increment").FirstOrDefault().ParamValue;

            //TODO: Once inside of database, switch to this 
            //startSoiling = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "start soiling").FirstOrDefault().ParamValue;
            //endSoiling = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "end soiling").FirstOrDefault().ParamValue;
            //soilingRate = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "soiling rate").FirstOrDefault().ParamValue;
            //costCleaning = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "cost cleaning").FirstOrDefault().ParamValue;
            //soilingBuffer = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "soiling buffer").FirstOrDefault().ParamValue;
            //accelerator = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "accelerator").FirstOrDefault().ParamValue;
            //preferedScenario = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "pefered scenario").FirstOrDefault().ParamValue;
            //plantIds = job.Schedule.AssetList.FirstOrDefault().ParamValue;
        }
        private async void GetAPIValues(List<double> predictedEnergyList, List<double> energyPricesList, double plantDCCapacity)
        {
            //API variables
            Dictionary<string, List<PFPredictedEnergy>> predictedEnergyDict = await _driveService.GetDailyPredictedEnergyByPlantIds(_startSoiling, _endSoiling, _plantIds);
            predictedEnergyList = predictedEnergyDict["assets"].FirstOrDefault().Attributes[0]["values"];

            List<PFPPAPrice> energyPrices = await _driveService.GetPPAPriceByPlantId(_plantIds.FirstOrDefault());
            energyPricesList = energyPrices.Where(energyPrice => energyPrice.EffectiveStartTime >= _startSoiling && energyPrice.EffectiveEndTime <= _endSoiling)
                .Select(energyPrice => energyPrice.Price).ToList();

            List<PFMetadata> metadata = await _driveService.GetAssetsMetadataByPlantIds(_plantIds);
            var plantMetadata = metadata.Select(plant => plant.Metadata).FirstOrDefault();
            plantDCCapacity = plantMetadata["DC_Capacity"];
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
            _bestCleaningDates.Clear();
            _dayCount = 0;
        }
        private void CalculateSoilingDerateNoAction()
        {
            _soilingNoAction.SoilingDerate = (1 + _soilingRate) * _soilingNoAction.SoilingDerate;
        }
        private void CalculateSoilingImpact(SoilingCalculations soilingScenario, List<double> predictedEnergyList, List<double> energyPricesList)
        {
            soilingScenario.PredictedEnergyAfterSoiling = soilingScenario.SoilingDerate * predictedEnergyList[_dayCount];
            soilingScenario.PredictedEnergyLoss = predictedEnergyList[_dayCount] - soilingScenario.PredictedEnergyAfterSoiling;
            soilingScenario.PredictedRevenueLoss = energyPricesList[_dayCount] * soilingScenario.PredictedEnergyLoss;
            soilingScenario.SumOfPredictedRevenueLoss += soilingScenario.PredictedRevenueLoss; // for every day, add the predicted revenue loss
        }
        private void CheckIfWashDay(DateTime currentDate, DateTime centerPoint, int span)
        {
            _isWashDay = false;
            if (currentDate > _startSoiling.AddDays(_soilingBuffer) && currentDate < _endSoiling.AddDays(-_soilingBuffer) && (((currentDate - centerPoint).Days % span) == 0))
            {
                _cleaningDates.Add(currentDate);
                _soilingWithAction.SoilingDerate = 1.0;// reset to 1 because cleaning will be done
                _cumulativeCleaning += 1;
                _isWashDay = true;
            }

        }
        private void CalculateSoilingDerateWithAction(DateTime currentDate, Boolean _isWashDay, int _cumulativeCleaning)
        {
            if (currentDate > _startSoiling && currentDate < _endSoiling && !_isWashDay)
            {
                //_soilingWithAction.SoilingDerate holds the value of the previous day as it has not been calculated yet
                _soilingWithAction.SoilingDerate = Math.Max(_soilingWithAction.SoilingDerate, (_soilingWithAction.SoilingDerate * (1 + _soilingRate) * (1 + _cumulativeCleaning * _accelerator)));
            }
        }
        private void UpdateTempOutput(int _cumulativeCleaning, double plantDCCapacity)
        {
            _tempResult.CostOfInaction = _soilingNoAction.SumOfPredictedRevenueLoss;
            _tempResult.Benefit = _tempResult.CostOfInaction - _soilingWithAction.SumOfPredictedRevenueLoss;
            _tempResult.CostOfAction = _cumulativeCleaning * _costCleaning * plantDCCapacity;
            _tempResult.ReturnOnInvestment = _tempResult.Benefit / _tempResult.CostOfAction * 100;
            _tempResult.NetSaving = _tempResult.Benefit - _tempResult.CostOfAction;
        }
        private void UpdateBestResult()
        {
            _result.CostOfAction = _tempResult.CostOfAction;
            _result.CostOfInaction = _tempResult.CostOfInaction;
            _result.NetSaving = _tempResult.NetSaving;
            _result.Benefit = _tempResult.Benefit;
            _result.ReturnOnInvestment = _tempResult.ReturnOnInvestment;
            _bestCleaningDates = _cleaningDates;
        }
    }
}