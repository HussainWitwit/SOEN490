using Interfaces.Utilities;
using Models.DB;
using System;
using Interfaces.Services.ExternalAPI;
using System.Linq;
using System.Collections.Generic;

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
            DBRecommendationJobResult result = new DBRecommendationJobResult();

            string preferedScenario = "returnOfInvestment"; //TODO: user input

            _jobLogger.LogInformation(job, "Starting Yearly Wash Optimization Recommendation");
            //API variables
            double predictedEnergy = _driveService.GetPredictedEnergy();
            double energyPrice = _driveService.GetEnergyPrice();
            double dcCapacity = _driveService.GetDCCapacity();

            //Parameters TODO: switch Start of soiling season, End of soiling season, Soiling rate, Cost of cleaning into API once we get the access 
            DateTime startSoiling = new DateTime(2020, 1, 1, 1, 0, 0);
            DateTime endSoiling = new DateTime(2020, 10, 1, 1, 0, 0);
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
            DateTime currentDate = startSoiling;
            double span = 1;
            double centerPointIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "centerpoint increment").FirstOrDefault().ParamValue;
            double spanIncrement = job.Schedule.ParametersList.Where(x => x.RecommendationParameter.Name == "span increment").FirstOrDefault().ParamValue;
            
            //Calculation variables
            //No Action
            double soilingDerateNoAct = 1.0; // the rate of soiling of a Solar Panel (SP), where 1 has no dirt and 0 is completely covered in dirt and no sunray can reach it
            double predictedEnergyAfterSoilingNoAct; // Predicted Energy produce by SP with its current soil level
            double predictedEnergyLossNoAct; // The difference between the Predicted Energy and the Predicty Energy due to the soiling levels for that day
            double predictedRevenueLossNoAct; // Predicted Revenue Loss due to the soiling level

            //With Action - same definitions as above but modified values due to cleanings 
            double soilingDerateWithAct = 1.0; // The rate will go back to one once a cleaning will happen 
            double predictedEnergyAfterSoilingWithAct;
            double predictedEnergyLossWithAct;
            double predictedRevenueLossWithAct;

            //other
            List<DateTime> cleaningDates = new List<DateTime>(); //List of Cleaning days for a specific centerPoint and span combination
            List<DateTime> bestCleaningDates = new List<DateTime>(); //to temporary store the best cleaning dates / they are later transformed into actions
            List<DBAction> actions = new List<DBAction>(); //list of actions after finding the best center point + span

            int cumulativeCleaning;

            //Output variables
            double costOfInaction;
            double benefit;
            double costOfAction ;
            double returnOfInvestement ;
            double netSaving;
            double sumOfPredictedRevenueLossWithAct ;


            result.ReturnOfInvestment = 0;
            result.NetSaving = 0;

            _jobLogger.LogInformation(job, "Looking for best cleaning dates...");

            while (centerPoint < endSoiling){
             
                span = spanIncrement;
                centerPoint = startSoiling;
                

                while (centerPoint.AddDays(span) < endSoiling || centerPoint.AddDays(-span) > startSoiling) //TODO : ask power factors why -span 
                {
                    //reset values for new date
                    soilingDerateNoAct = 1;
                    soilingDerateWithAct = 1;
                    costOfInaction = 0;
                    benefit = 0;
                    costOfAction = 0;
                    returnOfInvestement = 0;
                    netSaving = 0;
                    sumOfPredictedRevenueLossWithAct = 0; // total sum of all the revenue loss for one centerpoint and span
                    cumulativeCleaning = 0; //The number of cleanings so far
                    cleaningDates.Clear();
                    bestCleaningDates.Clear();

                    // computes various outputs for a all day within soiling season with a specific combination of center point + span
                    for (currentDate = startSoiling; endSoiling.CompareTo(currentDate) > 0; currentDate = currentDate.AddDays(1))// iterate through all days within soiling season
                    {
                        //TODO: change predictedEnergy and energyPrice to take a day parameter (currentDate) to get the specific day value

                        //NoAction
                        soilingDerateNoAct = (1 + soilingRate) * soilingDerateNoAct;
                        predictedEnergyAfterSoilingNoAct = soilingDerateNoAct * predictedEnergy;
                        predictedEnergyLossNoAct = predictedEnergy - predictedEnergyAfterSoilingNoAct;
                        predictedRevenueLossNoAct = energyPrice * predictedEnergyLossNoAct;
                        costOfInaction += predictedEnergyAfterSoilingNoAct; // for every day, add the cost of Inaction

                        if (currentDate > startSoiling.AddDays(soilingBuffer) &&
                            currentDate < endSoiling.AddDays(-soilingBuffer))
                        {

                            if (((currentDate - centerPoint).Days % span) == 0) 
                            {
                                cleaningDates.Add(currentDate);
                                soilingDerateWithAct = 1.0;// reset to 1 because cleaning will be done
                                cumulativeCleaning += 1;
                            }
                        }

                        //WithAction
                        if (currentDate > startSoiling && currentDate < endSoiling && soilingDerateWithAct != 1.0) //TODO : review float issue with 1.0
                        {
                            //SoilingDerateWithAct holds the value of the previous day as it has not been calculated yet
                            soilingDerateWithAct = Math.Max(soilingDerateNoAct, (soilingDerateWithAct * (1 + soilingRate) * (1 + cumulativeCleaning * accelerator)));
                        }
                        predictedEnergyAfterSoilingWithAct = soilingDerateWithAct * predictedEnergy;
                        predictedEnergyLossWithAct = predictedEnergy - predictedEnergyAfterSoilingWithAct;
                        predictedRevenueLossWithAct = energyPrice * predictedEnergyLossWithAct;
                        sumOfPredictedRevenueLossWithAct += predictedRevenueLossWithAct; // for every day, add the predicted revenue los
                        
                    }

                    benefit = costOfInaction - sumOfPredictedRevenueLossWithAct;
                    costOfAction = cumulativeCleaning * costCleaning * dcCapacity;
                    returnOfInvestement = benefit / costOfAction * 100;
                    netSaving = benefit - costOfAction;

                    if(preferedScenario == "returnOfInvestment" && returnOfInvestement >= result.ReturnOfInvestment)// >= in order to cover the scenarion where the ROI will be 0$
                    {
                        result.CostOfAction = costOfAction;
                        result.CostOfInaction = costOfInaction;
                        result.NetSaving = netSaving;
                        result.Benefit = benefit;
                        result.ReturnOfInvestment = returnOfInvestement;
                        bestCleaningDates = cleaningDates;
                    }
                    else if(preferedScenario == "netSaving" && netSaving >= result.NetSaving)// >= in order to cover the scenarion where the netSaving will be 0$
                    {
                        result.CostOfAction = costOfAction;
                        result.CostOfInaction = costOfInaction;
                        result.NetSaving = netSaving;
                        result.Benefit = benefit;
                        result.ReturnOfInvestment = returnOfInvestement;
                        bestCleaningDates = cleaningDates;
                    }

                    span += spanIncrement;
                }
                centerPoint = centerPoint.AddDays(centerPointIncrement);
            }

            _jobLogger.LogInformation(job, "Best combination found!");

            bestCleaningDates.ForEach(date =>
            {
                actions.Add(new DBAction() { Date = date });
            });

            result.ActionsSuggestedList = actions;
            _jobLogger.LogInformation(job, "Search Completed");
        }
    }
}