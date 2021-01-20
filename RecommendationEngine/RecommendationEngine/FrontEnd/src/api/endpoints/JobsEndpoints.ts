
import { ConfiguredRecommendationJob } from '../models/Job'

export const getRecommendationJobList = async () => {
    let result;
    try {
        let response = await fetch('api/jobs/');
        const jsonResponse = response.json();
        if (jsonResponse) {
            result = AssignResponse(jsonResponse)
            return result;
        }
        else {
            return []
        }
    } catch (e) {
        console.log(e);
    }
}

const AssignResponse = function (response: any): ConfiguredRecommendationJob {
    return {
        id: response.id,
        duration: response.duration,
        configuredRecommendationId: response.configuredRecommendationId,
        status: response.status,
        timestamp: response.timestamp
    };
}