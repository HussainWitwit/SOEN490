/**
 * Redux explanation:
 * This is where the alteration of the object you added to the store is done.
 *
 * - The main function takes an action from the dispatch (See reducer-actions) which
 * represents an plain object that has a type and an optional payload.
 *
 * - You can add any logic you wish inside of it but you must return an object.
 * Switch() function  is the most used one since every action has a type.
 *
 * - Spread operator is used to keep the values of the attributes that do not change
 * (we are dealing with object in this reducer).
 *
 * - declaring the string types as constants in another file
 */

import * as type from './dispatch-types';

const rightPanelInitialState = {
  isOpen: false,
  tabs: [],
  selectedTabIndex: 0,
};

const SCHEDULE_DRILLDOWN_NAME = 'Details';
const ASSET_TREEVIEW_NAME = 'AssetTreeview';
const RESULT_DRILLDOWN_NAME = 'Actions';

/**
 * The right panel reducer's main business logic is surrounds the idea that there should only be a maximum of 2 tabs open to avoid crowding;
 *  - Asset selection
 *  - Any type of drilldown view
 * It is important to note that we have to return states as immutable objects in redux, and so the main functions used are map, filter and spread operator
 */
export const RightPanelReducer = function (
  state = rightPanelInitialState,
  action
) {
  switch (action.type) {
    case type.OPEN_ASSET_TREEVIEW: {
      if (state.tabs.some((e) => e.name === ASSET_TREEVIEW_NAME))
        return {
          ...state,
          selectedTabIndex: state.tabs.findIndex(tab => tab.name === ASSET_TREEVIEW_NAME),
        };
      return {
        ...state,
        isOpen: true,
        selectedTabIndex: state.tabs.length,
        tabs: [...state.tabs, { name: ASSET_TREEVIEW_NAME }],
      };
    }

    case type.OPEN_SCHEDULE_DRILLDOWN: {
      if (state.tabs.some((e) => e.name === SCHEDULE_DRILLDOWN_NAME))
        return {
          ...state,
          selectedTabIndex: state.tabs.findIndex(tab => tab.name === SCHEDULE_DRILLDOWN_NAME),
          tabs: state.tabs.map((e) =>
            e.name === SCHEDULE_DRILLDOWN_NAME
              ? { ...e, response: action.payload.response }
              : e
          ),
        };
      return {
        ...state,
        isOpen: true,
        selectedTabIndex: state.tabs.length,
        tabs: [
          ...state.tabs,
          { name: SCHEDULE_DRILLDOWN_NAME, response: action.payload.response },
        ],
      };
    }

    case type.UPDATE_SCHEDULE_DRILLDOWN: {
      if (action.payload.action === 'forceRun')
        return {
          ...state,
          tabs: state.tabs.map((e) =>
            e.name === SCHEDULE_DRILLDOWN_NAME
              ? {
                ...e,
                response: {
                  ...e.response,
                  lastJobs: [
                    ...e.response.lastJobs,
                    {
                      id: 'N/A',
                      status: 'Running',
                      timestamp: Date.now(),
                    },
                  ].slice(1, 6),
                },
              }
              : e
          ),
        };
        else {
          break;
        }
    }

    case type.OPEN_RESULT_DRILLDOWN: {
      if (state.tabs.some((e) => e.name === RESULT_DRILLDOWN_NAME))
        return {
          ...state,
          selectedTabIndex: state.tabs.findIndex(tab => tab.name === RESULT_DRILLDOWN_NAME),
          tabs: state.tabs.map((e) =>
            e.name === RESULT_DRILLDOWN_NAME
              ? { ...e, response: action.payload.response }
              : e
          ),
        };
      return {
        ...state,
        isOpen: true,
        selectedTabIndex: state.tabs.length,
        tabs: [
          ...state.tabs,
          { name: RESULT_DRILLDOWN_NAME, response: action.payload.response },
        ],
      };
    }

    // So far we only handle two tabs at the same time, which then explains why we move the selectedTabIndex to 0 once we close any tab
    case type.CLOSE_ASSET_TREEVIEW:
      return {
        ...state,
        isOpen: state.tabs.some((e) => (e.name === SCHEDULE_DRILLDOWN_NAME || e.name === RESULT_DRILLDOWN_NAME)),
        selectedTabIndex: state.tabs.length - 1,
        tabs: state.tabs.filter((tab) => tab.name !== ASSET_TREEVIEW_NAME),
      };

    case type.CLOSE_SCHEDULE_DRILLDOWN:
      return {
        ...state,
        isOpen: state.tabs.some((e) => (e.name === ASSET_TREEVIEW_NAME || e.name === RESULT_DRILLDOWN_NAME)),
        selectedTabIndex: state.tabs.length - 1,
        tabs: state.tabs.filter((tab) => tab.name !== SCHEDULE_DRILLDOWN_NAME),
      };

    case type.CLOSE_RESULT_DRILLDOWN:
      return {
        ...state,
        isOpen: state.tabs.some((e) => (e.name === ASSET_TREEVIEW_NAME || e.name === SCHEDULE_DRILLDOWN_NAME)),
        selectedTabIndex: state.tabs.length - 1,
        tabs: state.tabs.filter((tab) => tab.name !== RESULT_DRILLDOWN_NAME),
      };

    case type.CLOSE_ALL:
      return rightPanelInitialState;

    // Special case: the ChangeTabIndex gets called after a Close since we're closing the item. 
    // We then need to handle the ground case when we have 2/3 tabs and closing the second/third
    case type.CHANGE_TAB_INDEX:
      return {
        ...state,
        selectedTabIndex: (action.payload.selectedTabIndex) % state.tabs.length
      }

    default:
      return state;
  }
};