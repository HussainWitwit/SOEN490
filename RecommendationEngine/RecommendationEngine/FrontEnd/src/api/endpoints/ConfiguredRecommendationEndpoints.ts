//TODO: unit test the fetch method (jest)
/**
 * I tried to implement a similar logic as the AssetEndpoints, but it was quite annoying. 
 * I believe we have to figure out the typescript issue first.
 */

import { ConfiguredRecommendation } from "../models/ConfiguredRecommendation";

export const GetConfiguredRecommendationList = async () => {

    let configuredRecommendations: ConfiguredRecommendation[];
    try {
        let response = await fetch('ConfiguredRecommendation');
        // let response = await fetch(endpoint);
        const jsonResponse = await response.json();
        if (jsonResponse) {
            configuredRecommendations = mapConfiguredRecommendations(jsonResponse);
            return configuredRecommendations;
        }
        else {
            return [];
        }
    }
    catch (error) {
        return [];
    }
}

export const GetConfiguredRecommendationById = async (id:number) => {
    let configuredRecommendations: ConfiguredRecommendation;
    try {
        let response = await fetch('ConfiguredRecommendation/' + id);
        const jsonResponse = await response.json();
        if (jsonResponse) {
            configuredRecommendations = mapConfiguredRecommendation(jsonResponse);
            return configuredRecommendations;
        }
        else {
            return {};
        }
    }
    catch (error) {
        return {};
    }
}

export const DeleteRecommendationById = async (id: number ) => {
    let response;
    try {
        response = await fetch('ConfiguredRecommendation/'+ id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
    }catch(error) {
        console.log(error);
    }
    return response;
  };

  //FIXME: Syntax Errror here
  export const PostConfiguredRecommendation = async (recommendation: ConfiguredRecommendation) => {
    let response;
    try {
        response = await fetch('ConfiguredRecommendation/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendation)
        })
    } catch (error) {
        console.log(error);
    }
    return response;
};

//FIXME: Syntax Errror here
export const EditConfiguredRecommendation = async (recommendation: ConfiguredRecommendation, id: number) => {
    console.log(recommendation);
    console.log(id);
    let response;
    try {
        response = await fetch('ConfiguredRecommendation/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendation)
        })
    } catch (error) {
        console.log(error);
    }
    return response;
};

/**
 * Maps a response to a configured recommendation
 * @param {*} response 
 */
const mapConfiguredRecommendation = function (response: any): ConfiguredRecommendation {
    //Make sure the returned value is exactly equal to entity attribute for the entity in question
    return {
        id: response.id,
        name: response.name,
        description: response.description,
        type: response.type,
        granularity: response.granularity,
        createdBy: response.createdBy,
        preferredScenario: response.preferredScenario,
        recurrenceDayOfWeek: response.recurrenceDayOfWeek,
        recurrenceDatetime: response.recurrenceDatetime,
        createdOn: response.createdOn,
        assetList: response.assetList,
        lastJobs: response.lastJobs,
        parameters: response.parameters
    };
}

/**
 * Maps a response to a list of configured recommendation
 * @param {*} response 
 */
const mapConfiguredRecommendations = function (response: any): ConfiguredRecommendation[] {
    //Make sure the returned value is exactly equal to entity attribute for the entity in question
    let result = response.map((element: any) => {
        return {
            id: element.id,
            name: element.name,
            type: element.type,
            granularity: element.granularity,
            createdBy: element.createdBy,
            recurrenceDayOfWeek: element.recurrenceDayOfWeek,
            recurrenceDatetime: element.recurrenceDatetime,
            createdOn: element.createdOn,
            assetList: element.assetList,
            parameters: element.parameters ? element.parameters.map((parameter: any) => {
                return {
                    parameterName: parameter.parameterName,
                    parameterValue: parameter.parameterValue,
                }
            }) : []
        };
    })
    return result;

}