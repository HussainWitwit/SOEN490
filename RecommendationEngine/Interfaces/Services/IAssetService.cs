using Models.Application.Asset;
using System.Threading.Tasks;

namespace Interfaces.Services
{

    public interface IAssetService
    {
        public Asset GetAssetsTreeview();
        public Asset GetAssetByName(string assetName);
        public Task Convert();
    }
}
