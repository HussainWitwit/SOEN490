import { TemplateDetails } from "../models/TemplateDetails";
import { handleErrors } from "../../utilities/ValidationUtilities"
import { notifyError } from "../../utilities/ErrorNotification"

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
            notifyError(err)
        })
    return templates;
}