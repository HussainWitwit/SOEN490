import { ConfiguredRecommendationJob, JobLog } from '../models/Job'
import { handleErrors } from "../../utilities/ValidationUtilities"
import { notifyError } from "../../utilities/ErrorNotification"

export async function GetRecommendationJobList(assetId: number | null) : Promise<ConfiguredRecommendationJob[]> {
    let result: ConfiguredRecommendationJob[] = [];
    await fetch('api/job/filterByAsset/'+(assetId?assetId:''))
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

export async function GetJobLogList(id: number) : Promise<JobLog[]> {
    let result: JobLog[] = [];
    await fetch('api/job/log/'+id)
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
