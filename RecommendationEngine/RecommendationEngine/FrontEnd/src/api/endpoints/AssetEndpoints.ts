import { Asset } from "../models/Asset";
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

export async function GetNestedAssetList() : Promise<Asset | null> {
    let assetResult = null;
    await fetch('api/asset/nested')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            assetResult = res;
            return assetResult
        })
        .catch(err => {
            var message = err.code == 400 ? 'The following errors were found' + mapErrorToErrorList(err) : err.content;
            toast.error(message, {
                toastId: 1,
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    return assetResult;
}

export async function GetFlatAssetList() : Promise<Asset[]> {
    let assetResult: Asset[] = [];
    await fetch('api/asset')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            assetResult = res;
            return assetResult;
        })
        .catch(err => {
            if(!toast.isActive(1)){
                var message = err.code == 400 ? 'The following errors were found' + mapErrorToErrorList(err) : err.content;
                toast.error(message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    return assetResult;
}
