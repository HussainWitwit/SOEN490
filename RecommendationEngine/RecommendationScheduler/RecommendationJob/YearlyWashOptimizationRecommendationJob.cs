using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;
using Interfaces.Utilities;
using Models.Application.Asset;
using Models.DB;
using Models.Recommendation.YearlyWash;
using RecommendationScheduler.RecommendationTypes;

namespace RecommendationScheduler.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob : RecommendationJob
    {
        //Values from APIs
        private YearlyWashAPIValues _apiValues = new YearlyWashAPIValues();

        //configured recommendation parameters from db
        private YearlyWashParameters _parameters = new YearlyWashParameters();


        public YearlyWashOptimizationRecommendationJob(IRecommendationJobLogger jobLogger, IRecommendationSchedulerRepository schedulerRepository, IDriveService driveService)
        {
            _jobLogger = jobLogger;
            _schedulerRepository = schedulerRepository;
            _driveService = driveService;
        }

        //TODO: BACK TO PROTECTED
        public override void ExecuteJob()
        {
            RecommendationScheduleId = 1;
            CreateRecommendationJob();
            GetFromApi();
            GetFromDB();
            YearlyWashOptimizationRecommendation ywoRecommendation = new YearlyWashOptimizationRecommendation(_jobLogger);
            DBRecommendationJobResult _result = ywoRecommendation.ExecuteAlgorithm(_recommendationJob, _apiValues, _parameters);
            SaveResult(_recommendationJob, _result);
        }

        protected async override void GetFromApi()
        {
            //TODO: APIs need to be fixed on PF's side, for now we are running the algorithm with the following values
            //API variables
            //Dictionary<string, List<PFPredictedEnergy>> predictedEnergyDict = await _driveService.GetDailyPredictedEnergyByPlantIds(_startSoiling, _endSoiling, _plantIds);
            //_apiValues.PredictEnergyList = predictedEnergyDict["assets"].FirstOrDefault().Attributes[0]["values"];



            //List<PFPPAPrice> energyPrices = await _driveService.GetPPAPriceByPlantId(_plantIds.FirstOrDefault());
            //double avgPrice;

            //for(DateTime date = _startSoiling; date <= _endSoiling; date.AddDays(1))
            //{
            //    avgPrice = energyPrices.Where(ep => ep.EffectiveStartTime.Date == date || ep.EffectiveEndTime.Date == date).Select(x => x.Price).DefaultIfEmpty(37).Average();
            //    energyPricesList.Add(avgPrice);
            //}



            //List<PFMetadata> metadata = await _driveService.GetAssetsMetadataByPlantIds(_plantIds);
            //var plantMetadata = metadata.Select(plant => plant.Metadata).FirstOrDefault();
            //plantDCCapacity = plantMetadata["DC_Capacity"];

            _apiValues.PlantDCCapacity = 25;

            _apiValues.PredictEnergyList = new List<double>
            {
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
                240,240,240,240,240,
            };

            _apiValues.EnergyPricesList = new List<double>
            {
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
                0.1,0.1,0.1,0.1,0.1,
            };

        }

        protected override void GetFromDB()
        {
            //Parameters TODO: switch Start of soiling season, End of soiling season, Soiling rate, Cost of cleaning into API once we get the access 
            //_parameters.CenterPointIncrement = 2; //TODO: CHANGE DOUBLE TO INT IN DB
            //_parameters.SpanIncrement = 2; //TODO: CHANGE DOUBLE TO INT IN DB
            _parameters.StartSoiling = new DateTime(2020, 08, 1);
            _parameters.EndSoiling = new DateTime(2020, 11, 1);
            _parameters.SoilingRate = -0.0025;
            _parameters.CostCleaning = 2;
            //_parameters.SoilingBuffer = 3;
            //_parameters.Accelerator = 0.33;
            //_parameters.PreferedScenario = "returnOnInvestment";
            //_parameters.PlantIds = new List<string>();
            //_parameters.PlantIds.Add("RENEW01_2070.93.001"); //TODO: to remove once in the db

            _parameters.CenterPointIncrement = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "center point increment").FirstOrDefault().ParamValue;
            _parameters.SpanIncrement = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "span increment").FirstOrDefault().ParamValue;
            _parameters.SoilingBuffer = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "soiling season buffer").FirstOrDefault().ParamValue;
            _parameters.Accelerator = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "accelerator").FirstOrDefault().ParamValue;
            _parameters.PreferedScenario = _recommendationJob.Schedule.PreferedScenario;
            _parameters.PlantIds = _recommendationJob.Schedule.AssetsList.Select(asset => asset.Asset.Name).ToList();
        }
    }
}