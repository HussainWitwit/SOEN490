import { Parameter } from "../api/models/TemplateDetails";
import { checkDateRange } from "./GeneralUtilities";

/* istanbul ignore next */
export async function handleErrors(res:Response) {
    var errorRes:any = {};
    if (!res.ok) {
        if(res.status === 400){
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
        return errorInParameters
    }

    template.forEach((parameter) => {
        if (parameter.parameterType != "DATE") {
            if (singleParameterInvalid(parameter)) {
                errorInParameters = true
                return errorInParameters
            }
        }
    })
    return errorInParameters
}

export const singleParameterInvalid = (parameter: Parameter) => {
    var paramTypeAttributes = parameter.parameterType.split("_")
    var isNegative = paramTypeAttributes[0] === "NEGATIVE"
    let numberType = paramTypeAttributes[1];
    var minimumValue = paramTypeAttributes[2]
    var currentValue = parameter.parameterValue

    if (currentValue) {
        var invalidInt = numberType === "INT" && currentValue.includes(".")
        var negativeComparasion = parseFloat(currentValue) > parseFloat(minimumValue)
        var positiveComparasion = parseFloat(currentValue) < parseFloat(minimumValue)
        var isInvalidNumber = isNaN(parseFloat(currentValue)) || isNaN(parseFloat(minimumValue))
        return (!isNegative && positiveComparasion) || (isNegative && negativeComparasion) || isInvalidNumber || invalidInt
    }
}