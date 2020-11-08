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
    public class FuseReplacementRecommendationTest
    {
        private Mock<IRecommendationJobLogger> _loggerMock;
        private FuseReplacementRecommendation _yearlyWashOptimizationRecommendation;

        [SetUp]
        public void Setup()
        {
            _loggerMock = new Mock<IRecommendationJobLogger>();
            _yearlyWashOptimizationRecommendation = new FuseReplacementRecommendation();
        }
    }
}