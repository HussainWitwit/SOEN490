﻿using System;
using System.Collections.Generic;
using System.Linq;
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
        public void EditRecommendationTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation uneditedRec = MockConfiguredRecommendations.UNEDITED_CONFIGURED_RECOMMENDATION;
            ConfiguredRecommendation editedConfigureRec = MockConfiguredRecommendations.EDITED_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule uneditedDBRec = MockConfiguredRecommendations.UNEDITED_DB_RECOMMENDATION;
            DBRecommendationSchedule editedDBRec = MockConfiguredRecommendations.EDITED_DB_RECOMMENDATION;

            _repository.Setup(x => x.Get()).Returns(new List<ConfiguredRecommendation> { uneditedRec });
            List<ConfiguredRecommendation> beforeEditExpect = _configuredRecommendationService.getConfiguredRecommendationList();
            Assert.AreEqual(beforeEditExpect, new List<ConfiguredRecommendation> { uneditedRec });

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _repository.Setup(x => x.Edit(uneditedDBRec, 1)).Returns(editedDBRec);
            _configuredRecommendationService.EditConfiguredRecommendation(uneditedRec, 1);
            _repository.Setup(x => x.Get()).Returns(new List<ConfiguredRecommendation> { editedConfigureRec });
            List<ConfiguredRecommendation> afterEditExpect = _configuredRecommendationService.getConfiguredRecommendationList();
            Assert.AreEqual(afterEditExpect, new List<ConfiguredRecommendation> { editedConfigureRec });
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

        [Test]
        public void GetRecommendationByIdTest()
        {
            DBRecommendationSchedule recommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST.First();
            _repository.Setup(x => x.GetRecommendationScheduleById(It.IsAny<int>())).Returns(recommendation);

            ConfiguredRecommendation expected = _configuredRecommendationService.GetConfiguredRecommendationById(1);
            Assert.AreEqual("Wash Recommendation 1", expected.Name);
            Assert.AreEqual("Yearly", expected.Granularity);
            Assert.AreEqual("Description", expected.Description);
            Assert.AreEqual("Mohanad", expected.CreatedBy);
            Assert.AreEqual("ROI", expected.PreferredScenario);
            Assert.AreEqual("Yearly Wash Optimization", expected.Type);
            Assert.AreEqual(2, expected.RecurrenceDayOfWeek);
            Assert.AreEqual(5, expected.LastJobs.Count);
            Assert.AreEqual(1, expected.Parameters.Count);
            Assert.AreEqual(1, expected.AssetList.Count);
            Assert.NotNull(expected.AssetList);
        }
    }
}
