using Interfaces.Repositories;
using Moq;
using NUnit.Framework;
using RecommendationEngine.Services;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngineTests
{
    public class TestUnitTests
    {
        private Mock<ITestRepository> _repo;
        private Mock<IDriveService> _drive;
        private TestService _testService;
        [SetUp]
        public void Setup()
        {
            _repo = new Mock<ITestRepository>();
            _drive = new Mock<IDriveService>();
            _testService = new TestService(_drive.Object, _repo.Object);
        }

        [Test]
        public void BasicTestController()
        {
            //Arrange
            _repo.Setup(x => x.GetSummaries()).Returns(new string[] {"hey","there"});

            var results = _testService.GetSummaries();

            //Assert
            Assert.True(results.Length>1);
            _repo.Verify(x=> x.GetSummaries(), Times.AtLeastOnce());
        }
    }
}