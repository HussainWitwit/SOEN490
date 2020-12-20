/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break 
 * your logic.
 * Note: All the following Actions target the api calls Reducer only
 */
import * as dispatchActionType from './dispatch-types';
import { getNestedAssetList,  getFlatAssetList } from '../../api/endpoints/AssetEndpoints';
import { GetConfiguredRecommendationList, PostConfiguredRecommendation, EditConfiguredRecommendation } from '../../api/endpoints/ConfiguredRecommendationEndpoints';
import { openScheduleDrilldown } from '../../redux/RightPanelReducer/reducer-actions';

//**GETTER** This method will allow you to direct access to all the states value from the store
export const mapStateToProps = ({apiReducer}) => {
    return {
      nestedAssets: apiReducer.nestedAssets,
      configuredRecommendationList: apiReducer.configuredRecommendationList
    };
  };

  //**Actions --> Useful for unit testing the reducer.
  export const getNestedAssets = async (dispatch) => {
    const response = await getNestedAssetList();
    dispatch({
      type: dispatchActionType.GET_NESTED_ASSETS,
      payload: response,
    });
  };

  export const getFlatListAssets = async (dispatch) => {
    const response = await getFlatAssetList();
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


  export const postConfiguredRecommendation = async (dispatch, configuredRecommendation) => {
    const response = await PostConfiguredRecommendation(configuredRecommendation);
    dispatch({
      type: dispatchActionType.POST_CONFIGURED_RECOMMENDATION,
      payload: response,
    });
    if(response.status === 200) { 
      //TODO: Successful post, send notifications...
      await getConfiguredRecommendationList(dispatch); //To test
    }
    else {
      //TODO: Error with post, send notifications...
    }
  }

export const editConfiguredRecommendation = async (dispatch, configuredRecommendation, id) => {
    const response = await EditConfiguredRecommendation(configuredRecommendation, id);
    dispatch({
      type: dispatchActionType.EDIT_CONFIGURED_RECOMMENDATION,
      payload: response,
    });
    if(response.status === 200) { 
      //TODO: Successful post, send notifications...
      await getConfiguredRecommendationList(dispatch); //To test
      openScheduleDrilldown(dispatch, id);
    }
    else {
      //TODO: Error with post, send notifications...
    }
  }

  
  //This method will allow you to pass the actions as a prop to the connected component in
  //order to modify the value in the store
  export const mapDispatchApiToProps = (dispatch) => {
    return {
        getNestedAssets: () =>  getNestedAssets(dispatch),
        getFlatListAssets: () => getFlatListAssets(dispatch),
        getConfiguredRecommendationList: () => getConfiguredRecommendationList(dispatch),
        postConfiguredRecommendation: (configuredRecommendation) => postConfiguredRecommendation(dispatch, configuredRecommendation),
        editConfiguredRecommendation: (configuredRecommendation, id) => editConfiguredRecommendation(dispatch, configuredRecommendation, id)
    };
  };