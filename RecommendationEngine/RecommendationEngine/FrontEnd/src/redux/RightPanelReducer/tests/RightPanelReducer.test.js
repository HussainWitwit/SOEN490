import * as dispatchActionType from '../dispatch-types';

import { RightPanelReducer } from '../reducer';

const DRILLDOWN_NAME = 'Details';
const ASSET_TREEVIEW_NAME = 'AssetTreeview';

let state = {
  isOpen: false,
  tabs: [],
  selectedTabIndex: 0,
};

describe('Right panel reducer', () => {
  it('should return the initial state', () => {
    expect(RightPanelReducer(undefined, {})).toEqual(state);
  });

  it('should handle OPEN_ASSET_TREEVIEW with no tab', () => {
    expect(
      RightPanelReducer(state, {
        type: dispatchActionType.OPEN_ASSET_TREEVIEW,
      })
    ).toEqual({
      ...state,
      isOpen: true,
      tabs: [...state.tabs, { name: ASSET_TREEVIEW_NAME }],
    });
  });

  it('should handle OPEN_ASSET_TREEVIEW with a tab already', () => {
    expect(
      RightPanelReducer(
        {
          ...state,
          tabs: [...state.tabs, { name: ASSET_TREEVIEW_NAME }],
        },
        {
          type: dispatchActionType.OPEN_ASSET_TREEVIEW,
        }
      )
    ).toEqual({
      ...state,
      tabs: [...state.tabs, { name: ASSET_TREEVIEW_NAME }],
    });
  });

  it('should handle OPEN_SCHEDULE_DRILLDOWN with no tab', () => {
    expect(
      RightPanelReducer(state, {
        type: dispatchActionType.OPEN_SCHEDULE_DRILLDOWN,
        payload: {
          response: { test: 'test' },
        },
      })
    ).toEqual({
      ...state,
      isOpen: true,
      tabs: [
        ...state.tabs,
        { name: DRILLDOWN_NAME, response: { test: 'test' } },
      ],
    });
  });

  it('should handle OPEN_SCHEDULE_DRILLDOWN with a tab already', () => {
    expect(
      RightPanelReducer(
        {
          ...state,
          tabs: [...state.tabs, { name: DRILLDOWN_NAME }],
        },
        {
          type: dispatchActionType.OPEN_SCHEDULE_DRILLDOWN,
          payload: {
            response: { test: 'test' },
          },
        }
      )
    ).toEqual({
      ...state,
      tabs: [
        ...state.tabs,
        { name: DRILLDOWN_NAME, response: { test: 'test' } },
      ],
    });
  });

  it('should handle CLOSE_ASSET_TREEVIEW', () => {
    expect(
      RightPanelReducer(
        { ...state, isOpen: true, tabs: [{ name: ASSET_TREEVIEW_NAME }] },
        {
          type: dispatchActionType.CLOSE_ASSET_TREEVIEW,
        }
      )
    ).toEqual(state);
  });

  it('should handle CLOSE_SCHEDULE_DRILLDOWN', () => {
    expect(
      RightPanelReducer(
        { ...state, isOpen: true, tabs: [{ name: DRILLDOWN_NAME }] },
        {
          type: dispatchActionType.CLOSE_SCHEDULE_DRILLDOWN,
        }
      )
    ).toEqual(state);
  });

  it('should handle CLOSE_ALL', () => {
    expect(
      RightPanelReducer(
        {
          ...state,
          isOpen: true,
          tabs: [{ name: DRILLDOWN_NAME }, { name: ASSET_TREEVIEW_NAME }],
        },
        {
          type: dispatchActionType.CLOSE_ALL,
        }
      )
    ).toEqual(state);
  });

  it('should handle CHANGE_TAB_INDEX', () => {
    expect(
      RightPanelReducer(
        {
          ...state,
          isOpen: true,
          tabs: [{ name: DRILLDOWN_NAME }, { name: ASSET_TREEVIEW_NAME }],
        },
        {
          type: dispatchActionType.CHANGE_TAB_INDEX,
          payload: {
            selectedTabIndex: 1,
          },
        }
      )
    ).toEqual({
      ...state,
      isOpen: true,
      tabs: [{ name: DRILLDOWN_NAME }, { name: ASSET_TREEVIEW_NAME }],
      selectedTabIndex: 1,
    });
  });
});
