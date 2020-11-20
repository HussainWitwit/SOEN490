using Interfaces.Utilities;
using Models.DB;
using System;
using Interfaces.Services.ExternalAPI;
using System.Linq;

namespace RecommendationScheduler.RecommendationTypes
{
    public class YearlyWashOptimizationRecommendation: IRecommendationType
    {
        private IRecommendationJobLogger _jobLogger;
        private IDriveService _driveService;
        public YearlyWashOptimizationRecommendation(IRecommendationJobLogger jobLogger, IDriveService driveservice)
        {
            _jobLogger = jobLogger;
            _driveService = driveservice;
        }
        public void ExecuteAlgorithm(DBRecommendationJob job)
        {
            
            _jobLogger.LogInformation(job, "Starting Yearly Wash Optimization Recommendation");
            //API variables
            double predictedEnergy = _driveService.GetPredictedEnergy();
            double energyPrice = _driveService.GetEnergyPrice();
            double dcCapacity = _driveService.GetDCCapacity();

            //Parameters
            // TODO: switch Start of soiling season, End of soiling season, Soiling rate, Cost of cleaning into API once we get the access 
            DateTime startSoiling = new DateTime(2020, 1, 1, 1, 0, 0);
            startSoiling = startSoiling.Date;
            DateTime endSoiling = new DateTime(2020, 10, 1, 1, 0, 0);
            endSoiling = endSoiling.Date;
            double soilingRate = -0.0025;
            double costCleaning = 2;
            double soilingBuffer = 10;

            //Once inside of database, swithc to this 
            //DateTime startSoiling = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "start soiling").FirstOrDefault().ParamValue;
            //DateTime endSoiling = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "end soiling").FirstOrDefault().ParamValue;
            //double soilingRate = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "soiling rate").FirstOrDefault().ParamValue;
            //doouble costCleaning = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "cost cleaning").FirstOrDefault().ParamValue;
            //doouble soilingBuffer = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "soiling buffer").FirstOrDefault().ParamValue;

            //scenario parameters
            DateTime centerPoint = startSoiling;
            double span = 1;
            double centerPointIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "centerpoint increment").FirstOrDefault().ParamValue;
            double spanIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "span increment").FirstOrDefault().ParamValue;
           

            //Output variables
            double costOfInaction;
            double benefit;
            double costOfAction;
            double returnOfInvestement;
            double netSaving;

            //Calculation variables
            //TODO: add definitions of variables
            //No Action
            double soilingDerateNoAct = 1;
            double predictedEnergyAfterSoilingNoAct;
            double predictedEnergyLossNoAct;
            double predictedRevenueLossNoAct;
            //With Action
            double soilingDerateWithAct = 1;
            double predictedEnergyAfterSoilingWithAct;
            double predictedEnergyLossWithAct;
            double predictedRevenueLossWithAct;
            //other
            double cleaning = 0;
            double cumulativeCleaning = 0;

            while (centerPoint < endSoiling)
            {
                span = spanIncrement;
                soilingDerateNoAct = 1; //REVIEW 
                while(centerPoint.AddDays(span) < endSoiling || centerPoint.AddDays(-span) > startSoiling)
                {
                    centerPoint = centerPoint.AddDays(span);
                    //NoAction
                    soilingDerateNoAct = 1 + soilingRate * soilingDerateNoAct;
                    predictedEnergyAfterSoilingNoAct = soilingDerateNoAct * predictedEnergy;
                    predictedEnergyLossNoAct = predictedEnergy - predictedEnergyAfterSoilingNoAct;
                    predictedRevenueLossNoAct = energyPrice * predictedEnergyLossNoAct;

                    //WithAction
                    predictedEnergyAfterSoilingWithAct = soilingDerateWithAct * predictedEnergy;
                    predictedEnergyLossWithAct = predictedEnergy - predictedEnergyAfterSoilingWithAct;
                    predictedRevenueLossWithAct = energyPrice * predictedEnergyLossWithAct;

                    if (centerPoint > startSoiling.AddDays(soilingBuffer) || centerPoint < endSoiling.AddDays(-soilingBuffer))
                    {
                        //if ((centerPoint))
                    }
                }
            }
        }
    }
}