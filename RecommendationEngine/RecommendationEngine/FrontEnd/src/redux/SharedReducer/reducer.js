import * as type from './dispatch-types';

export const initialValues = {
    nestedAssets: [],
    nestedAssetsArray: [],
    flatListAssets: [],
    configuredRecommendationList: [],
    templateDetailsList: [],
}

export const SharedReducer = function (state = initialValues, action) {
    switch (action.type) {
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
        case type.GET_NESTED_ASSETS_IN_ARRAY: //might have debugging
            return {
                ...state,
                nestedAssetsArray: [...action.payload]
            }
        default:
            return state
    }
}
