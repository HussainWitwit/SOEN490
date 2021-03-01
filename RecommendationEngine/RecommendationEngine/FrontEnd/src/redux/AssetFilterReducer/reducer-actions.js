import * as dispatchActionType from './dispatch-types';

//**Actions --> Useful for unit testing the reducer.
export const setAssetSelection = (id) => {
  return {
    type: dispatchActionType.SET_ASSET_SELECTION,
    payload: {
      selectedAsset: id,
    },
  };
};

export const clearAssetSelection = () => {
  return {
    type: dispatchActionType.CLEAR_ASSET_SELECTION,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    setAssetSelection: (value) => dispatch(setAssetSelection(value)),
    clearAssetSelection: () => dispatch(clearAssetSelection()),
  };
};