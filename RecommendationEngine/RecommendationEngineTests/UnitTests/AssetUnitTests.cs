using System.Collections.Generic;
using Interfaces.Repositories;
using Models.Application.Asset;
using Models.DB;
using Moq;
using NUnit.Framework;
using RecommendationEngine.Services;
using RecommendationEngine.Services.ExternalAPI;
using RecommendationEngineTests.UnitTests.MockData;

namespace RecommendationEngineTests
{
    public class AssetUnitTests
    {
        private Mock<IAssetRepository> _assetRepo;
        private Mock<IAssetTypeRepository> _assetTypeRepo;
        private Mock<IDriveService> _drive;
        private AssetService _assetService;

        [SetUp]
        public void Setup()
        {
            _assetRepo = new Mock<IAssetRepository>();
            _assetTypeRepo = new Mock<IAssetTypeRepository>();
            _drive = new Mock<IDriveService>();
            _assetService = new AssetService(_drive.Object, _assetRepo.Object, _assetTypeRepo.Object);
            List<DBAsset> dbAssets = MockAssets.BasicDBAssetList;
            _assetRepo.Setup(x => x.Get()).Returns(dbAssets);
        }

        [Test]
        public void GetAssetsTreeviewTest()
        {
            var assetComposite = _assetService.GetAssetsTreeview();

            //Assert
            Assert.IsInstanceOf(typeof(AssetComposite), assetComposite);
            Assert.NotNull(assetComposite);
            _assetRepo.Verify(x => x.Get(), Times.AtLeastOnce());
        }

        [Test]
        public void GetAssetByNameTest()
        {
            string assetName = "asset1";
            DBAsset dbAsset = MockAssets.BasicDBAsset;
            _assetRepo.Setup(x => x.GetAssetByName(assetName)).Returns(dbAsset);
            Asset asset = _assetService.GetAssetByName(assetName);
            Assert.NotNull(asset);
            Assert.AreEqual(asset.Id, 1);
        }
    }
}