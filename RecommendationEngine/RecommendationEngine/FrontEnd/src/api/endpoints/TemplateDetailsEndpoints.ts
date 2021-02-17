import { TemplateDetails } from "../models/TemplateDetails";
import { handleErrors, mapErrorToErrorList } from "../../utilities/ValidationUtilities"

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
            err.code === 400 ? alert("The following errors were found\n" + mapErrorToErrorList(err)) : alert(err.content)
        })
    return templates;
}