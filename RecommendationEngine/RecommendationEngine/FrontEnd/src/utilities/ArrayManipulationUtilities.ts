import { Parameter } from "../api/models/TemplateDetails";
import { dateFormat } from './DateTimeUtilities';
import { Asset, MultiSelectTreeViewAsset } from '../api/models/Asset';
import { DetailedWidget, Widget } from '../api/models/Widget';

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
    const potentialSavingsDescription = 'The potential net savings value represents the total possible cash value that would be saved if the suggested wash dates are all followed.';
    const potentialRoiDescription = 'The potential return on investment value represents the average percentage that would be saved if the suggested wash dates are all followed.';
    const potentialCostOfInaction = 'The potential cost of inaction value represents the total possible cash value that would be lost if the suggested wash dates are not followed.';

    detailedWidgets = widgets?.map((widget) => {
        return {
            value: widget.value,
            title: widget.title,
            description: widget.title === 'Potential Net Savings' ? potentialSavingsDescription : widget.title === 'Potential ROI' ? potentialRoiDescription : potentialCostOfInaction,
            sign: widget.title === 'Potential Net Savings' ? '$' : widget.title === 'Potential ROI' ? '%' : '$',

        }
    })
    return detailedWidgets;
}



