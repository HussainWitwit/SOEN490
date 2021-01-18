/**
 * Redux explanation: 
 * This is where the alteration of the object you added to the store is done.
 * 
 * - The main function takes an action from the dispatch (See reducer-actions) which 
 * represents an plain object that has a type and an optional payload.
 * 
 * - You can add any logic you wish inside of it but you must return an object. 
 * Switch() function  is the most used one since every action has a type. 
 * 
 * - Spread operator is used to keep the values of the attributes that do not change  
 * (we are dealing with object in this reducer).
 * 
 * - declaring the string types as constants in another file
 */

import * as type from './dispatch-types';

/*The attributes in the store are not exactly matching the object that is being sent during add recommendation.
* Ideally, tt should match the object that we send so that we can just send this object instead of assigning its values to 
* the body (see AddRecommendationDialog.jsx line 90). 
*
* It's not done for now as the add recommendation is not complete (parameters are required) and also, I'm sending an attribute
* that I'm not storing in the store (assetIdList).
*/
const detailsConfigInitialValues = {
    title: '',
    asset: [],
    createdBy: 'Kenzo',
    preferredScenario: 'ROI',
    granularity: 'Yearly',
    repeatDay: 1, //Why in the back-end the day of the week are from 1 to 7? Isn't it supposed to be 0 to 6.
    repeatDate: new Date(),
    repeatTime: new Date()
}


export const contentInitialValues = {
    isDialogOpen: false,
    template: {
        name: "",
        description: "",
        inputList: [],
        algorithmName: ""
    },
    basicConfiguration: detailsConfigInitialValues,
    parameters: {},
    templateDetailsList: [],
    isEditing: false,
    id: null
}

export const AddConfiguredRecDialogReducer = function (action, state = contentInitialValues) {
    
    switch (action.type) {
        case type.GET_TEMPLATE_DETAILS:
            return {
                ...state,
                templateDetailsList: action.payload
            }
        
        case type.UPDATE_RECOMMENDATION_TEMPLATE_NAME:
            return {
                ...state,
                template: {
                    ...state.template,
                    name: action.payload.name,
                }
            };

        case type.UPDATE_RECOMMENDATION_TEMPLATE_DESCRIPTION:
            return {
                ...state,
                template: {
                    ...state.template,
                    description: action.payload.description,
                }
            };

            case type.UPDATE_RECOMMENDATION_TEMPLATE_INPUTLIST:
            return {
                ...state,
                template: {
                    ...state.template,
                    inputList: action.payload.inputList,
                }
            };

            case type.UPDATE_RECOMMENDATION_TEMPLATE_ALGORITHM:
            return {
                ...state,
                template: {
                    ...state.template,
                    algorithmName: action.payload.algorithmName,
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

        case type.UPDATE_ID:
            return {
                ...state,
                id: action.payload.id
            };

        case type.EDITING_EXISTING_CONFIGURED_RECOMMENDATION:
            return {
                ...state,
                isEditing: !state.isEditing
            };

        case type.TOGGLE_DIALOG:
            return {
                ...state,
                isDialogOpen: !state.isDialogOpen
            };

        case type.SET_BACK_TO_INITIAL_VALUES:
            return {
                ...contentInitialValues,
                templateDetailsList: state.templateDetailsList,
                template: {
                    ...contentInitialValues.template,
                    name: state.templateDetailsList.length ? state.templateDetailsList[0].templateName: '',
                    description:  state.templateDetailsList.length ? state.templateDetailsList[0].templateDescription: '',
                    inputList:  state.templateDetailsList.length ? state.templateDetailsList[0].inputList: [],
                    algorithmName:  state.templateDetailsList.length ? state.templateDetailsList[0].algorithmName: ''
                }
              };

        default:
            return state;
    }
}