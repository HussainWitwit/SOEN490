import * as type from './dispatch-types';

export const contentInitialValues = {
  selectedAsset: '',
};

export const AssetFilterReducer = function (
  state = contentInitialValues,
  action
) {
  switch (action.type) {
    case type.SET_ASSET_SELECTION:
      return {
        ...state,
        selectedAsset: action.payload.selectedAsset,
      };

    case type.CLEAR_ASSET_SELECTION:
      return {
        ...state,
        selectedAsset: '',
      };
    default:
      return state;
  }
};
