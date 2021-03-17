import { Parameter } from "../api/models/TemplateDetails";
import { checkDateRange } from "./GeneralUtilities";

/* istanbul ignore next */
export async function handleErrors(res:Response) {
    var errorRes:any = {};
    if (!res.ok) {
        if(res.status == 400){
            errorRes.content = await res.json();
        }
        else{
            errorRes.content =  await res.text();
        }
        errorRes.code = res.status;
        throw errorRes;
    }
    return res;
}

export function mapErrorToErrorList(err: any) {
    let errorList = err.content.errorList.map((error: any) => error.errorMessage);
    return errorList
}

export const validateParameters = (template: Parameter[]) => {
    var errorInParameters = false;
    if (checkDateRange(template)) {
        errorInParameters = true;
    }
    template.forEach((parameter) => {
        if (parameter.parameterType != "DATE") {
            var minimumValue = parameter.parameterType.split("_")[2]
            var currentValue = parameter.parameterValue
            if (parseFloat(currentValue) < parseFloat(minimumValue) || isNaN(parseFloat(currentValue)) || isNaN(parseFloat(minimumValue))) {
                errorInParameters = true
            }
        }
    })
    return errorInParameters
}