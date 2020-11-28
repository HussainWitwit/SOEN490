using Interfaces.Repositories;
using Moq;
using NUnit.Framework;
using RecommendationEngine.Services;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngineTests
{
    public class UnimplementedUnitTests
    {
        private Mock<IDriveService> _drive;

        private Mock<IActionRepository> _actionRepo;
        private ActionService _actionService;

        private Mock<IAssetMetadataRepository> _assetMetadataRepo;
        private AssetMetadataService _assetMetadataService;

        private Mock<ICaseRepository> _caseRepo;
        private CaseService _caseService;

        private Mock<IEnergyMarketRepository> _energyMarketRepo;
        private EnergyMarketService _energyMarketService;

        private Mock<IEventRepository> _eventRepo;
        private EventService _eventService;

        private Mock<IRecommendationEngineRepository> _recommendationEngineRepo;
        private RecommendationEngineService _recommendationEngineService;

        private Mock<IRecommendationRunRepository> _recommendationRunRepo;
        private RecommendationRunService _recommendationRunService;

        private Mock<ITimeSeriesDataRepository> _timeSeriesDataRepo;
        private TimeSeriesDataService _timeSeriesDataService;

        private Mock<IWorkOrderRepository> _workOrderRepo;
        private WorkOrderService _workOrderService;

        [SetUp]
        public void Setup()
        {
            _drive = new Mock<IDriveService>();

            _actionRepo = new Mock<IActionRepository>();
            _actionService = new ActionService(_drive.Object, _actionRepo.Object);

            _assetMetadataRepo = new Mock<IAssetMetadataRepository>();
            _assetMetadataService = new AssetMetadataService(_drive.Object);

            _caseRepo = new Mock<ICaseRepository>();
            _caseService = new CaseService(_drive.Object);

            _energyMarketRepo = new Mock<IEnergyMarketRepository>();
            _energyMarketService = new EnergyMarketService(_drive.Object);

            _eventRepo = new Mock<IEventRepository>();
            _eventService = new EventService(_drive.Object);

            _recommendationEngineRepo = new Mock<IRecommendationEngineRepository>();
            _recommendationEngineService = new RecommendationEngineService(_drive.Object);

            _recommendationRunRepo = new Mock<IRecommendationRunRepository>();
            _recommendationRunService = new RecommendationRunService(_drive.Object);

            _timeSeriesDataRepo = new Mock<ITimeSeriesDataRepository>();
            _timeSeriesDataService = new TimeSeriesDataService(_drive.Object);

            _workOrderRepo = new Mock<IWorkOrderRepository>();
            _workOrderService = new WorkOrderService(_drive.Object);
        }

        [Test]
        public void Tests()
        {
            Assert.IsNotNull(_actionRepo.Object);
            Assert.IsNotNull(_actionService);

            Assert.IsNotNull(_assetMetadataRepo.Object);
            Assert.IsNotNull(_assetMetadataService);

            Assert.IsNotNull(_caseRepo.Object);
            Assert.IsNotNull(_caseService);

            Assert.IsNotNull(_energyMarketRepo.Object);
            Assert.IsNotNull(_energyMarketService);

            Assert.IsNotNull(_eventRepo.Object);
            Assert.IsNotNull(_eventService);

            Assert.IsNotNull(_recommendationEngineRepo.Object);
            Assert.IsNotNull(_recommendationEngineService);

            Assert.IsNotNull(_recommendationRunRepo.Object);
            Assert.IsNotNull(_recommendationRunService);

            Assert.IsNotNull(_timeSeriesDataRepo.Object);
            Assert.IsNotNull(_timeSeriesDataService);

            Assert.IsNotNull(_workOrderRepo.Object);
            Assert.IsNotNull(_workOrderService);
        }
    }
}
