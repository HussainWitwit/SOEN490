import * as dispatchType from '../dispatch-types';
import { AssetFilterReducer } from '../reducer';

let state = {
  selectedAsset:''
}

describe('Asset filter reducer', () => {
  it('should handle SET_ASSET_SELECTION', () => {
    expect(
      AssetFilterReducer(state, {
        type: dispatchType.SET_ASSET_SELECTION,
        payload: {selectedAsset:1}
      })
    ).toEqual({
      ...state,
      selectedAsset: 1
    });
  });

  it('should handle CLEAR_ASSET_SELECTION', () => {
    expect(
      AssetFilterReducer(state, {
        type: dispatchType.CLEAR_ASSET_SELECTION,
      })
    ).toEqual({
      ...state,
      selectedAsset: ''
    });
  });

  it('should handle default', () => {
    expect(
      AssetFilterReducer(state, {
        type: 'Test',
      })
    ).toEqual({
      ...state,
    });
  });
});