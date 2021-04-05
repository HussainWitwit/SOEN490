import * as dispatchType from '../dispatch-types';
import * as action from '../reducer-actions';

describe('Verifying actions', () => {
  it('fires a select asset action', () => {
    const expectedAction = {
      type: dispatchType.SET_ASSET_SELECTION,
      payload: {
        selectedAsset: 1,
      },
    };
    expect(action.setAssetSelection(()=>{}, 1)).toEqual(expectedAction);
  });

  it('fires a clear asset action', () => {
    const expectedAction = {
      type: dispatchType.CLEAR_ASSET_SELECTION,
    };
    expect(action.clearAssetSelection()).toEqual(expectedAction);
  });
});
