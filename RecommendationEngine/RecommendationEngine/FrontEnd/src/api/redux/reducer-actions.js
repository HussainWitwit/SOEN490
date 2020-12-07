import * as dispatchActionType from './dispatch-types';
import { client } from '../get/AssetEndpoints';
//Note: All the following Actions target the AddRecommendationDialog Reducer only

//**GETTER** This method will allow you to direct access to all the states value from the store
export const mapStateToProps = ({assetReducer}) => {
    return {
      nestedAssets: assetReducer.nestedAssets
    };
  };

  //**Actions --> Useful for unit testing the reducer.
  export const getNestedAssets = async (dispatch) => {
    const response = await client.get('asset/getAssetsNested');
    dispatch({
      type: dispatchActionType.GET_NESTED_ASSETS,
      payload: response,
    });
  };

  export const getFlatListAssets = async (dispatch) => {
    const response = await client.get('asset/getAssetsList');
    dispatch({
      type: dispatchActionType.GET_FLAT_LIST_ASSETS,
      payload: response,
    });
  }

 

  
  //This method will allow you to pass the actions as a prop to the connected component in
  //order to modify the value in the store
  export const mapDispatchToProps = (dispatch) => {
    return {
        getNestedAssets: () =>  getNestedAssets(dispatch),
        getFlatListAssets: () => getFlatListAssets(dispatch),
    };
  };