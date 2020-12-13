using System;
using System.Collections.Generic;
using Interfaces.RecommendationScheduler;
using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;
using Models.Application;
using Models.DB;
using Moq;
using NUnit.Framework;
using RecommendationEngine.ConfiguredRecommendationServices;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngineTests.UnitTests.MockData;

namespace RecommendationEngineTests.UnitTests
{
    public class ConfiguredRecommendationServiceTest
    {
        private ConfiguredRecommendationService _configuredRecommendationService;
        private Mock<IConfiguredRecommendationRepository> _repository;
        private Mock<IAssetRepository> _assetRepository;
        private Mock<IDriveService> _driveService;
        private Mock<IRecommendationScheduler> _scheduler;

        [SetUp]
        public void Setup()
        {
            _repository = new Mock<IConfiguredRecommendationRepository>();
            _assetRepository = new Mock<IAssetRepository>();
            _driveService = new Mock<IDriveService>();
            _scheduler = new Mock<IRecommendationScheduler>();
            _configuredRecommendationService = new ConfiguredRecommendationService(_driveService.Object, _repository.Object, _assetRepository.Object, _scheduler.Object);
        }

        [Test]
        public void GetRecommendationListTest()
        {
            List<DBRecommendationSchedule> recommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST;
            _repository.Setup(x => x.GetRecommendationScheduleList()).Returns(recommendation);

            List<ConfiguredRecommendation> expected = _configuredRecommendationService.GetConfiguredRecommendationList();
            Assert.AreEqual(expected[0].Name, recommendation[0].Name);
            Assert.AreEqual(expected[0].Granularity, recommendation[0].Granularity);
            Assert.NotNull(expected[0].AssetList);
        }

        [Test]
        public void AddRecommendationTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation beforeConversion = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule afterConversion = MockConfiguredRecommendations.CONVERTED_CONFIGURED_RECOMMENDATION;

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));
            _configuredRecommendationService.AddConfiguredRecommendation(beforeConversion);
            _repository.Setup(x => x.Add(afterConversion));
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

        [Test]
        public void BadDayOfWeekTest()
        {
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.RecurrenceDayOfWeek = 10;
            Assert.Throws<GlobalException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
        }

        [Test]
        public void BadDateTest()
        {
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.RecurrenceDatetime = new DateTime(2000, 01, 01);
            Assert.Throws<GlobalException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
        }
    }
}
