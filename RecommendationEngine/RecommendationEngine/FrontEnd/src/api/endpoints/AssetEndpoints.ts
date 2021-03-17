import { handleErrors } from "../../utilities/ValidationUtilities"
import { notifyError } from "../../utilities/ErrorNotification"
import { Asset } from "../models/Asset";

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
            notifyError(err)
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
            notifyError(err)
        })
    return assetResult;
}

