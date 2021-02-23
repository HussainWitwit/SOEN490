import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';
import { Asset } from "../models/Asset";

export async function GetNestedAssetList() : Promise<Asset | null> {
    let assetResult = null;
    await fetch('api/asset/nested')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            assetResult = res;
            return assetResult
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
    return assetResult;
}

export async function GetFlatAssetList() : Promise<Asset[]> {
    let assetResult: Asset[] = [];
    await fetch('api/asset')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            assetResult = res;
            return assetResult;
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
    return assetResult;
}

