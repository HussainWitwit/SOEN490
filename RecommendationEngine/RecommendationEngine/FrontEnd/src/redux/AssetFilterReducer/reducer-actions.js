import * as dispatchActionType from './dispatch-types';
import { getConfiguredRecommendationList } from '../SharedReducer/reducer-actions';

//**Actions --> Useful for unit testing the reducer.
export const setAssetSelection = (dispatch, id) => {
  dispatch(getConfiguredRecommendationList(id));
  return {
    type: dispatchActionType.SET_ASSET_SELECTION,
    payload: {
      selectedAsset: id,
    },
  };
}

export const clearAssetSelection = () => {
  return {
    type: dispatchActionType.CLEAR_ASSET_SELECTION,
  };
};

export const mapStateToProps = ({ sharedReducer, assetFilterReducer }) => {
  return {
    nestedAssets: sharedReducer.nestedAssets,
    flatListAssets: sharedReducer.flatListAssets,
    selectedAsset: assetFilterReducer.selectedAsset
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setAssetSelection: (value) => dispatch(setAssetSelection(dispatch, value)),
    clearAssetSelection: () => dispatch(clearAssetSelection()),
  };
};