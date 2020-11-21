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
    }
}
