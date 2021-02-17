
import { ConfiguredRecommendationResult } from '../models/JobResult';
import { ActionGrouping } from '../models/Action';
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"

export async function GetRecommendationResultList(): Promise<ConfiguredRecommendationResult[]> {
    let result: ConfiguredRecommendationResult[] = [];
    await fetch('api/result')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            result = res;
            return result;
        })
        .catch(err => {
            err.code === 400 ? alert("The following errors were found\n" + mapErrorToErrorList(err)) : alert(err.content)
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
            err.code === 400 ? alert("The following errors were found\n" + mapErrorToErrorList(err)) : alert(err.content)
        })
    return actions;
}