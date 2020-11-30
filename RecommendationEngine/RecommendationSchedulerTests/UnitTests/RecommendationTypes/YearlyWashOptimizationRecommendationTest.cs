using Interfaces.Utilities;
using Models.DB;
using Models.Recommendation.YearlyWashOptimization;
using Moq;
using NUnit.Framework;
using RecommendationScheduler.RecommendationTypes;
using System;
using System.Collections.Generic;
using System.Linq;

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
            DBRecommendationJob testJob = new DBRecommendationJob();

            _yearlyWashOptimizationRecommendation = new YearlyWashOptimizationRecommendation(_loggerMock.Object, testJob);
        }

        [Test]
        public void TestStartNoScheduleOnStart()
        {
            //Arrange
            _loggerMock.Setup(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()));
            //Act

            YearlyWashParameters userParameters = new YearlyWashParameters();
            YearlyWashAPIValues apiValues = new YearlyWashAPIValues();
            GetDummy1(userParameters, apiValues);
            DBRecommendationJobResult testResult = _yearlyWashOptimizationRecommendation.ExecuteAlgorithm(userParameters, apiValues);

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

        [Test]
        public void TestStartNoScheduleOnStart2()
        {
            //Arrange
            _loggerMock.Setup(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()));
            //Act
            YearlyWashParameters userParameters = new YearlyWashParameters();
            YearlyWashAPIValues apiValues = new YearlyWashAPIValues();
            GetDummy2(userParameters, apiValues);
            DBRecommendationJobResult testResult = _yearlyWashOptimizationRecommendation.ExecuteAlgorithm(userParameters, apiValues);

            var cleaningDays = testResult.ActionsSuggestedList.Select(day => day.Date).ToList();
            List<DateTime> mockCleaningDays = new List<DateTime>();
            mockCleaningDays.Add(new DateTime(2020, 10, 17));

            //Assert
            Assert.AreEqual(Convert.ToInt32(testResult.CostOfAction), 50);
            Assert.AreEqual(Convert.ToInt32(testResult.CostOfInaction), 73);
            Assert.AreEqual(Convert.ToInt32(testResult.NetSaving), -15);
            Assert.AreEqual(Convert.ToInt32(testResult.ReturnOnInvestment), 70);
            Assert.AreEqual(Convert.ToInt32(testResult.Benefit), 35);
            Assert.AreEqual(cleaningDays, mockCleaningDays);
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()), Times.AtLeastOnce);
        }


        public void GetDummy1(YearlyWashParameters parameters, YearlyWashAPIValues apiValues)
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
        public void GetDummy2(YearlyWashParameters parameters, YearlyWashAPIValues apiValues)
        {

            apiValues.PlantDCCapacity = 25;

            apiValues.PredictEnergyList = new List<double>
            {300,280,287,243,292,216,275,210,225,279,220,260,277,234,219,235,223,235,281,252,248,257,240,299,299,289,210,294,246,227,223};

            apiValues.EnergyPricesList = new List<double>
            { 0.1,0.5,0.5,0.4,0.3,0.3,0.4,0.1,0.2,0.1,0.1,0.1,0.2,0.1,0.3,0.4,0.2,0.5,0.4,0.3,0.1,0.2,0.3,0.4,0.1,0.5,0.5,0.1,0.3,0.1,0.1 };

            parameters.CenterPointIncrement = 2;
            parameters.SpanIncrement = 2;
            parameters.StartSoiling = new DateTime(2020, 10, 1);
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