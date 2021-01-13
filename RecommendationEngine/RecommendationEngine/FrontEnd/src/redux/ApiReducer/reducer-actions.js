/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break 
 * your logic.
 * Note: All the following Actions target the api calls Reducer only
 */
import * as dispatchActionType from './dispatch-types';
import { GetConfiguredRecommendationList, PostConfiguredRecommendation, EditConfiguredRecommendation, DeleteRecommendationById } from '../../api/endpoints/ConfiguredRecommendationEndpoints';
import { openScheduleDrilldown } from '../../redux/RightPanelReducer/reducer-actions';
import { GetNestedAssetList,  GetFlatAssetList } from '../../api/endpoints/AssetEndpoints';

//**GETTER** This method will allow you to direct access to all the states value from the store
export const mapStateToProps = ({apiReducer}) => {
    return {
      nestedAssets: apiReducer.nestedAssets,
      configuredRecommendationList: apiReducer.configuredRecommendationList
    };
  };

  //**Actions --> Useful for unit testing the reducer.
  export const getNestedAssets = async (dispatch) => {
    const response = await GetNestedAssetList();
    dispatch({
      type: dispatchActionType.GET_NESTED_ASSETS,
      payload: response,
    });
  };

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


  export const postConfiguredRecommendation = async (dispatch, configuredRecommendation) => {
    const response = await PostConfiguredRecommendation(configuredRecommendation);
    dispatch({
      type: dispatchActionType.POST_CONFIGURED_RECOMMENDATION,
      payload: response,
    });
    if(response.status === 200) { 
      await getConfiguredRecommendationList(dispatch); 
    }
    else {
        alert("An error occured when trying to add this recommendation into our server.");
    }
  }

export const editConfiguredRecommendation = async (dispatch, configuredRecommendation, id) => {
    const response = await EditConfiguredRecommendation(configuredRecommendation, id);
    dispatch({
      type: dispatchActionType.EDIT_CONFIGURED_RECOMMENDATION,
      payload: response,
    });
    if(response.status === 200) { 
      await getConfiguredRecommendationList(dispatch);
      openScheduleDrilldown(dispatch, id);
    }
    else {
       alert("An error occured when trying to modify this recommendation from our server.");
    }
  }

  
  export const deleteConfiguredRecommendation = async (dispatch, id) => {
    const response = await DeleteRecommendationById(id);
    dispatch({
      type: dispatchActionType.DELETE_CONFIGURE_RECOMMENDATION,
      payload: response
    });
    if(response.status === 200) { 
      await getConfiguredRecommendationList(dispatch);
    }
    else {
        alert("An error occured when trying to delete this recommendation from our server.");
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