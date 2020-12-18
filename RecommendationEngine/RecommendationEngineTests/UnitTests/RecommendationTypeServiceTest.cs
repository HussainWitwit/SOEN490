using System;
using Moq;
using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;
using NUnit.Framework;
using RecommendationEngine.Services;
using Models.Recommendation;
using System.Collections.Generic;
using RecommendationEngineTests.UnitTests.MockData;
using Models.DB;

namespace RecommendationEngineTests.UnitTests
{
    public class RecommendationTypeServiceTest
    {
        private RecommendationTypeService _recommendationTypeService;
        private Mock<IRecommendationTypeRepository> _repository;
        private Mock<IDriveService> _driveService;

        [SetUp]
        public void Setup()
        {
            _repository = new Mock<IRecommendationTypeRepository>();
            _driveService = new Mock<IDriveService>();
            _recommendationTypeService = new RecommendationTypeService(_driveService.Object, _repository.Object);
        }

        [Test]
        public void GetRecommendationTypes() {
            List<DBRecommendationType> mockRecommendationTypes = MockRecommendationType.BASIC_CONFIGURED_RECOMMENDATION_TYPE;
            _repository.Setup(x => x.GetRecommendationTypes()).Returns(mockRecommendationTypes);

            List<ConfiguredRecommendationType> expected = _recommendationTypeService.GetRecommendationTypes();
            Assert.AreEqual(mockRecommendationTypes[0].Description, expected[0].TemplateDescription);
            Assert.AreEqual(mockRecommendationTypes[0].DisplayText, expected[0].TemplateName);
            Assert.AreEqual(mockRecommendationTypes.Count, expected.Count);
        }
    }
}
