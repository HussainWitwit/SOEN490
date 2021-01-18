/**
 * This is the fetching method for the entity Asset.
 * All the controller logic in the backend shall be 
 * called and processed here. 
 * 
 * Note: Follow this structure for every controller from the 
 * back-end. Also, it needs to be strongly typed, i.e typescript.
 * A.J.U.U
 * TODO: unit test the fetch method (jest)
 */

import { Asset } from "../models/Asset";

export const GetNestedAssetList = async () => {
    let assetResult: Asset;
    try {
        let response = await fetch('api/asset/nested'); //Do not make a typing mistake in the api call
        const jsonResponse = await response.json();
        if(jsonResponse) {
            //Make sure the returned value is exactly equal to entity attribute
            assetResult = AssignResponse(jsonResponse);
            return assetResult;
        }
        else{
            return [];
        }
    }catch(error) {
        console.log(error);
        return [];
    }
}

export const GetFlatAssetList = async () => {
    let assetResult: Asset;
    try {
        let response = await fetch('api/asset'); //Do not make a typing mistake in the api call
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
        console.log(error);
        return [];
    }
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