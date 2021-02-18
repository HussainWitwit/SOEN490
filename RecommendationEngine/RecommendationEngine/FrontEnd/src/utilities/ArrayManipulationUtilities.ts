import { Parameter } from "../api/models/TemplateDetails";
import { dateFormat } from './DateTimeUtilities';
import { Asset, MultiSelectTreeViewAsset } from '../api/models/Asset';
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

export const convertAssetObject = (assets: Asset[]): MultiSelectTreeViewAsset[] => {
    let result: MultiSelectTreeViewAsset[] = [];
    result = assets.map((element: Asset) => {
        return {
            key: element.id,
            title: element.displayText,
            value: element,
            children: element.children ? convertAssetObject(element.children) : []
        }
    })
    return result;
}

// NOTE: the input array can be changed to an object, depending on where this function is called
// The reason the input is of type any[] and not Asset[] is because we need to recursively go through the children arrays as well

// export const renameAttributes = (array: any[]): any[] => {
//     const oldKeys = ['displayText', 'id'];
//     const newKeys = ['title', 'key'];

//     let key, newKey, index, value;

//     let result: any[] = [];
//     for (key in array) {
//         // Get the new key
//         index = oldKeys.indexOf(key);
//         newKey = index === -1 ? key : newKeys[index];

//         // Get the value
//         value = array[key];

//         // If this is an object, recurse
//         if (typeof value === "object") {
//             value = renameAttributes(value);
//         }

//         // Set it on the result using the new key

//         result[newKey] = value;
//     }
//     return result;
// }

