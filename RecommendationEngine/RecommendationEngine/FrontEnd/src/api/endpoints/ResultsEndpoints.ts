
import { ConfiguredRecommendationResult } from '../models/JobResult';
import { ActionGrouping } from '../models/Action';
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

export async function GetRecommendationResultList(assetId: number | null): Promise<ConfiguredRecommendationResult[]> {
    let result: ConfiguredRecommendationResult[] = [];
    await fetch('api/result/filterByAsset/'+(assetId?assetId:''))
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            result = res;
            return result;
        })
        .catch(err => {
            if (err.code == 400) {
                mapErrorToErrorList(err).map((msg: any) => {
                    toast.error(msg, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
            } else {
                toast.error(err.content, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
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
            if (err.code == 400) {
                mapErrorToErrorList(err).map((msg: any) => {
                    toast.error(msg, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
            } else {
                toast.error(err.content, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
    return actions;
}