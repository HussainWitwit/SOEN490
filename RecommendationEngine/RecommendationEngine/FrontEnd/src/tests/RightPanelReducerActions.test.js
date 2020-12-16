import * as dispatchActionType from '../redux/RightPanelReducer/dispatch-types';
import * as action from '../redux/RightPanelReducer/reducer-actions';

describe('Verifying actions', () => {
  it('fires an open asset treeview action', () => {
    const expectedAction = {
      type: dispatchActionType.OPEN_ASSET_TREEVIEW,
    };
    expect(action.openAssetTreeview()).toEqual(expectedAction);
  });

  it('fires a close asset treeview action', () => {
    const expectedAction = {
      type: dispatchActionType.CLOSE_ASSET_TREEVIEW,
    };
    expect(action.closeAssetTreeview()).toEqual(expectedAction);
  });

  it('fires a close schedule drilldown action', () => {
    const expectedAction = {
      type: dispatchActionType.CLOSE_SCHEDULE_DRILLDOWN,
    };
    expect(action.closeScheduleDrilldown()).toEqual(expectedAction);
  });

  it('fires a closeall action', () => {
    const expectedAction = {
      type: dispatchActionType.CLOSE_ALL,
    };
    expect(action.closeAll()).toEqual(expectedAction);
  });

  it('fires a change tab index action', () => {
    const value = 1;
    const expectedAction = {
      type: dispatchActionType.CHANGE_TAB_INDEX,
      payload: {
        selectedTabIndex: value,
      },
    };
    expect(action.changeTabIndex(value)).toEqual(expectedAction);
  });
});
