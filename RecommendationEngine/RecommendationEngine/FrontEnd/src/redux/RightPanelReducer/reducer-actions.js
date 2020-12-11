/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break
 * your logic.
 */
import * as dispatchActionType from './dispatch-types';

//**GETTER** This method will allow you to have direct access to all the states (the ones you wish to) value from the store
export const mapRightPanelStateToProps = (state) => {
  return {
    all: state,
    isOpen: state.rightPanelReducer.isOpen,
    tabs: state.rightPanelReducer.tabs
  };
};

//**Actions --> Useful for unit testing the reducer.
export const openAssetTreeview = () => {
  return {
    type: dispatchActionType.OPEN_ASSET_TREEVIEW,
  };
};

export const openScheduleDrilldown = (value) => {
  return {
    type: dispatchActionType.OPEN_SCHEDULE_DRILLDOWN,
    payload: {
      response: Math.random()
    },
  };
};

// export const openScheduleDrilldown = async (dispatch) => {
//   const response = await AssetClient.get('asset/getAssetsNested');
//   dispatch({
//     type: dispatchActionType.OPEN_SCHEDULE_DRILLDOWN,
//     payload: {
//       isOpen: true,
//       response: response
//     }
//   });
// };

export const closeAssetTreeview = () => {
  return {
    type: dispatchActionType.CLOSE_ASSET_TREEVIEW,
  };
};

export const closeScheduleDrilldown = (value) => {
  return {
    type: dispatchActionType.CLOSE_SCHEDULE_DRILLDOWN,
  };
};

export const closeAll = () => {
  return {
    type: dispatchActionType.CLOSE_ALL,
  };
};

//This method will allow you to pass the actions as a prop to the connected component in
//order to modify the value in the store
export const mapDispatchToProps = (dispatch) => {
  return {
    openAssetTreeview: (value) => dispatch(openAssetTreeview()),
    openScheduleDrilldown: (value) => dispatch(openScheduleDrilldown(value)),
    closeAssetTreeview: (value) => dispatch(closeAssetTreeview()),
    closeScheduleDrilldown: (value) => dispatch(closeScheduleDrilldown(value)),
    closeAll: () => dispatch(closeAll()),
  };
};
