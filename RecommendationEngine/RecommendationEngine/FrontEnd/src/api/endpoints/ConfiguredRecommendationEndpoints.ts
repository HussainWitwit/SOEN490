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


export async function AddConfiguredRecommendation(recommendation: ConfiguredRecommendation) : Promise<any> {
    let response;
    try {
        response = await fetch('api/ConfiguredRecommendation/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recommendation)
        })
    } catch (error) {
        console.log('Error while fetching adding a configured recommendation!');
        console.log(error);
    }
    return response;
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

