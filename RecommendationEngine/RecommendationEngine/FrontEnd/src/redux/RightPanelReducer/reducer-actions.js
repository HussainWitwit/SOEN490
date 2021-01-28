/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break
 * your logic.
 */
import * as dispatchActionType from './dispatch-types';
import { GetConfiguredRecommendationById } from '../../api/endpoints/ConfiguredRecommendationEndpoints';
import { GetActionsByResultId } from '../../api/endpoints/ResultsEndpoints';
import { deleteConfiguredRecommendation } from '../ManageRecommendationReducer/reducer-actions';

//**Actions --> Useful for unit testing the reducer.
export const openAssetTreeview = () => {
  return {
    type: dispatchActionType.OPEN_ASSET_TREEVIEW,
  };
};

/* istanbul ignore next */
export const openScheduleDrilldown = async (dispatch, id) => {
  const response = await GetConfiguredRecommendationById(id);
  dispatch({
    type: dispatchActionType.OPEN_SCHEDULE_DRILLDOWN,
    payload: {
      response: response
    }
  });
};

/* istanbul ignore next */
export const openResultDrilldown = async (dispatch, id) => {
  const response = await GetActionsByResultId(id);
  dispatch({
    type: dispatchActionType.OPEN_RESULT_DRILLDOWN,
    payload: {
      response: response
    }
  })
}

export const closeAssetTreeview = () => {
  return {
    type: dispatchActionType.CLOSE_ASSET_TREEVIEW,
  };
};

export const closeScheduleDrilldown = () => {
  return {
    type: dispatchActionType.CLOSE_SCHEDULE_DRILLDOWN,
  };
};

export const closeResultDrilldown = () => {
  return {
    type: dispatchActionType.CLOSE_RESULT_DRILLDOWN,
  };
};

export const closeAll = () => {
  return {
    type: dispatchActionType.CLOSE_ALL,
  };
};

export const changeTabIndex = (value) => {
  return {
    type: dispatchActionType.CHANGE_TAB_INDEX,
    payload: {
      selectedTabIndex: value
    }
  };
}

//**GETTER** This method will allow you to have direct access to all the states (the ones you wish to) value from the store
/* istanbul ignore next */
export const mapRightPanelStateToProps = (state) => {
  return {
    all: state,
    isOpen: state.rightPanelReducer.isOpen,
    tabs: state.rightPanelReducer.tabs,
    selectedTabIndex: state.rightPanelReducer.selectedTabIndex
  };
};

//This method will allow you to pass the actions as a prop to the connected component in
//order to modify the value in the store
/* istanbul ignore next */
export const mapDispatchToProps = (dispatch) => {
  return {
    openAssetTreeview: () => dispatch(openAssetTreeview()),
    openScheduleDrilldown: (id) => openScheduleDrilldown(dispatch, id),
    openResultDrilldown: (id) => openResultDrilldown(dispatch, id),
    closeAssetTreeview: () => dispatch(closeAssetTreeview()),
    closeScheduleDrilldown: () => dispatch(closeScheduleDrilldown()),
    closeResultDrilldown: () => dispatch(closeResultDrilldown()),
    closeAll: () => dispatch(closeAll()),
    changeTabIndex: (value) => dispatch(changeTabIndex(value))
  };
};

/* istanbul ignore next */
export const mapDispatchDeletePopUpActions = (dispatch) => {
  return {
    closeScheduleDrilldown: () => dispatch(closeScheduleDrilldown()),
    deleteConfiguredRecommendation: (id) => deleteConfiguredRecommendation(dispatch, id)
  }
}