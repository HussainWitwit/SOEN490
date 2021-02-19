using System;
using System.Collections.Generic;
using System.Linq;
using Interfaces.RecommendationScheduler;
using Interfaces.Repositories;
using Models.Application;
using Models.DB;
using Moq;
using NUnit.Framework;
using RecommendationEngine.ExceptionHandler;
using RecommendationEngine.Services;
using RecommendationEngineTests.UnitTests.MockData;

namespace RecommendationEngineTests.UnitTests
{
    public class ConfiguredRecommendationServiceTest
    {
        private ConfiguredRecommendationService _configuredRecommendationService;
        private Mock<IConfiguredRecommendationRepository> _repository;
        private Mock<IAssetRepository> _assetRepository;
        private Mock<IRecommendationScheduler> _scheduler;

        [SetUp]
        public void Setup()
        {
            _repository = new Mock<IConfiguredRecommendationRepository>();
            _assetRepository = new Mock<IAssetRepository>();
            _scheduler = new Mock<IRecommendationScheduler>();
            _configuredRecommendationService = new ConfiguredRecommendationService(_repository.Object, _assetRepository.Object, _scheduler.Object);
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
            List<DBRecommendationParameter> parameters = MockConfiguredRecommendations.BASIC_PARAMETER_LIST.Select(x=>x.RecommendationParameter).ToList();

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _repository.Setup(x => x.GetParametersForSchedule(It.IsAny<DBRecommendationSchedule>()))
                .Returns(parameters);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));
            _repository.Setup(x => x.Add(afterConversion));
            _configuredRecommendationService.AddConfiguredRecommendation(beforeConversion);
        }

        [Test]
        public void EditRecommendationTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation uneditedRec = MockConfiguredRecommendations.UNEDITED_CONFIGURED_RECOMMENDATION;
            ConfiguredRecommendation editedConfigureRec = MockConfiguredRecommendations.EDITED_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule uneditedDBRec = MockConfiguredRecommendations.UNEDITED_DB_RECOMMENDATION;
            DBRecommendationSchedule editedDBRec = MockConfiguredRecommendations.EDITED_DB_RECOMMENDATION;

            _repository.Setup(x => x.GetRecommendationScheduleList()).Returns(new List<DBRecommendationSchedule> { uneditedDBRec, editedDBRec });
            _repository.Setup(x => x.GetRecommendationTypeByType(uneditedRec.Type)).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _repository.Setup(x => x.Edit(uneditedDBRec, 1)).Returns(editedDBRec);

            ConfiguredRecommendation actual = _configuredRecommendationService.EditConfiguredRecommendation(editedConfigureRec, 44);
            Assert.AreEqual(editedConfigureRec, actual);
        }

        [Test]
        public void DeleteRecommendationTest()
        {
            List<DBRecommendationSchedule> recommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION_LIST;
            int recommentionId = 2;

            _repository.Setup(x => x.Delete(recommentionId));
            _repository.Setup(x => x.GetRecommendationScheduleList()).Returns(new List<DBRecommendationSchedule>() { recommendation[0] });
            _configuredRecommendationService.DeleteConfiguredRecommendation(recommentionId);

            List<ConfiguredRecommendation> actual = _configuredRecommendationService.GetConfiguredRecommendationList();
            Assert.AreEqual(1, actual.Count);
            Assert.AreEqual(1, actual[0].Id);
        }

        [Test]
        public void EmptyRecommendationTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation emptyRecommendationType = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule afterConversion = MockConfiguredRecommendations.CONVERTED_CONFIGURED_RECOMMENDATION;
            emptyRecommendationType.Name = "";
            emptyRecommendationType.PreferredScenario = "";

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));

            Assert.Throws<RequestValidationException>(() => _configuredRecommendationService.AddConfiguredRecommendation(emptyRecommendationType));
        }

        [Test]
        public void BadDayOfWeekTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule afterConversion = MockConfiguredRecommendations.CONVERTED_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.RecurrenceDayOfWeek = 10;

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));

            Assert.Throws<RequestValidationException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
        }

        [Test]
        public void BadDateTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule afterConversion = MockConfiguredRecommendations.CONVERTED_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.RecurrenceDatetime = new DateTime(2000, 01, 01);

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));

            Assert.Throws<RequestValidationException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
        }

        [Test]
        public void BadScenarioTest()
        {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule afterConversion = MockConfiguredRecommendations.CONVERTED_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.PreferredScenario = "ROIy";

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));

            Assert.Throws<RequestValidationException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
        }

        [Test]
        public void EmptyAssetListTest() {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            DBRecommendationSchedule afterConversion = MockConfiguredRecommendations.CONVERTED_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.AssetIdList.Clear();

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));

            Assert.Throws<RequestValidationException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
        }

        [Test]
        public void DuplicateAssetListTest() {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.AssetIdList.Add(configuredRecommendation.AssetIdList[0]);

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));

            Assert.Throws<RequestValidationException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
        }

        [Test]
        public void ParameterRepositoryNotAvailableTest() {
            DBRecommendationType recommendationType = MockConfiguredRecommendations.YEARLY_RECOMMENDATION_TYPE;
            ConfiguredRecommendation configuredRecommendation = MockConfiguredRecommendations.BASIC_CONFIGURED_RECOMMENDATION;
            configuredRecommendation.Name = "RENEW01_2070";

            _repository.Setup(x => x.GetRecommendationTypeByType("Yearly Wash Optimization")).Returns(recommendationType);
            _assetRepository.Setup(x => x.GetAssetById(44)).Returns(MockAssets.DBAsset);
            _scheduler.Setup(x => x.ScheduleJobAsync(It.IsAny<DBRecommendationSchedule>()));

            Assert.Throws<InternalServerException>(() => _configuredRecommendationService.AddConfiguredRecommendation(configuredRecommendation));
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
