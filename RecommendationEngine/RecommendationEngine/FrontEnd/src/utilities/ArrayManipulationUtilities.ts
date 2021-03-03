import { Parameter } from "../api/models/TemplateDetails";
import { dateFormat } from './DateTimeUtilities';
import { Asset, MultiSelectTreeViewAsset } from '../api/models/Asset';
import { DetailedWidget, Widget } from '../api/models/Widget';
// import { store } from '../redux/store';

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
    let renamedAssetAttributes: MultiSelectTreeViewAsset[] = [];
    renamedAssetAttributes = assets.map((element: Asset) => {
        return {
            value: element,
            key: element ? element.id : 0,
            title: element ? element.displayText : 'N/A',
            children: element ? (element.children ? convertAssetObject(element.children) : []) : []
        }
    })
    return renamedAssetAttributes;
}

export const convertWidgetResponse = (widgets: Widget[]): DetailedWidget[] => {
    let detailedWidgets: DetailedWidget[] = [];
    detailedWidgets = widgets?.map((widget) => {
        return {
            value: widget.value,
            title: widget.title,
            description: widget.description,
            sign: widget.title === 'Average ROI' ? '%' : '$',
        }
    })
    return detailedWidgets;
}

// export const assetToMultiAssetSelection = (assets: Asset[]) : (Asset | null)[] => {
//     let resultList: (Asset | null)[] = [];
//     let listToMatch: MultiSelectTreeViewAsset[] = store.getState().sharedReducer.nestedAssetsArray;
//     console.log(listToMatch[0].value);
//     resultList = assets.map(element => {
//         return matchAssetToMultiAssetSelection(element, listToMatch[0].value);
//     })
//     return resultList;
// }

// export const matchAssetToMultiAssetSelection = (assetToMatch: Asset, asset: Asset | Asset[]) : Asset | null => {
//     for (const element of asset.children) {
//         if (element.id === assetToMatch.id) {
//             return element;      
//         } else {
//             matchAssetToMultiAssetSelection(assetToMatch, element.children)
//         }
//     }
//     return null;
// }



