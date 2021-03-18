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
        return errorInParameters
    }

    template.forEach((parameter) => {
        if (parameter.parameterType != "DATE") {
            var paramTypeAttributes = parameter.parameterType.split("_")
            var parameterType = paramTypeAttributes[1]
            var minimumValue = paramTypeAttributes[2]
            var isNegative = paramTypeAttributes[0] === "NEGATIVE"
            var currentValue = parameter.parameterValue

            var isInvalidNumber = isNaN(parseFloat(currentValue)) || isNaN(parseFloat(minimumValue))
            var invalidFloat = parameterType === "FLOAT" && !currentValue.includes(".")
            var invalidInt = parameterType === "INT" && currentValue.includes(".")
            var negativeComparasion = parseFloat(currentValue) > parseFloat(minimumValue)
            var positiveComparasion = parseFloat(currentValue) < parseFloat(minimumValue)

            if ((!isNegative && positiveComparasion) || (isNegative && negativeComparasion) || isInvalidNumber || invalidInt || invalidFloat) {
                errorInParameters = true
                return errorInParameters
            }
        }
    })
    return errorInParameters
}