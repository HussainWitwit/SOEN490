using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.Application.APIModels;
using Models.DB;
using Models.Recommendation.YearlyWashOptimization;
using RecommendationScheduler.RecommendationTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;

namespace RecommendationScheduler.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJob : RecommendationJob
    {
        //Values from APIs
        private readonly YearlyWashApiValues _apiValues = new YearlyWashApiValues();

        //configured recommendation parameters from db
        private readonly YearlyWashParameters _parameters = new YearlyWashParameters();


        public YearlyWashOptimizationRecommendationJob(IRecommendationJobLogger jobLogger, IRecommendationSchedulerRepository schedulerRepository, IMetadataDriveService metadataDriveService)
        {
            _jobLogger = jobLogger;
            _schedulerRepository = schedulerRepository;
            _metadataDriveService = metadataDriveService;
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
            _parameters.StartSoiling = Convert.ToDateTime(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "StartSoilingSeason").ParamValue);
            _parameters.EndSoiling = Convert.ToDateTime(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "EndSoilingSeason").ParamValue);
            _parameters.SoilingRate = Convert.ToDouble(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "SoilingRate").ParamValue);
            _parameters.CostCleaning = Convert.ToDouble(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "CostCleaning").ParamValue);

            //Parameters from recommendation schedule 
            _parameters.CenterPointIncrement = Convert.ToDouble(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "CenterPointIncrement").ParamValue);
            _parameters.SpanIncrement = Convert.ToDouble(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "SpanIncrement").ParamValue);
            _parameters.SoilingBuffer = Convert.ToDouble(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "SoilingSeasonBuffer").ParamValue);
            _parameters.Accelerator = Convert.ToDouble(_recommendationJob.Schedule.ParametersList.FirstOrDefault(x => x.Name == "Accelerator").ParamValue);
            _parameters.PreferredScenario = _recommendationJob.Schedule.PreferedScenario;
            _parameters.Asset = _recommendationJob.Asset;
            _jobLogger.LogInformation(_recommendationJob, "Fetched user-defined parameter values associated with job", _parameters);
        }

        protected override void GetFromAPI()
        {
            List<string> assetIds = new List<string> { _recommendationJob.Asset.Name };

            Dictionary<string, List<PFPredictedEnergy>> predictedEnergyDict = Task.Run(async () => await _metadataDriveService.GetDailyPredictedEnergyByPlantIds(_parameters.StartSoiling, _parameters.EndSoiling, assetIds)).Result;
            _apiValues.PredictEnergyList = predictedEnergyDict["assets"].FirstOrDefault().Attributes[0].Values.Select(pe => (pe / 100)).ToList();

            List<PFMetadata> metadata = Task.Run(async () => await _metadataDriveService.GetAssetsMetadataByPlantIds(assetIds)).Result;
            var plantMetadata = metadata.Select(plant => plant.Metadata).FirstOrDefault();
            _apiValues.PlantDCCapacity = plantMetadata["DC_Capacity"] / 1000;

            List<PFPpaPrice> energyPrices = Task.Run(async () => await _metadataDriveService.GetPPAPriceByPlantId(_parameters.Asset.Name)).Result;
            double avgPrice;

            energyPrices = energyPrices.Where(energyPrice => energyPrice.EffectiveStartTime >= _parameters.StartSoiling && energyPrice.EffectiveEndTime <= _parameters.EndSoiling).ToList();

            _apiValues.EnergyPricesList = new List<double>();

            for (DateTime date = _parameters.StartSoiling; date <= _parameters.EndSoiling; date = date.AddDays(1))
            {
                avgPrice = energyPrices.Where(ep => ep.EffectiveStartTime.Date == date || ep.EffectiveEndTime.Date == date).Select(x => (x.Price / 100)).DefaultIfEmpty(37).Average();
                _apiValues.EnergyPricesList.Add(avgPrice);
            }
            _jobLogger.LogInformation(_recommendationJob, "Fetched API parameters from Drive", _apiValues);
        }
    }
}