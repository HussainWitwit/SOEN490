import * as type from './dispatch-types';

export const initialValues = {
    nestedAssets: [],
    flatListAssets: []
  };

  export const AssetsReducer = function (state = initialValues, action) {
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
            default:
                return state
    }
}
