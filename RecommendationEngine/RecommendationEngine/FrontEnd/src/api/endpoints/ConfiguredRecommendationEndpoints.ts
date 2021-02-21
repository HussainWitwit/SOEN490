import { ConfiguredRecommendation } from "../models/ConfiguredRecommendation";
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

export async function GetConfiguredRecommendationList() : Promise<ConfiguredRecommendation[]> {
    let configuredRecommendations: ConfiguredRecommendation[] = [];
    await fetch('api/ConfiguredRecommendation')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            configuredRecommendations = res;
            return configuredRecommendations;
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
    return configuredRecommendations;
}

export async function GetConfiguredRecommendationById(id: number) : Promise<ConfiguredRecommendation | null> {
    let configuredRecommendations = null;
    await fetch('api/ConfiguredRecommendation/' + id)
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            configuredRecommendations = res;
            return configuredRecommendations
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
    return configuredRecommendations;
}

export async function DeleteRecommendationById(id: number) : Promise<any> {
    let response;
    response = await fetch('api/ConfiguredRecommendation/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
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
    return response;
}

export const AddConfiguredRecommendation = async (recommendation: ConfiguredRecommendation): Promise<any> => {
    let response;
    response = await fetch('api/ConfiguredRecommendation/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recommendation)
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
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
    return response
};

export async function EditConfiguredRecommendation(recommendation: ConfiguredRecommendation, id: number) : Promise<any> {
    let response;
    response = await fetch('api/ConfiguredRecommendation/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recommendation)
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
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
    return response
}

export async function ForceRunConfiguredRecommendation(id: number) : Promise<any> {
    let response;
    response = await fetch('api/scheduler/'+ id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => handleErrors(res))
    .then(res => {
        response = res;
        return response;
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
    return response;
}