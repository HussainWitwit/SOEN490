import { ConfiguredRecommendation } from "../models/ConfiguredRecommendation";

export async function GetConfiguredRecommendationList() : Promise<ConfiguredRecommendation[]> {

    let configuredRecommendations: ConfiguredRecommendation[] = [];
    try {
        let response = await fetch('api/ConfiguredRecommendation');
        const jsonResponse = await response.json();
        if (jsonResponse) {
            configuredRecommendations = jsonResponse;
            return configuredRecommendations;
        }
    }
    catch (error) {
        console.log('Error while fetching configured recommendations!');
        console.log(error);
    }
    return configuredRecommendations;
}

export async function GetConfiguredRecommendationById(id: number) : Promise<ConfiguredRecommendation | null> {
    let configuredRecommendations: ConfiguredRecommendation;
    try {
        let response = await fetch('api/ConfiguredRecommendation/' + id);
        const jsonResponse = await response.json();
        if (jsonResponse) {
            configuredRecommendations = jsonResponse;
            return configuredRecommendations;
        }
    }
    catch (error) {
        console.log('Error while fetching a specific (id) configured recommendation!');
        console.log(error);
    }
    return null;
}

export async function DeleteRecommendationById(id: number) : Promise<any> {
    let response;
    try {
        response = await fetch('api/ConfiguredRecommendation/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.log('Error while deleting a configured recommendation!');
        console.log(error);
    }
    return response;
};

export const AddConfiguredRecommendation = async (recommendation: ConfiguredRecommendation): Promise<any> => {
    let response;
    try {
        response = await fetch('api/ConfiguredRecommendation/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendation)
        })
        if (response.status >= 400 && response.status < 600) {
            let error = await response.json();
            throw {appName: error.appName, errorList: error.errorList}
        }
    } catch(err) {
        throw err
    }
    return response
};

export async function EditConfiguredRecommendation(recommendation: ConfiguredRecommendation, id: number) : Promise<any> {
    let response;
    try {
        response = await fetch('api/ConfiguredRecommendation/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendation)
        })
    } catch (error) {
        console.log('Error while fetching editing a configured recommendation!');
        console.log(error);
    }
    return response;
};

export const ForceRunConfiguredRecommendation = (id: number) => {
    try {
        fetch('api/scheduler/'+id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (e) {
        console.log('Error manually triggering configured recommendation!')
        console.log(e);
    }
}


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
