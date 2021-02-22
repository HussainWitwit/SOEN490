import { TemplateDetails } from "../models/TemplateDetails";
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"
import { toast } from 'react-toastify';

export async function GetTemplateDetailsInfo() : Promise<TemplateDetails[]> {
    let templates: TemplateDetails[] = [];
    await fetch ('api/RecommendationType')
        .then(res => handleErrors(res))
        .then(res => res.json())
        .then(res => {
            templates = res;
            return templates;
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
    return templates;
}