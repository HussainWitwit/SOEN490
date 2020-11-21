using Interfaces.Utilities;
using Models.DB;
using System;
using Interfaces.Services.ExternalAPI;
using System.Linq;
using System.Collections.Generic;

namespace RecommendationScheduler.RecommendationTypes
{ 
    //stretch goal user story --- add graphs 
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
            //TODO: add logger messages thru out algorithm 
            _jobLogger.LogInformation(job, "Starting Yearly Wash Optimization Recommendation");
            //API variables
            double predictedEnergy = _driveService.GetPredictedEnergy();
            double energyPrice = _driveService.GetEnergyPrice();
            double dcCapacity = _driveService.GetDCCapacity();

            //Parameters TODO: switch Start of soiling season, End of soiling season, Soiling rate, Cost of cleaning into API once we get the access 
            DateTime startSoiling = new DateTime(2020, 1, 1, 1, 0, 0);
            startSoiling = startSoiling.Date;
            DateTime endSoiling = new DateTime(2020, 10, 1, 1, 0, 0);
            endSoiling = endSoiling.Date;
            double soilingRate = -0.0025;
            double costCleaning = 2;
            double soilingBuffer = 10;
            double accelerator = 0.33;

            //TODO: Once inside of database, switch to this 
            //DateTime startSoiling = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "start soiling").FirstOrDefault().ParamValue;
            //DateTime endSoiling = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "end soiling").FirstOrDefault().ParamValue;
            //double soilingRate = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "soiling rate").FirstOrDefault().ParamValue;
            //double costCleaning = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "cost cleaning").FirstOrDefault().ParamValue;
            //double soilingBuffer = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "soiling buffer").FirstOrDefault().ParamValue;
            //double accelerator = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "accelerator").FirstOrDefault().ParamValue;

            //scenario parameters
            DateTime centerPoint = startSoiling;
            double span = 1;
            double centerPointIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "centerpoint increment").FirstOrDefault().ParamValue;
            double spanIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "span increment").FirstOrDefault().ParamValue;
            
            //Calculation variables
            //No Action
            double soilingDerateNoAct = 1; // the rate of soiling of a Solar Panel (SP), where 1 has no dirt and 0 is completely covered in dirt and no sunray can reach it
            double predictedEnergyAfterSoilingNoAct; // Predicted Energy produce by SP with its current soil level
            double predictedEnergyLossNoAct; // The difference between the Predicted Energy and the Predicty Energy due to the soiling levels for that day
            double predictedRevenueLossNoAct; // Predicted Revenue Loss due to the soiling level

            //With Action - same definitions as above but modified values due to cleanings 
            double soilingDerateWithAct = 1; // The rate will go back to one once a cleaning will happen 
            double predictedEnergyAfterSoilingWithAct;
            double predictedEnergyLossWithAct;
            double predictedRevenueLossWithAct;

            //other
            List<DateTime> cleaningDate = new List<DateTime>(); //List of Cleaning days for a specific centerPoint and span combination
            int cumulativeCleaning = 0; //The number of cleanings so far 

            //Output variables
            double costOfInaction;
            double benefit;
            double costOfAction ;
            double returnOfInvestement ;
            double netSaving;
            double sumOfPredictedRevenueLossWithAct ;
            

            for (DateTime currentDate = startSoiling; endSoiling.CompareTo(currentDate) > 0; currentDate = currentDate.AddDays(1)){
                //reset values for new date
                span = spanIncrement;
                soilingDerateNoAct = 1;
                soilingDerateWithAct = 1;
                centerPoint = startSoiling;
                costOfInaction = 0;
                benefit = 0;
                costOfAction = 0;
                returnOfInvestement = 0;
                netSaving = 0;
                sumOfPredictedRevenueLossWithAct = 0;

                while (centerPoint.AddDays(span) < endSoiling || centerPoint.AddDays(-span) > startSoiling)
                {
                    //TODO: To remove, this is for testing purposes
                    //print date values
                    //TODO: change predictedEnergy and energyPrice to take a day parameter (currentDate) to get the specific day value
                    centerPoint = centerPoint.AddDays(span);
                    //NoAction
                    soilingDerateNoAct = 1 + soilingRate * soilingDerateNoAct;
                    predictedEnergyAfterSoilingNoAct = soilingDerateNoAct * predictedEnergy;
                    predictedEnergyLossNoAct = predictedEnergy - predictedEnergyAfterSoilingNoAct;
                    predictedRevenueLossNoAct = energyPrice * predictedEnergyLossNoAct;
                    costOfInaction += predictedEnergyAfterSoilingNoAct;

                    if (centerPoint > startSoiling.AddDays(soilingBuffer) &&
                        centerPoint < endSoiling.AddDays(-soilingBuffer))
                    {
                        
                        //todo:  to remove , could also use Days instead of total days to get int, if necessary 
                        if (((currentDate - centerPoint).TotalDays % span) == 0) //TODO: verify it includes the case where currentdate = centerpoint
                        {
                            //cleaningDate.Add(new DateTime() { DateTime.Date = currentDate});
                            soilingDerateWithAct = 1.0;
                            cumulativeCleaning += 1;
                        }
                    }

                    //WithAction
                    if (currentDate > startSoiling && currentDate < endSoiling && soilingDerateWithAct != 1.0) //todo : review float issue with 1.0
                    {
                        //SoilingDerateWithAct holds the value of the previous day as it has not been calculated yet
                        soilingDerateWithAct = Math.Max(soilingDerateNoAct, soilingDerateWithAct) * (1 + soilingRate) * (1 + cumulativeCleaning * accelerator);  
                    }
                    predictedEnergyAfterSoilingWithAct = soilingDerateWithAct * predictedEnergy;
                    predictedEnergyLossWithAct = predictedEnergy - predictedEnergyAfterSoilingWithAct;
                    predictedRevenueLossWithAct = energyPrice * predictedEnergyLossWithAct;
                    sumOfPredictedRevenueLossWithAct += predictedEnergyAfterSoilingWithAct;
                    benefit = costOfInaction - sumOfPredictedRevenueLossWithAct;
                    costOfAction = cumulativeCleaning * costCleaning * dcCapacity;
                    returnOfInvestement = benefit / costOfAction * 100;
                    netSaving = benefit - costOfAction;


                }

            }

        }
    }
}