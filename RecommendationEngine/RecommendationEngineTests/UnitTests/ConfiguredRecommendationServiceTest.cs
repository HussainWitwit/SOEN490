using System;
using System.Collections.Generic;
using Interfaces.RecommendationScheduler;
using Interfaces.Repositories;
using Interfaces.Services.ExternalApi;
using Models.DB;
using Moq;
using NUnit.Framework;
using RecommendationEngine.ConfiguredRecommendationServices;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Models.Application;
using RecommendationEngineTests.UnitTests.MockData;

namespace RecommendationEngineTests.UnitTests
{
    public class ConfiguredRecommendationServiceTest
    {
        private ConfiguredRecommendationService _configuredRecommendationService;
        private Mock<IConfiguredRecommendationRepository> _repository;
        private Mock<IDriveService> _driveService;
        private Mock<IRecommendationScheduler> _scheduler;

        [SetUp]
        public void Setup()
        {
            _repository = new Mock<IConfiguredRecommendationRepository>();
            _driveService = new Mock<IDriveService>();
            _scheduler = new Mock<IRecommendationScheduler>();
            _configuredRecommendationService = new ConfiguredRecommendationService(_driveService.Object, _repository.Object, _scheduler.Object);
        }

        [Test]
        public void GetRecommendationListTest()
        {
            List<ConfiguredRecommendation> recommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST;
            _repository.Setup(x => x.Get()).Returns(recommendation);

            List<ConfiguredRecommendation> expected = _configuredRecommendationService.getConfiguredRecommendationList();
            Assert.AreEqual(expected, recommendation);
        }

        [Test]
        public void AddRecommendationTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation beforeConversion = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule afterConversion = MockConfiguredRecommendations.CONVERTED_CONFIGURED_RECOMMENDATION;

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));
            _configuredRecommendationService.AddConfiguredRecommendation(beforeConversion);
            _repository.Setup(x => x.Add(afterConversion));
        }

        [Test]
        public void DeleteRecommendationTest()
        {
            List<ConfiguredRecommendation> recommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST;
            int recommentionId = 2;

            _repository.Setup(x => x.Delete(recommentionId));
            _repository.Setup(x => x.Get()).Returns(new List<ConfiguredRecommendation>() { recommendation[0] });
            _configuredRecommendationService.DeleteConfiguredRecommendation(recommentionId);

            List<ConfiguredRecommendation> actual = _configuredRecommendationService.getConfiguredRecommendationList();
            Assert.AreEqual(1, actual.Count);
            Assert.AreEqual(new List<ConfiguredRecommendation>() { recommendation[0] }, actual);
        }

        [Test]
        public void BadRecommendationTypeTest()
        {
            ConfiguredRecommendation badRecommendationType = MockConfiguredRecommendations.BAD_CONFIGURED_RECOMMENDATION;
            Assert.Throws<GlobalException>(() => _configuredRecommendationService.AddConfiguredRecommendation(badRecommendationType));
        }

        [Test]
        public void EmptyRecommendationTest()
        {
            ConfiguredRecommendation emptyRecommendationType = MockConfiguredRecommendations.EMPTY_CONFIGURED_RECOMMENDATION;
            Assert.Throws<GlobalException>(() => _configuredRecommendationService.AddConfiguredRecommendation(emptyRecommendationType));
        }
    }
}
