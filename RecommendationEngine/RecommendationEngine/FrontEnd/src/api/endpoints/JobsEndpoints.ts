import { ConfiguredRecommendationJob, JobLog } from '../models/Job'
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"

export async function GetRecommendationJobList() : Promise<ConfiguredRecommendationJob[]> {
    let result: ConfiguredRecommendationJob[] = [];
    await fetch('api/job')
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
            err.code === 400 ? alert("The following errors were found\n" + mapErrorToErrorList(err)) : alert(err.content)
        })
    return result;
}
