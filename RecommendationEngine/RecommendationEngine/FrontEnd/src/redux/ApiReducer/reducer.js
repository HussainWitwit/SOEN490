import * as type from './dispatch-types';

export const initialValues = {
    nestedAssets: [],
    flatListAssets: [],
    configuredRecommendationList: [],
    templateDetailsList: [],
  };

  export const ApiReducer = function (state = initialValues, action) {
    switch(action.type) {
        case type.GET_NESTED_ASSETS: 
            return {
                ...state,
                nestedAssets: action.payload
            };
        case type.GET_FLAT_LIST_ASSETS:
            return {
                ...state,
                flatListAssets: action.payload
            };
        case type.GET_CONFIGURED_RECOMMENDATION_LIST:
            return {
                ...state,
                configuredRecommendationList: action.payload
            };
            default:
                return state
    }
}
