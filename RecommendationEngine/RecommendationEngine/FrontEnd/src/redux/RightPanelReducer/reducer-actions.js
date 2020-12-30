/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break
 * your logic.
 */
import * as dispatchActionType from './dispatch-types';
import {GetConfiguredRecommendationById, deleteRecommendationById} from '../../api/endpoints/ConfiguredRecommendationEndpoints';
import {getConfiguredRecommendationList} from '../ApiReducer/reducer-actions'

//**Actions --> Useful for unit testing the reducer.
export const openAssetTreeview = () => {
  return {
    type: dispatchActionType.OPEN_ASSET_TREEVIEW,
  };
};

export const openScheduleDrilldown = async (dispatch, id) => {
  const response = await GetConfiguredRecommendationById(id);
  dispatch({
    type: dispatchActionType.OPEN_SCHEDULE_DRILLDOWN,
    payload: {
      response: response
    }
  });
};

export const deleteConfiguredRecommendation = async (dispatch, id) => {
  const response = await deleteRecommendationById(id);
  if(response.status === 200) { 
    //TODO: Successful post, send notifications...
    await getConfiguredRecommendationList(dispatch); //To test
  }
  else {
    //TODO: Error with post, send notifications...
  }
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
export const mapDispatchToProps = (dispatch) => {
  return {
    openAssetTreeview: () => dispatch(openAssetTreeview()),
    openScheduleDrilldown: (id) => openScheduleDrilldown(dispatch, id),
    deleteConfiguredRecommendation: (id) => deleteConfiguredRecommendation(dispatch, id),
    closeAssetTreeview: () => dispatch(closeAssetTreeview()),
    closeScheduleDrilldown: () => dispatch(closeScheduleDrilldown()),
    closeAll: () => dispatch(closeAll()),
    changeTabIndex: (value) => dispatch(changeTabIndex(value))
  };
};
