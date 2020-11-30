using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;
using Interfaces.Utilities;
using Models.Application.APIModels;
using Models.Application.Asset;
using Models.DB;
using Models.Recommendation.YearlyWashOptimization;
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

        protected override void ExecuteJob()
        {
            GetFromDB();

            GetFromAPI();
            YearlyWashOptimizationRecommendation ywoRecommendation = new YearlyWashOptimizationRecommendation(_jobLogger, _recommendationJob);
            DBRecommendationJobResult _result = ywoRecommendation.ExecuteAlgorithm(_parameters, _apiValues);
            SaveResult(_recommendationJob, _result);
        }

        protected override void GetFromDB()
        {
            //Parameters TODO: switch Start of soiling season, End of soiling season, Soiling rate, Cost of cleaning into API once we get the access 
            _parameters.StartSoiling = new DateTime(2020, 08, 1);
            _parameters.EndSoiling = new DateTime(2020, 11, 1);
            _parameters.SoilingRate = -0.0025;
            _parameters.CostCleaning = 2;

            //Parameters from recommendation schedule 
            _parameters.CenterPointIncrement = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "center point increment").FirstOrDefault().ParamValue;
            _parameters.SpanIncrement = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "span increment").FirstOrDefault().ParamValue;
            _parameters.SoilingBuffer = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "soiling season buffer").FirstOrDefault().ParamValue;
            _parameters.Accelerator = _recommendationJob.Schedule.ParametersList.Where(x => x.DisplayText == "accelerator").FirstOrDefault().ParamValue;
            _parameters.PreferedScenario = _recommendationJob.Schedule.PreferedScenario;
            _parameters.PlantIds = _recommendationJob.Schedule.AssetsList.Select(asset => asset.Asset.Name).ToList();
            _parameters.Asset = _recommendationJob.Asset;
        }

        protected override void GetFromAPI()
        {
            //TODO: APIs need to be fixed on PF's side, for now we are running the algorithm with the following values
            Dictionary<string, List<PFPredictedEnergy>> predictedEnergyDict = Task.Run(async () => await _driveService.GetDailyPredictedEnergyByPlantIds(_parameters.StartSoiling, _parameters.EndSoiling, _parameters.PlantIds)).Result;
            _apiValues.PredictEnergyList = predictedEnergyDict["assets"].FirstOrDefault().Attributes[0].Values.Select(pe => (pe / 100)).ToList();

            List<PFMetadata> metadata = Task.Run(async () => await _driveService.GetAssetsMetadataByPlantIds(_parameters.PlantIds)).Result;
            var plantMetadata = metadata.Select(plant => plant.Metadata).FirstOrDefault();
            _apiValues.PlantDCCapacity = plantMetadata["DC_Capacity"] / 1000;

            List<PFPPAPrice> energyPrices = Task.Run(async () => await _driveService.GetPPAPriceByPlantId(_parameters.PlantIds.FirstOrDefault())).Result;
            double avgPrice;

            energyPrices = energyPrices.Where(energyPrice => energyPrice.EffectiveStartTime >= _parameters.StartSoiling && energyPrice.EffectiveEndTime <= _parameters.EndSoiling).ToList();

            _apiValues.EnergyPricesList = new List<double>();

            for(DateTime date = _parameters.StartSoiling; date <= _parameters.EndSoiling; date = date.AddDays(1))
            {
                avgPrice = energyPrices.Where(ep => ep.EffectiveStartTime.Date == date || ep.EffectiveEndTime.Date == date).Select(x => (x.Price / 100)).DefaultIfEmpty(37).Average();
                _apiValues.EnergyPricesList.Add(avgPrice);
            }
        }
    }
}