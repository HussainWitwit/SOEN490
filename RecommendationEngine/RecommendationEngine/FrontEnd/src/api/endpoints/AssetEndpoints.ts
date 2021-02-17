import { Asset } from "../models/Asset";
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"

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
            console.log(err)
            err.code === 400 ? alert("The following errors were found\n" + mapErrorToErrorList(err)) : alert(err.content)
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
            err.code === 400 ? alert("The following errors were found\n" + mapErrorToErrorList(err)) : alert(err.content)
        })
    return assetResult;
}
