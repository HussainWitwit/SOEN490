
import { ConfiguredRecommendationJob, JobLog } from '../models/Job'

export const GetRecommendationJobList = async () => {
    let result;
    try {
        let response = await fetch('api/job');
        const jsonResponse = await response.json();
        if (jsonResponse) {
            result = AssignJobResponse(jsonResponse)
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

export const GetJobLogList = async (id: number) => {
    let result: JobLog[] = [];
    try {
        await fetch('api/job/log/'+id)
        .then((response) => response.json())
        .then((responseJSON) => {
            result = responseJSON;
        });
        return result;
    } catch (e) {
        console.log('Error fetching job logs!')
        console.log(e);
    }
}

const AssignJobResponse = function (response: any): ConfiguredRecommendationJob[] {

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
