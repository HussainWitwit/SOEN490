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

namespace RecommendationScheduler.RecommendationTypes
{
    public class YearlyWashOptimizationRecommendation : IRecommendationType
    {
        //Dependency Injection variables
        private readonly RecommendationEngineDBContext _recommendationEngineDb;
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
        private SoilingCalculations _soilingNoAction = new SoilingCalculations();
        private SoilingCalculations _soilingWithAction = new SoilingCalculations();
        List<DateTime> _cleaningDates = new List<DateTime>(); //List of Cleaning days for a specific centerPoint and span combination
        List<DateTime> _bestCleaningDates = new List<DateTime>(); //to temporary store the best cleaning dates / they are later transformed into actions
        private List<double> _predictedEnergyList;
        private List<double> _energyPricesList;
        private int _dayCount = 0; //needed for retrieving the predicted energy for a specific day
        private int _cumulativeCleaning;
        private double _plantDCCapacity;
        //Temporary output variables for Result soilingScenarioect
        private List<DBAction> _actions = new List<DBAction>(); //list of actions after finding the best center point + span
        private DBRecommendationJobResult _result = new DBRecommendationJobResult();
        private DBRecommendationJobResult _tempResult = new DBRecommendationJobResult();

        public YearlyWashOptimizationRecommendation(IRecommendationJobLogger jobLogger, IDriveService driveservice, RecommendationEngineDBContext recommendationEngineDBContext)
        {
            _jobLogger = jobLogger;
            _driveService = driveservice;
            _recommendationEngineDb = recommendationEngineDBContext;
        }
        public void ExecuteAlgorithm(DBRecommendationJob job)
        {
            _jobLogger.LogInformation(job, "Starting Yearly Wash Optimization Recommendation");

            //Parameters TODO: switch Start of soiling season, End of soiling season, Soiling rate, Cost of cleaning into API once we get the access 
            _plantIds.Add("RENEW01_2070.92.001"); //TODO: to remove once in the db

            GetAPIValues();

            //Initializing scenario parameters
            DateTime centerPoint = _startSoiling;
            DateTime currentDate = _startSoiling;
            int span = 1;

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

                while (centerPoint.AddDays(span) < _endSoiling || centerPoint.AddDays(-span) > _startSoiling) //TODO : ask power factors why -span 
                {
                    ResetValues();
                    // computes various outputs for a all day within soiling season with a specific combination of center point + span
                    for (currentDate = _startSoiling; _endSoiling.CompareTo(currentDate) > 0; currentDate = currentDate.AddDays(1))// iterate through all days within soiling season
                    {
                        //NoAction
                        CalculateSoilingDerateNoAction();
                        CalculateSoilingImpact(_soilingNoAction);

                        CheckIfWashDay(currentDate,centerPoint,span);
                    
                        //WithAction
                        CalculateSoilingDerateWithAction(currentDate);
                        CalculateSoilingImpact(_soilingWithAction);
                    }   

                    UpdateTempOutput();
                   
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

            SaveResultIntoDB(job);
          
            _jobLogger.LogInformation(job, "Recommendation Result has been added to the database");
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
        private async void GetAPIValues()
        {
            //API variables
            Dictionary<string, List<PFPredictedEnergy>> predictedEnergyDict = await _driveService.GetDailyPredictedEnergyByPlantIds(_startSoiling, _endSoiling, _plantIds);
            List<double> predictedEnergyList = predictedEnergyDict["assets"].FirstOrDefault().Attributes[0]["values"];

            List<PFPPAPrice> energyPrices = await _driveService.GetPPAPriceByPlantId(_plantIds.FirstOrDefault());
            List<double> energyPricesList = energyPrices.Where(energyPrice => energyPrice.EffectiveStartTime >= _startSoiling && energyPrice.EffectiveEndTime <= _endSoiling)
                .Select(energyPrice => energyPrice.Price).ToList();

            List<PFMetadata> metadata = await _driveService.GetAssetsMetadataByPlantIds(_plantIds);
            var plantMetadata = metadata.Select(plant => plant.Metadata).FirstOrDefault();
            double plantDCCapacity = plantMetadata["DC_Capacity"];
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
            _soilingNoAction.SumOfPredictedRevenueLoss = 0; // total sum of all the revenue loss for one centerpoint and span
            _soilingWithAction.SumOfPredictedRevenueLoss = 0;
            _cumulativeCleaning = 0; //The number of cleanings so far
            _cleaningDates.Clear();
            _bestCleaningDates.Clear();
            _dayCount = 0;
        }
        private void CalculateSoilingDerateNoAction()
        {
            _soilingNoAction.SoilingDerate = (1 + _soilingRate) * _soilingNoAction.SoilingDerate;
        }
        private void CalculateSoilingImpact(SoilingCalculations soilingScenario)
        {
            soilingScenario.PredictedEnergyAfterSoiling = soilingScenario.SoilingDerate * _predictedEnergyList[_dayCount];
            soilingScenario.PredictedEnergyLoss = _predictedEnergyList[_dayCount] - soilingScenario.PredictedEnergyAfterSoiling;
            soilingScenario.PredictedRevenueLoss = _energyPricesList[_dayCount] * soilingScenario.PredictedEnergyLoss;
            soilingScenario.SumOfPredictedRevenueLoss += soilingScenario.PredictedRevenueLoss; // for every day, add the predicted revenue loss
        }
        private void CheckIfWashDay(DateTime currentDate, DateTime centerPoint, int span)
        {
            if (currentDate > _startSoiling.AddDays(_soilingBuffer) && currentDate < _endSoiling.AddDays(-_soilingBuffer) && (((currentDate - centerPoint).Days % span) == 0))
            {
                _cleaningDates.Add(currentDate);
                _soilingWithAction.SoilingDerate = 1.0;// reset to 1 because cleaning will be done
                _cumulativeCleaning += 1;
            }
        }
        private void CalculateSoilingDerateWithAction(DateTime currentDate)
        {
            if (currentDate > _startSoiling && currentDate < _endSoiling && _soilingWithAction.SoilingDerate != 1.0) //TODO : review float issue with 1.0
            {
                //SoilingDerateWithAct holds the value of the previous day as it has not been calculated yet
                _soilingWithAction.SoilingDerate = Math.Max(_soilingWithAction.SoilingDerate, (_soilingWithAction.SoilingDerate * (1 + _soilingRate) * (1 + _cumulativeCleaning * _accelerator)));
            }
        }
        private void UpdateTempOutput()
        {
            _tempResult.CostOfInaction = _soilingNoAction.SumOfPredictedRevenueLoss;
            _tempResult.Benefit = _tempResult.CostOfInaction - _soilingWithAction.SumOfPredictedRevenueLoss;
            _tempResult.CostOfAction = _cumulativeCleaning * _costCleaning * _plantDCCapacity;
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
        private void SaveResultIntoDB(DBRecommendationJob job)
        {
            _bestCleaningDates.ForEach(date =>
            {
                _actions.Add(new DBAction() { Date = date });
            });

            _result.ActionsSuggestedList = _actions;

            var jobDB = _recommendationEngineDb.RecommendationJobs.First(j => j.RecommendationJobId == job.RecommendationJobId);
            jobDB.Result = _result;
            _recommendationEngineDb.SaveChanges();
        }
    }
}