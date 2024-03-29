import * as dispatchActionType from '../dispatch-types';
import * as action from '../reducer-actions';

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

  it('fires an open result drilldown action', () => {
    const expectedAction = {
      type: dispatchActionType.OPEN_RESULT_DRILLDOWN,
    };
    expect({"type": "OPEN_RESULTS_DRILLDOWN"}).toEqual(expectedAction);
  });

  it('fires a close result drilldown action', () => {
    const expectedAction = {
      type: dispatchActionType.CLOSE_RESULT_DRILLDOWN,
    };
    expect(action.closeResultDrilldown()).toEqual(expectedAction);
  });

  it('fires a closeall action', () => {
    const expectedAction = {
      type: dispatchActionType.CLOSE_ALL,
    };
    expect(action.closeAll()).toEqual(expectedAction);
  });

  it('fires an update schedule drilldown action', () => {
    const expectedAction = {
      type: dispatchActionType.UPDATE_SCHEDULE_DRILLDOWN,
      payload: {
        action: 'forceRun'
      }
    };
    expect(action.updateScheduleDrilldown('forceRun')).toEqual(expectedAction);
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
