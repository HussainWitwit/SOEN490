using Interfaces.Utilities;
using Moq;
using NUnit.Framework;
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