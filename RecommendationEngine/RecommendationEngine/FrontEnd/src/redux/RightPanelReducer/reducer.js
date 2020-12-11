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

const DRILLDOWN_TITLE = 'Drilldown';
const ASSET_TREEVIEW_TITLE = 'Asset Treeview';

export const RightPanelReducer = function (
  state = rightPanelInitialState,
  action
) {
  switch (action.type) {
    case type.OPEN_ASSET_TREEVIEW: {
      if (state.tabs.some((e) => e.title === ASSET_TREEVIEW_TITLE))
        return {
          ...state,
          selectedTabIndex: state.tabs.findIndex(tab => tab.title === ASSET_TREEVIEW_TITLE),
        };
      return {
        ...state,
        isOpen: true,
        selectedTabIndex: state.tabs.length,
        tabs: [...state.tabs, { title: ASSET_TREEVIEW_TITLE }],
      };
    }
    case type.OPEN_SCHEDULE_DRILLDOWN: {
      if (state.tabs.some((e) => e.title === DRILLDOWN_TITLE))
        return {
          ...state,
          selectedTabIndex: state.tabs.findIndex(tab => tab.title === DRILLDOWN_TITLE),
          tabs: state.tabs.map((e) =>
            e.title === DRILLDOWN_TITLE
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
          { title: DRILLDOWN_TITLE, response: action.payload.response },
        ],
      };
    }

    // So far we only handle two tabs at the same time, which then explains why we move the selectedTabIndex to 0 once we close any tab
    case type.CLOSE_ASSET_TREEVIEW:
      return {
        ...state,
        isOpen: state.tabs.some((e) => e.title === DRILLDOWN_TITLE),
        selectedTabIndex: 0,
        tabs: state.tabs.filter((tab) => tab.title !== ASSET_TREEVIEW_TITLE),
      };

    case type.CLOSE_SCHEDULE_DRILLDOWN:
      return {
        ...state,
        isOpen: state.tabs.some((e) => e.title === ASSET_TREEVIEW_TITLE),
        selectedTabIndex: 0,
        tabs: state.tabs.filter((tab) => tab.title !== DRILLDOWN_TITLE),
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
