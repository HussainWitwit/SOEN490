import { Asset } from "../models/Asset";

export async function GetNestedAssetList() : Promise<Asset | null> {
    let assetResult: Asset;
    try {
        let response = await fetch('api/asset/nested'); 
        const jsonResponse = await response.json();
        if(jsonResponse) {
            assetResult = jsonResponse;
            return assetResult;
        }
    }catch(error) {
        console.log('Error while fetching assets!')
        console.log(error);
    }
    return null;
}

export async function GetFlatAssetList() : Promise<Asset[]> {
    let assetResult: Asset[] = [];
    try {
        let response = await fetch('api/asset'); 
        const jsonResponse = await response.json();
        if(jsonResponse) {
            assetResult = jsonResponse;
            return assetResult;
        }
    }catch(error) {
        console.log('Error while fetching assets!')
        console.log(error);
    }
    return assetResult;
}
