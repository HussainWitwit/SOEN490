/**
 * This is the fetching method for the entity Asset.
 * All the controller logic in the backend shall be 
 * called and processed here. 
 * 
 * Note: Follow this structure for every controller from the 
 * back-end. Also, it needs to be strongly typed, i.e typescript.
 * A.J.U.U
 * TODO: unit test the fetch method (jest)
 * TODO: Integration test as well
 */

import { Asset } from "../../models/Asset";

export const AssetClient = async (endpoint: string) => {
    let assetResult: Asset;
    let flatListOfAssets: Asset[];
    try {
        // let response = await fetch('asset/getAssetsNested'); //Do not make a typing mistake in the api call
        let response = await fetch(endpoint); //Do not make a typing mistake in the api call
        const jsonResponse = await response.json();
        if(jsonResponse && endpoint.includes('Nested')) {
            //Make sure the returned value is exactly equal to entity attribute
            assetResult = AssignResponse(jsonResponse);
            return assetResult;
        }
        else if(jsonResponse && endpoint.includes('List')){
            flatListOfAssets = jsonResponse;
            return flatListOfAssets;
        }
        else{
            return [];
        }
    }catch(error) {
        console.log(error);
        return [];
    }
}

AssetClient.get = (endpoint: string) => {
    return AssetClient(endpoint);
}

/**
 * 
 * @param {*} response 
 */
const AssignResponse = function(response:any): Asset {
    //Make sure the returned value is exactly equal to entity attribute for the entity in question
    return {
      id: response.id.toString(),
      name: response.name,
      displayText: response.displayText,
      energyType: response.EnergyType,
      timeZone: response.TimeZone,
      elementPath: response.ElementPath,
      acPower: response.AcPower,
      children : response.children ? response.children.map((child: any) => {
          return AssignResponse(child)  
      })  : []
    };
}