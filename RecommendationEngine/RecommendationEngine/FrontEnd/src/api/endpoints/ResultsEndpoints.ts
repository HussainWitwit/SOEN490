
import { ConfiguredRecommendationResult } from '../models/JobResult';
import { Action } from '../models/Action';

export const GetRecommendationResultList = async () => {
    let result;
    try {
        let response = await fetch('api/result');
        const jsonResponse = await response.json();
        if (jsonResponse) {
            result = AssignResultResponse(jsonResponse);
            return result;
        }
        else {
            return []
        }
    } catch (e) {
        console.log('Error fetching results!')
        console.log(e);
    }
}

export const GetActionsByResultId = async (id: number) => {
    let actions;
    try {
        let response = await fetch(`api/actions/${id}`);
        const jsonResponse = await response.json();
        if (jsonResponse) {
            actions = AssignActionResponse(jsonResponse);
            return actions;
        }
        else {
            return []
        }
    } catch (e) {
        console.log('Error fetching actions!');
        console.log(e);
    }
}

const AssignResultResponse = function (response: any): ConfiguredRecommendationResult[] {

    let result = response.map((element: any) => {
        return {
            id: element.id,
            configuredRecommendationId: element.configuredRecommendationId,
            netSaving: element.netSaving,
            returnOnInvestment: element.returnOnInvestment,
            costOfAction: element.costOfAction,
            costOfInaction: element.costOfInaction
        };
    });
    return result;
}

const AssignActionResponse = function (response: any): Action[] {
    let actions = response.map((element: any) => {
        return {
            id: element.id,
            configuredRecommendationId: element.configuredRecommendationId,
            title: element.title,
            resultTimestamp: element.resultTimestamp,
            timestamp: element.timestamp,
            resultId: element.resultId
        };
    });
    return actions;
}