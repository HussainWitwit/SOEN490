using System.Collections.Generic;
using System.Threading.Tasks;
using Models.Application.Asset;
using Models.DB;

namespace Interfaces.Services
{

    public interface IAssetService
    {
        public Asset GetAssetsTreeview();
        public Asset GetAssetByName(string assetName);
        public void Convert();
    }
}
