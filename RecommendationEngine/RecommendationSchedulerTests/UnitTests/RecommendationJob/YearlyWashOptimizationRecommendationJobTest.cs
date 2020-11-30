using Interfaces.Repositories;
using Interfaces.Services.ExternalAPI;
using Interfaces.Utilities;
using Models.DB;
using Moq;
using NUnit.Framework;
using Quartz;
using RecommendationScheduler.RecommendationJob;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecommendationSchedulerTests.UnitTests.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJobTest
    {
        private Mock<IRecommendationJobLogger> _loggerMock;
        private Mock<IRecommendationSchedulerRepository> _recommendationSchedulerRepoMock;
        private Mock<IJobExecutionContext> _contextMock;
        private YearlyWashOptimizationRecommendationJob _yearlyWashOptimizationRecommendationJob;
        private IDriveService _driveService;

        [SetUp]
        public void Setup()
        {
            _loggerMock = new Mock<IRecommendationJobLogger>();
            _recommendationSchedulerRepoMock = new Mock<IRecommendationSchedulerRepository>();
            _contextMock = new Mock<IJobExecutionContext>();

            _yearlyWashOptimizationRecommendationJob = new YearlyWashOptimizationRecommendationJob(_loggerMock.Object, _recommendationSchedulerRepoMock.Object, _driveService);
        }

        [Test]
        public void TestExecute()
        {
            //Arrange
            _loggerMock.Setup(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()));
            _recommendationSchedulerRepoMock.Setup(x => x.UpdateRecommendationJobStatus(It.IsAny<int>(), It.IsAny<string>()));
            _recommendationSchedulerRepoMock.Setup(x => x.UpdateRecommendationJobStatus(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<int>()));
            _recommendationSchedulerRepoMock.Setup(x => x.GetDbRecommendationScheduleById(It.IsAny<int>())).Returns(
                new DBRecommendationSchedule
                {
                    RecommendationScheduleId = 1,
                    AssetsList = new List<DBAssetRecommendationSchedule>(),
                }
            );
            _recommendationSchedulerRepoMock.Setup(x => x.AddRecommendationJob(It.IsAny<DBRecommendationJob>())).Returns(new DBRecommendationJob
            {
                RecommendationJobId = 1
            });

            //Act
            Task task = _yearlyWashOptimizationRecommendationJob.Execute(null);
            //Assert
            _recommendationSchedulerRepoMock.Verify(x => x.UpdateRecommendationJobStatus(It.IsAny<int>(), It.IsAny<string>()), Times.Never);
            _recommendationSchedulerRepoMock.Verify(x => x.UpdateRecommendationJobStatus(It.IsAny<int>(), It.IsAny<string>(), It.IsAny<int>()), Times.AtLeastOnce);
            _recommendationSchedulerRepoMock.Verify(x => x.GetDbRecommendationScheduleById(It.IsAny<int>()), Times.Once);
            _loggerMock.Verify(x => x.LogInformation(It.IsAny<DBRecommendationJob>(), It.IsAny<string>()), Times.AtLeastOnce);
            _recommendationSchedulerRepoMock.Verify(x => x.AddRecommendationJob(It.IsAny<DBRecommendationJob>()), Times.Once());
            Assert.AreEqual(task, Task.CompletedTask);
        }

    }
}