import { Parameter } from "../api/models/TemplateDetails";
import { dateFormat } from './DateTimeUtilities';
import { Asset, MultiSelectTreeViewAsset } from '../api/models/Asset';
import { DetailedWidget, Widget } from '../api/models/Widget';
import { ConfiguredRecommendationJob } from "../api/models/Job";
import { ConfiguredRecommendationResult } from "../api/models/JobResult";
import { ConfiguredRecommendation } from "../api/models/ConfiguredRecommendation";

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
            value: element ? element.id : 0,
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

export const findFirstTabOrFalse = (tabs: any[], name: string): any => {
    if(tabs === null || tabs.length<1)
        return false;
    if (tabs.some(tab => tab.name === name)){
        return tabs.find(tab => tab.name === name).response;
    }
    return false;
}
//interface for filterTableItems function below
export enum TableItemType {
    ConfiguredRecommendation= "ConfiguredRecommendation",
    Results = "Results",
    Jobs = "Jobs"
}

export const filterTableItems = (type: TableItemType, list: any[], input: string): any[] => {
    let filtered: any[];
    switch(type) {
        case "ConfiguredRecommendation":
            filtered = list.filter((recommendation: ConfiguredRecommendation) => {
                return recommendation.name.toLowerCase().includes(input.toLowerCase())
                || recommendation.id.toString().includes(input.toLowerCase())
                || recommendation.createdOn.toString().includes(input.toLowerCase())
                || recommendation.granularity.toLowerCase().includes(input.toLowerCase())
                || recommendation.type.toLowerCase().includes(input.toLowerCase())
            });
            break;
        case "Results":
            filtered = list.filter((result: ConfiguredRecommendationResult) => {
                return result.assetName.toLowerCase().includes(input.toLowerCase())
                || result.configuredRecommendationTitle.toLowerCase().includes(input.toLowerCase())
                || result.resultOutputDate.toString().includes(input.toLowerCase())
                || result.costOfAction.toString().includes(input.replace(',', ''))
                || result.costOfInaction.toString().includes(input.replace(',', ''))
                || result.netSaving.toString().includes(input.replace(',', ''))
                || result.returnOnInvestment.toString().includes(input.replace(',', ''))
            });
            break;
        case "Jobs":
            filtered = list.filter((job: ConfiguredRecommendationJob) => {
                return job.configuredRecommendationTitle.toLowerCase().includes(input.toLowerCase())
                || job.assetName.toLowerCase().includes(input.toLowerCase())
                || job.status.toLowerCase().includes(input.toLowerCase())
                || job.timestamp.toString().includes(input.toLowerCase())
                || (job.duration.toString() + " seconds").includes(input)
            });
            break;
        default:
            filtered = [];
    }
    return filtered;
}

export const mergedArrayIdsAndTitles = (ids: number[], titles: string[]): any[] => {
    if(ids.length !== titles.length){
        return []; 
    }
    else {
        return ids.map((element, index) => {
            return {
                id: element,
                displayText: titles[index]
            };
        })
    }
}