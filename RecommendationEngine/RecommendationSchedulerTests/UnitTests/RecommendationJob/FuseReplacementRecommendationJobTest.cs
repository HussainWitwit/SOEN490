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
using Quartz.Impl;
using RecommendationScheduler.RecommendationJob;

namespace RecommendationSchedulerTests.UnitTests.RecommendationJob
{
    public class FuseReplacementRecommendationJobTest
    {
        private Mock<IRecommendationJobLogger> _loggerMock;
        private Mock<IRecommendationSchedulerRepository> _recommendationSchedulerRepoMock;
        private Mock<IJobExecutionContext> _contextMock;
        private FuseReplacementRecommendationJob _yearlyWashOptimizationRecommendationJob;

        [SetUp]
        public void Setup()
        {
            _loggerMock = new Mock<IRecommendationJobLogger>();
            _recommendationSchedulerRepoMock = new Mock<IRecommendationSchedulerRepository>();
            _contextMock = new Mock<IJobExecutionContext>();
            _yearlyWashOptimizationRecommendationJob = new FuseReplacementRecommendationJob();
        }

    }
}