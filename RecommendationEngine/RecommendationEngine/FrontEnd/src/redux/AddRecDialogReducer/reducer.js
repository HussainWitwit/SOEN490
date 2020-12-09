import { TemplateItems } from '../../containers/TemplateConfigurationModal/ListTemplateItems';
import * as type from './dispatch-types';


const detailsConfigInitialValues = {
    title: '',
    asset: [],
    createdBy: 'Alain',
    preferredScenario: 'ROI',
    granularity: 'Daily',
    repeatDay: 1,
    repeatDate: new Date(),
    repeatTime: new Date('2020-01-01T07:00:00.000-05:00')
}


//TODO: Merge template, basic Config and parameters. Should be one object 
//  called smt like configuredRecommendation.
export const contentInitialValues = {
    isDialogOpen: false,
    template: {name: TemplateItems[0].name},
    basicConfiguration: detailsConfigInitialValues,
    parameters: {}
  };

export const AddConfiguredRecDialogReducer = function (state = contentInitialValues, action) {
    switch(action.type) {
        case type.UPDATE_RECOMMENDATION_TEMPLATE:
                return {
                    ...state,
                    template: {
                        ...state.template,
                        name: action.payload.name
                    }
                };

        case type.UPDATE_TITLE: 
            return {
                ...state,
                basicConfiguration: {
                    ...state.basicConfiguration,
                    title: action.payload.title
                }
            };

        case type.UPDATE_ASSET: 
            return {
                ...state,
                basicConfiguration: {
                    ...state.basicConfiguration,
                    asset: action.payload.asset
                }
            };

        case type.UPDATE_PREFERRED_SCENARIO: 
            return {
                ...state,
                basicConfiguration: {
                    ...state.basicConfiguration,
                    preferredScenario: action.payload.preferredScenario
                }
            };

        case type.UPDATE_GRANULARITY: 
            return {
                ...state,
                basicConfiguration: {
                    ...state.basicConfiguration,
                    granularity: action.payload.granularity
                }
            };

        case type.UPDATE_REPEAT_DAY: 
            return {
                ...state,
                basicConfiguration: {
                    ...state.basicConfiguration,
                    repeatDay: action.payload.repeatDay
                }
            };

        case type.UPDATE_REPEAT_DATE: 
            return {
                ...state,
                basicConfiguration: {
                    ...state.basicConfiguration,
                    repeatDate: action.payload.repeatDate
                }
            };

        case type.UPDATE_REPEAT_TIME: 
            return {
                ...state,
                basicConfiguration: {
                    ...state.basicConfiguration,
                    repeatTime: action.payload.repeatTime
                }
            };

        case type.TOGGLE_DIALOG: 
            return {
                ...state,
                isDialogOpen: !state.isDialogOpen
            };

        case type.CLEAR:
            return contentInitialValues; 

        default:
            return state;
        } 
}