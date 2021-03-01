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

    const potentialSavingsDescription = 'The potential net savings value represents the total possible ' +
        'saving if the best suggested wash dates are followed. It should be noted that this ' +
        'value has been generated while considering the best case scenario for each asset.';

    const potentialRoiDescription = 'The potential return on investment value represents the average potential rate of return ' +
        'if the best suggested wash dates are followed. It should be noted that this value has been ' +
        'generated while considering the best case scenario for each asset.';

    const potentialCostOfInaction = 'The potential cost of inaction value represents the total possible loss ' +
        'if the best suggested wash dates are not followed. It should be noted that this value has been ' +
        'generated while considering the best case scenario for each asset.';

    detailedWidgets = widgets?.map((widget) => {
        return {
            value: widget.value,
            title: widget.title,
            description: widget.title === 'Potential Net Savings' ? potentialSavingsDescription : widget.title === 'Average ROI' ? potentialRoiDescription : potentialCostOfInaction,
            sign: widget.title === 'Potential Net Savings' ? '$' : widget.title === 'Average ROI' ? '%' : '$',

        }
    })
    return detailedWidgets;
}

export const findFirstTabOrFalse = (tabs: any[], name: string): any => {
    if(tabs === null || tabs.length<1)
        return false;
    if (tabs.some(tab => tab.name === name)){
        return tabs.find(tab => tab.name === name).response;
    }
    return false;
}
