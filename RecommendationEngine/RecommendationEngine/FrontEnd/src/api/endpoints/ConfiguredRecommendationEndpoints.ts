import { ConfiguredRecommendation } from "../models/ConfiguredRecommendation";
import { handleErrors } from "../../utilities/ValidationUtilities"
import { notifyError } from "../../utilities/ErrorNotification"

export async function GetConfiguredRecommendationList(assetId: number | null) : Promise<ConfiguredRecommendation[]> {
    let configuredRecommendations: ConfiguredRecommendation[] = [];
    await fetch('api/ConfiguredRecommendation/filterByAsset/'+(assetId?assetId:''))
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            configuredRecommendations = res;
            return configuredRecommendations;
        })
        .catch(err => {
            notifyError(err)
        })
    return configuredRecommendations;
}

export async function GetConfiguredRecommendationById(id: number) : Promise<ConfiguredRecommendation | null> {
    let configuredRecommendations = null;
    await fetch('api/ConfiguredRecommendation/' + id)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            configuredRecommendations = res;
            return configuredRecommendations
        })
        .catch(err => {
            notifyError(err)
        })
    return configuredRecommendations;
}

export async function DeleteRecommendationById(id: number) : Promise<any> {
    let response;
    response = await fetch('api/ConfiguredRecommendation/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
    })
    .catch(err => {
        notifyError(err)
    })
    return response;
}

export const AddConfiguredRecommendation = async (recommendation: ConfiguredRecommendation): Promise<any> => {
    let response;
    response = await fetch('api/ConfiguredRecommendation/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recommendation)
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
    })
    .catch(err => {
        notifyError(err)
    })
    return response
};

export async function EditConfiguredRecommendation(recommendation: ConfiguredRecommendation, id: number) : Promise<any> {
    let response;
    response = await fetch('api/ConfiguredRecommendation/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recommendation)
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
    })
    .catch(err => {
        notifyError(err)
    })
    return response
}

export async function ForceRunConfiguredRecommendation(id: number) : Promise<any> {
    let response;
    response = await fetch('api/scheduler/'+ id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
    })
    .catch(err => {
        notifyError(err)
    })
    return response;
}