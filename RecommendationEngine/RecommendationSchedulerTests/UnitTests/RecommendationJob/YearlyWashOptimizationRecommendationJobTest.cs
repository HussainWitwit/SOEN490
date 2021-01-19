using Interfaces.Repositories;
using Interfaces.Utilities;
using Models.DB;
using Moq;
using NUnit.Framework;
using Quartz;
using RecommendationScheduler.RecommendationJob;
using System.Collections.Generic;
using System.Threading.Tasks;
using Interfaces.Services.ExternalApi;
using Models.Application.Asset;
using System.Data.Common;

namespace RecommendationSchedulerTests.UnitTests.RecommendationJob
{
    public class YearlyWashOptimizationRecommendationJobTest
    {
        private Mock<IRecommendationJobLogger> _loggerMock;
        private Mock<IRecommendationSchedulerRepository> _recommendationSchedulerRepoMock;
        private Mock<IJobExecutionContext> _contextMock;
        private YearlyWashOptimizationRecommendationJob _yearlyWashOptimizationRecommendationJob;
        private Mock<IMetadataDriveService> _driveService;

        [SetUp]
        public void Setup()
        {
            _loggerMock = new Mock<IRecommendationJobLogger>();
            _recommendationSchedulerRepoMock = new Mock<IRecommendationSchedulerRepository>();
            _contextMock = new Mock<IJobExecutionContext>();
            _driveService = new Mock<IMetadataDriveService>();

            _yearlyWashOptimizationRecommendationJob = new YearlyWashOptimizationRecommendationJob(_loggerMock.Object, _recommendationSchedulerRepoMock.Object, _driveService.Object);
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
                    RecommendationScheduleId = 2,
                    AssetsList = new List<DBAssetRecommendationSchedule>(),
                }
            );

            DBAsset asset = new DBAsset
            {
                AssetId = 9,
                Name = "testAsset"
            };

            List<DBRecommendationScheduleParameter> dbParameterList = new List<DBRecommendationScheduleParameter> {

                new DBRecommendationScheduleParameter { DisplayText = "center point increment", ParamValue = 3},
                new DBRecommendationScheduleParameter { DisplayText = "span increment", ParamValue = 3},
                new DBRecommendationScheduleParameter { DisplayText = "soiling season buffer", ParamValue = 3},
                new DBRecommendationScheduleParameter { DisplayText = "accelerator", ParamValue = 3},

            };

            _recommendationSchedulerRepoMock.Setup(x => x.AddRecommendationJob(It.IsAny<DBRecommendationJob>())).Returns(new DBRecommendationJob
            {
                RecommendationJobId = 3,
                Asset = asset,
                Schedule = new DBRecommendationSchedule
                {
                    RecommendationScheduleId = 13,
                    AssetsList = new List<DBAssetRecommendationSchedule> {
                        new DBAssetRecommendationSchedule {
                            AssetId = 99,
                            Asset = asset
                            } },
                    ParametersList = dbParameterList
                }
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