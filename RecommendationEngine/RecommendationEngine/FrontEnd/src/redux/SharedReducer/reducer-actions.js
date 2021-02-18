/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break 
 * your logic.
 * Note: All the following Actions target the api calls Reducer only
 */
import * as dispatchActionType from './dispatch-types';
import { GetConfiguredRecommendationList } from '../../api/endpoints/ConfiguredRecommendationEndpoints';
import { GetNestedAssetList, GetFlatAssetList } from '../../api/endpoints/AssetEndpoints';

//**Actions --> Useful for unit testing the reducer.
export const getNestedAssets = async (dispatch) => {
  const response = await GetNestedAssetList();
  dispatch({
    type: dispatchActionType.GET_NESTED_ASSETS,
    payload: response,
  });
};

export const getNestedAssetInArray = async (dispatch) => {
  const response = await GetNestedAssetList();
  dispatch({
    type: dispatchActionType.GET_NESTED_ASSETS_IN_ARRAY,
    payload: response,
  });
}
export const getFlatListAssets = async (dispatch) => {
  const response = await GetFlatAssetList();
  dispatch({
    type: dispatchActionType.GET_FLAT_LIST_ASSETS,
    payload: response,
  });
}

export const getConfiguredRecommendationList = async (dispatch) => {
  const response = await GetConfiguredRecommendationList();
  dispatch({
    type: dispatchActionType.GET_CONFIGURED_RECOMMENDATION_LIST,
    payload: response,
  });
}

//**GETTER** This method will allow you to direct access to all the states value from the store
export const mapStateToProps = ({ sharedReducer }) => {
  return {
    nestedAssets: sharedReducer.nestedAssets,
    configuredRecommendationList: sharedReducer.configuredRecommendationList,
  };
};

//This method will allow you to pass the actions as a prop to the connected component in
//order to modify the value in the store
export const mapDispatchSharedToProps = (dispatch) => {
  return {
    getNestedAssets: () => getNestedAssets(dispatch),
    getFlatListAssets: () => getFlatListAssets(dispatch),
    getConfiguredRecommendationList: () => getConfiguredRecommendationList(dispatch),
  };
};