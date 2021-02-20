
import { ConfiguredRecommendationResult } from '../models/JobResult';
import { ActionGrouping } from '../models/Action';
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

export async function GetRecommendationResultList(): Promise<ConfiguredRecommendationResult[]> {
    let result: ConfiguredRecommendationResult[] = [];
    await fetch('api/result')
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

export async function GetActionsByResultId(id: number): Promise<ActionGrouping | null> {
    let actions = null;
    await fetch(`api/action/${id}`)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            actions = res;
            return actions
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
    return actions;
}