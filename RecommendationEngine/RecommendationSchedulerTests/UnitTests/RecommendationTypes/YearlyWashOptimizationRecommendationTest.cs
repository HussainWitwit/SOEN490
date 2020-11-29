using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.Utilities;
using Models.DB;
using Models.Recommendation.YearlyWash;
using Moq;
using NUnit.Framework;
using RecommendationScheduler.RecommendationTypes;

namespace RecommendationSchedulerTests.UnitTests.RecommendationTypes
{
    public class YearlyWashOptimizationRecommendationTest
    {
        private Mock<IRecommendationJobLogger> _loggerMock;
        private YearlyWashOptimizationRecommendation _yearlyWashOptimizationRecommendation;
       

    [SetUp]
        public void Setup()
        {
            _loggerMock = new Mock<IRecommendationJobLogger>();
            _yearlyWashOptimizationRecommendation = new YearlyWashOptimizationRecommendation(_loggerMock.Object);
        }

        [Test]
        public void TestStartNoScheduleOnStart()
        {
            //Arrange
            _loggerMock.Setup(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()));
             //Act
            DBRecommendationJob testJob = new DBRecommendationJob();
            YearlyWashParameters userParameters = new YearlyWashParameters();
            YearlyWashAPIValues apiValues = new YearlyWashAPIValues();
            GetDummy(userParameters, apiValues);
            DBRecommendationJobResult testResult = _yearlyWashOptimizationRecommendation.ExecuteAlgorithm(testJob, apiValues, userParameters);

            var cleaningDays = testResult.ActionsSuggestedList.Select(day => day.Date).ToList();
            List<DateTime> mockCleaningDays = new List<DateTime>();
            mockCleaningDays.Add(new DateTime(2020, 09, 22));

            //Assert
            Assert.AreEqual(Convert.ToInt32(testResult.CostOfAction), 50);
            Assert.AreEqual(Convert.ToInt32(testResult.CostOfInaction), 233);
            Assert.AreEqual(Convert.ToInt32(testResult.NetSaving), 47);
            Assert.AreEqual(Convert.ToInt32(testResult.ReturnOnInvestment), 195);
            Assert.AreEqual(Convert.ToInt32(testResult.Benefit), 97);
            Assert.AreEqual(cleaningDays, mockCleaningDays);
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()), Times.AtLeastOnce);

        }

        public void GetDummy(YearlyWashParameters parameters, YearlyWashAPIValues apiValues)
        {

            apiValues.PlantDCCapacity = 25;

            apiValues.PredictEnergyList = new List<double>
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

           apiValues.EnergyPricesList = new List<double>
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

            parameters.CenterPointIncrement = 2;
            parameters.SpanIncrement = 2; 
            parameters.StartSoiling = new DateTime(2020, 08, 1);
            parameters.EndSoiling = new DateTime(2020, 11, 1);
            parameters.SoilingRate = -0.0025;
            parameters.CostCleaning = 2;
            parameters.SoilingBuffer = 3;
            parameters.Accelerator = 0.33;
            parameters.PreferedScenario = "ROI";
            parameters.PlantIds = new List<string>();
            parameters.PlantIds.Add("RENEW01_2070.93.001");
            parameters.Asset = new DBAsset();
        }
    }
}