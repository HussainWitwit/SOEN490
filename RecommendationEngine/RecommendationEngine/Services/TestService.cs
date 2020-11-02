using Interfaces.Repositories;
using Interfaces.Services;
using Interfaces.Services.ExternalApi;
using RecommendationEngine.Services.ExternalAPI;

namespace RecommendationEngine.Services
{
    public class TestService: ITestService
    {
        private IDriveService _driveService;
        private ITestRepository _testRepository;

        public TestService(IDriveService driveService, ITestRepository testRepository)
        {
            _driveService = driveService;
            _testRepository = testRepository;
        }

        public string[] GetSummaries()
        {
            return _testRepository.GetSummaries();
        }
    }
}