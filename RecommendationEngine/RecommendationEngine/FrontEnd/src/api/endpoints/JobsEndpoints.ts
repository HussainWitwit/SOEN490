
import { ConfiguredRecommendationJob } from '../models/Job'

export const GetRecommendationJobList = async () => {
    let result;
    try {
        let response = await fetch('api/job');
        const jsonResponse = await response.json();
        if (jsonResponse) {
            result = AssignResponse(jsonResponse)
            return result;
        }
        else {
            return []
        }
    } catch (e) {
        console.log('Error fetching jobs!')
        console.log(e);
    }
}

const AssignResponse = function (response: any): ConfiguredRecommendationJob[] {

    let result = response.map((element: any) => {
        return {
            id: element.id,
            duration: element.duration,
            configuredRecommendationTitle: element.configuredRecommendationTitle,
            status: element.status,
            timestamp: element.timestamp
        };
    });
    return result;
}