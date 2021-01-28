
import { ConfiguredRecommendationJob, JobLog } from '../models/Job'

export async function GetRecommendationJobList() : Promise<ConfiguredRecommendationJob[]> {
    let result: ConfiguredRecommendationJob[] = [];
    try {
        let response = await fetch('api/job');
        const jsonResponse = await response.json();
        if (jsonResponse) {
            result = jsonResponse;
            return result;
        }
    } catch (e) {
        console.log('Error fetching jobs!')
        console.log(e);
    }
    return result;
}

export async function GetJobLogList(id: number) : Promise<JobLog[]> {
    let result: JobLog[] = [];
    try {
        await fetch('api/job/log/'+id)
        .then((response) => response.json())
        .then((responseJSON) => {
            result = responseJSON;
        });
    } catch (e) {
        console.log('Error fetching job logs!')
        console.log(e);
    }
    return result;
}
