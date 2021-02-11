import { Parameter } from "../api/models/TemplateDetails";
import { dateFormat } from './DateTimeUtilities';
export const convertObjectToArrayOfObjects = (obj: any) => {
    var result = Object.entries(obj).map((e) => ({ [e[0]]: e[1] }));
    return result;
}

export const transformParameterList = (array: Parameter[]): any[] => {
    let value: number | Date | string;
    return array.map((parameter: Parameter) => {
        parameter.parameterValue ? value = parameter.parameterValue : value = parameter.defaultValue;
        return { displayText: `${parameter.displayText}: ${parameter.parameterType === 'DATE' ? dateFormat(value) : value}` };
    })
}

export const transformParameterListPost = (array: Parameter[]): any[] => {
    let value: number | Date | string;
    return array.map((parameter: Parameter) => {
        parameter.parameterValue ? value = parameter.parameterValue : value = parameter.defaultValue;
        return {
            parameterName: parameter.parameterName.toString(),
            parameterValue: value?.toString()
        };
    })
}