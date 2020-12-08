import * as dispatchActionType from './dispatch-types';
import { AssetClient } from '../get/AssetEndpoints';
import { GetConfiguredRecommendationList, PostConfiguredRecommendation } from '../get/ConfiguredRecommendationEndpoints';
//Note: All the following Actions target the AddRecommendationDialog Reducer only

//**GETTER** This method will allow you to direct access to all the states value from the store
export const mapStateToProps = ({apiReducer}) => {
    return {
      nestedAssets: apiReducer.nestedAssets,
      configuredRecommendationList: apiReducer.configuredRecommendationList
    };
  };

  //**Actions --> Useful for unit testing the reducer.
  export const getNestedAssets = async (dispatch) => {
    const response = await AssetClient.get('asset/getAssetsNested');
    dispatch({
      type: dispatchActionType.GET_NESTED_ASSETS,
      payload: response,
    });
  };

  export const getFlatListAssets = async (dispatch) => {
    const response = await AssetClient.get('asset/getAssetsList');
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

  //TODO: [test with backend] should call a nested dispatch on the ConfiguredRecommendationTable.
  export const postConfiguredRecommendation = async (dispatch, configuredRecommendation) => {
    const response = await PostConfiguredRecommendation(configuredRecommendation);
    dispatch({
      type: dispatchActionType.POST_CONFIGURED_RECOMMENDATION,
      payload: response,
    });
    if(response === 200) { //TODO: check if this is the correct response from the post request.
      //TODO: Successful post, send notifications...
      await getConfiguredRecommendationList(dispatch); //To test
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
        postConfiguredRecommendation: (configuredRecommendation) => postConfiguredRecommendation(dispatch, configuredRecommendation)
    };
  };