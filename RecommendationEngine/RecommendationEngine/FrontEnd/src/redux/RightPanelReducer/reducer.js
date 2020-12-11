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

import { TemplateItems } from '../../containers/TemplateConfigurationModal/ListTemplateItems';
import * as type from './dispatch-types';

const rightPanelInitialState = {
  isOpen: false,
  tabs: [],
  selectedTabIndex: 0,
};

const DRILLDOWN_NAME = 'Drilldown';
const ASSET_TREEVIEW_NAME = 'AssetTreeview';

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
      if (state.tabs.some((e) => e.name === DRILLDOWN_NAME))
        return {
          ...state,
          selectedTabIndex: state.tabs.findIndex(tab => tab.name === DRILLDOWN_NAME),
          tabs: state.tabs.map((e) =>
            e.name === DRILLDOWN_NAME
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
          { name: DRILLDOWN_NAME, response: action.payload.response },
        ],
      };
    }

    // So far we only handle two tabs at the same time, which then explains why we move the selectedTabIndex to 0 once we close any tab
    case type.CLOSE_ASSET_TREEVIEW:
      return {
        ...state,
        isOpen: state.tabs.some((e) => e.name === DRILLDOWN_NAME),
        selectedTabIndex: 0,
        tabs: state.tabs.filter((tab) => tab.name !== ASSET_TREEVIEW_NAME),
      };

    case type.CLOSE_SCHEDULE_DRILLDOWN:
      return {
        ...state,
        isOpen: state.tabs.some((e) => e.name === ASSET_TREEVIEW_NAME),
        selectedTabIndex: 0,
        tabs: state.tabs.filter((tab) => tab.name !== DRILLDOWN_NAME),
      };
    case type.CLOSE_ALL:
      return rightPanelInitialState;

    // Special case: the ChangeTabIndex gets called after a Close since we're closing the item. 
    // We then need to handle the ground case when we have 2 tabs and closing the second
    case type.CHANGE_TAB_INDEX:
      return{
        ...state,
        selectedTabIndex: state.tabs.length>1?action.payload.selectedTabIndex:0
      }
    default:
      return state;
  }
};
