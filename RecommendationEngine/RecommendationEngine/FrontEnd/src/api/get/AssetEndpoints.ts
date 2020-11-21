/**
 * This is the fetching method for the entity Asset.
 * All the controller logic in the backend shall be 
 * called and processed here. 
 * 
 * Note: Follow this structure for every controller from the 
 * back-end. Also, it needs to be strongly typed, i.e typescript.
 * A.J.U.U
 */

import { Asset } from "../../entities/Asset";
//TODO: unit test the fetch method (jest)
//TODO: Integration test as well
export const getAllAssets = async () =>{
    let assetResult: Asset;
    try {
        let response = await fetch('asset/get'); //Do not make a typing mistake in the api call
        const jsonResponse = await response.json();
        if(jsonResponse) {
            //Make sure the returned value is exactly equal to entity attribute
            assetResult = jsonResponse;
            return assetResult;
        }
        else{
            return [];
        }
    }catch(error) {
        return [];
    }
}
