
import { ConfiguredRecommendationResult } from '../models/JobResult';
import { ActionGrouping } from '../models/Action';
import { handleErrors } from "../../utilities/ValidationUtilities"
import { notifyError } from "../../utilities/ErrorNotification"

export async function GetRecommendationResultList(assetId: number | null): Promise<ConfiguredRecommendationResult[]> {
    let result: ConfiguredRecommendationResult[] = [];
    await fetch('api/result/filterByAsset/'+(assetId?assetId:''))
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            result = res;
            return result;
        })
        .catch(err => {
            notifyError(err)
        })
    return result;
}

export async function GetActionsByResultId(id: number): Promise<ActionGrouping | null> {
    let actions = null;
    await fetch(`api/action/${id}`)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            actions = res;
            return actions
        })
        .catch(err => {
            notifyError(err)
        })
    return actions;
}