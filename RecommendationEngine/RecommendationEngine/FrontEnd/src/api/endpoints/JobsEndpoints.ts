import { ConfiguredRecommendationJob, JobLog } from '../models/Job'
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

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
            var message = err.code == 400 ? 'The following errors were found' + mapErrorToErrorList(err) : err.content;
            toast.error(message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            var message = err.code == 400 ? 'The following errors were found' + mapErrorToErrorList(err) : err.content;
            toast.error(message, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    return result;
}
