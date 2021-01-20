
import { ConfiguredRecommendationResult } from '../models/JobResult';

export const getRecommendationResultList = async () => {
    let result;
    try {
        let response = await fetch('api/results/');
        const jsonResponse = response.json();
        if (jsonResponse) {
            result = AssignResponse(jsonResponse);
            return result;
        }
        else {
            return []
        }
    } catch (e) {
        console.log(e);
    }
}

const AssignResponse = function (response: any): ConfiguredRecommendationResult {
    return {
        id: response.id,
        configuredRecommendationId: response.configuredRecommendationId,
        netSaving: response.netSaving,
        returnOnInvestment: response.returnOnInvestment,
        costOfAction: response.costOfAction,
        costOfInaction: response.costOfInaction
    };
}