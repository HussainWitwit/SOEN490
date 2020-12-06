import { TemplateItems } from '../../TemplateConfigurationModal/ListTemplateItems';
import * as type from './dispatch-types';


const detailsConfigInitialValues = {
    title: '',
    asset: [],
    preferredScenario: '',
    granularity: 'Daily',
    repeatDay: '',
    repeatDate: '',
    repeatTime: ''
}

const contentInitialValues = {
    isDialogOpen: false,
    template: {name: TemplateItems[0].name},
    basicConfiguration: detailsConfigInitialValues,
    parameters: {}
  };

export const addRecDialogContentReducer = function (state = contentInitialValues, action) {
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
            console.log('error with your dispatch redux method');
            return state;
        } 
}