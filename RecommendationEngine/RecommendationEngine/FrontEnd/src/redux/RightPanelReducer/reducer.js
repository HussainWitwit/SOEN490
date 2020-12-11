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
};

const DRILLDOWN_TITLE = 'Drilldown';
const ASSET_TREEVIEW_TITLE = 'Asset Treeview'

export const RightPanelReducer = function (
  state = rightPanelInitialState,
  action
) {
  switch (action.type) {
    case type.OPEN_ASSET_TREEVIEW: {
      if (state.tabs.some((e) => e.title === ASSET_TREEVIEW_TITLE)) return state;
      return {
        ...state,
        isOpen: true,
        tabs: [...state.tabs, { title: ASSET_TREEVIEW_TITLE }],
      };
    }
    case type.OPEN_SCHEDULE_DRILLDOWN: {
      if (state.tabs.some((e) => e.title === DRILLDOWN_TITLE)) return {
        ...state,
        tabs: state.tabs.map((e) => (e.title === DRILLDOWN_TITLE? {...e, response: action.payload.response} : e))
      };
      return {
        ...state,
        isOpen: true,
        tabs: [...state.tabs, { title: DRILLDOWN_TITLE, response: action.payload.response}],
      };
    }

    case type.CLOSE_ASSET_TREEVIEW:
      return {
        ...state,
        isOpen: state.tabs.some((e) => e.title === DRILLDOWN_TITLE),
        tabs: state.tabs.filter(tab => tab.title !== ASSET_TREEVIEW_TITLE)
      }

    case type.CLOSE_SCHEDULE_DRILLDOWN:
      return {
        ...state,
        isOpen: state.tabs.some((e) => e.title === ASSET_TREEVIEW_TITLE),
        tabs: state.tabs.filter(tab => tab.title !== DRILLDOWN_TITLE)
      }
    case type.CLOSE_ALL:
      return rightPanelInitialState;

    default:
      return state;
  }
};
