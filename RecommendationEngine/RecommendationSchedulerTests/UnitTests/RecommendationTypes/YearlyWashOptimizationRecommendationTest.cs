using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;
using Interfaces.Utilities;
using Microsoft.Extensions.Configuration;
using Models.DB;
using Moq;
using NUnit.Framework;
using Quartz;
using RecommendationScheduler.RecommendationTypes;

namespace RecommendationSchedulerTests.UnitTests.RecommendationTypes
{
    public class YearlyWashOptimizationRecommendationTest
    {
        private Mock<IRecommendationJobLogger> _loggerMock;
        private YearlyWashOptimizationRecommendation _yearlyWashOptimizationRecommendation;
        private IDriveService _driveService;

        [SetUp]
        public void Setup()
        {
            _loggerMock = new Mock<IRecommendationJobLogger>();
            _yearlyWashOptimizationRecommendation = new YearlyWashOptimizationRecommendation(_loggerMock.Object);
        }

        [Test]
        public void TestStartNoScheduleOnStart()
        {
            //new YeaApiValues 
            //Arrange
            _loggerMock.Setup(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()));

            //Act
            DBRecommendationJob testJob = new DBRecommendationJob();
            DBRecommendationJobResult testResult = _yearlyWashOptimizationRecommendation.ExecuteAlgorithm(testJob, );

            var cleaningDays = testResult.ActionsSuggestedList.Select(day => day.Date).ToList();
            var mockCleaningDays = new List<DateTime>();
            mockCleaningDays.Add(new DateTime(2020, 09, 22));

            Assert.AreEqual((int)testResult.CostOfAction, 50);
            Assert.AreEqual((int)testResult.CostOfInaction, 233);
            Assert.AreEqual((int)testResult.NetSaving, 47);
            Assert.AreEqual((int)testResult.ReturnOnInvestment, 195);
            Assert.AreEqual((int)testResult.Benefit, 97);
            Assert.AreEqual(cleaningDays, mockCleaningDays);

            //Assert
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()), Times.AtLeastOnce);

        }

        public getDummy()
        {
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
        }
    }
}