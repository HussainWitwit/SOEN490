using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Interfaces.Repositories;
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
            _yearlyWashOptimizationRecommendation.ExecuteAlgorithm(null);
            //Assert
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()), Times.AtLeastOnce);

        }
    }
}