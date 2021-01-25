
import { ConfiguredRecommendationResult } from '../models/JobResult';

export const GetRecommendationResultList = async () => {
    let result;
    try {
        let response = await fetch('api/result');
        const jsonResponse = await response.json();
        if (jsonResponse) {
            result = AssignResponse(jsonResponse);
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

const AssignResponse = function (response: any): ConfiguredRecommendationResult[] {

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