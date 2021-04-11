import * as dispatchActionType from '../dispatch-types';
import { RightPanelReducer } from '../reducer';

const SCHEDULE_DRILLDOWN_NAME = 'Details';
const ASSET_TREEVIEW_NAME = 'AssetTreeview';
const RESULT_DRILLDOWN_NAME = 'Actions';

let state = {
  isOpen: false,
  tabs: [],
  selectedTabIndex: 0
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
        { name: SCHEDULE_DRILLDOWN_NAME, response: { test: 'test' } },
      ],
    });
  });

  it('should handle OPEN_SCHEDULE_DRILLDOWN with a tab already', () => {
    expect(
      RightPanelReducer(
        {
          ...state,
          tabs: [...state.tabs, { name: SCHEDULE_DRILLDOWN_NAME }],
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
        { name: SCHEDULE_DRILLDOWN_NAME, response: { test: 'test' } },
      ],
    });
  });

  it('should handle OPEN_RESULT_DRILLDOWN with no tab', () => {
    expect(
      RightPanelReducer(state, {
        type: dispatchActionType.OPEN_RESULT_DRILLDOWN,
        payload: {
          response: { test: 'test' },
        },
      })
    ).toEqual({
      ...state,
      isOpen: true,
      tabs: [
        ...state.tabs,
        { name: RESULT_DRILLDOWN_NAME, response: { test: 'test' } },
      ],
    });
  });

  it('should handle OPEN_RESULT_DRILLDOWN with a tab already', () => {
    expect(
      RightPanelReducer(
        {
          ...state,
          tabs: [...state.tabs, { name: SCHEDULE_DRILLDOWN_NAME }],
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
        { name: SCHEDULE_DRILLDOWN_NAME, response: { test: 'test' } },
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
        { ...state, isOpen: true, tabs: [{ name: SCHEDULE_DRILLDOWN_NAME }] },
        {
          type: dispatchActionType.CLOSE_SCHEDULE_DRILLDOWN,
        }
      )
    ).toEqual(state);
  });

  it('should handle CLOSE_RESULT_DRILLDOWN', () => {
    expect(
      RightPanelReducer(
        { ...state, isOpen: true, tabs: [{ name: RESULT_DRILLDOWN_NAME }] },
        {
          type: dispatchActionType.CLOSE_RESULT_DRILLDOWN,
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
          tabs: [{ name: SCHEDULE_DRILLDOWN_NAME }, { name: ASSET_TREEVIEW_NAME }, { name: RESULT_DRILLDOWN_NAME }],
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
          tabs: [{ name: SCHEDULE_DRILLDOWN_NAME }, { name: ASSET_TREEVIEW_NAME }, { name: RESULT_DRILLDOWN_NAME }],
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
      tabs: [{ name: SCHEDULE_DRILLDOWN_NAME }, { name: ASSET_TREEVIEW_NAME }, { name: RESULT_DRILLDOWN_NAME }],
      selectedTabIndex: 1,
    });
  });

  it('should handle UPDATE_SCHEDULE_DRILLDOWN', () => {
    let innerState = RightPanelReducer(
      {
        ...state,
        isOpen: true,
        tabs: [
          {
            name: SCHEDULE_DRILLDOWN_NAME,
            response: { lastJobs: [null, null, null, null, null] },
          },
          { name: ASSET_TREEVIEW_NAME },
        ],
      },
      {
        type: dispatchActionType.UPDATE_SCHEDULE_DRILLDOWN,
        payload: {
          action: 'forceRun',
        },
      }
    )
    expect(innerState.tabs[0].response.lastJobs[4].status
    ).toEqual('Running');
    expect(innerState.tabs[0].response.lastJobs[4].id
      ).toEqual('N/A');
  });
});
