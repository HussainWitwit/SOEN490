import * as dispatchActionType from './dispatch-types';
//Note: All the following Actions target the AddRecommendationDialog Reducer only

//This method will allow you to direct access to all the states value from the store
export const mapDialogStateToProps = (state) => {
    return {
      dialogsContent: state,
      isDialogOpen: state.isDialogOpen,
      template: state.template,
      basicConfiguration: state.basicConfiguration
    };
  };

  
  //This method will allow you to modify the value in the store
  export const mapDispatchToProps = (dispatch) => {
    return {
      setTemplateName: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_RECOMMENDATION_TEMPLATE,
          payload: {
            name: value
            },
        }),
      setTitle: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_TITLE,
          payload: {
            title: value,
          },
        }),
      updateAsset: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_ASSET,
          payload: {
            asset: value,
          },
        }),
      setPreferredScenario: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_PREFERRED_SCENARIO,
          payload: {
            preferredScenario: value,
          },
        }),
      setGranularity: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_GRANULARITY,
          payload: {
            granularity: value,
          },
        }),
      setRepeatDay: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_REPEAT_DAY,
          payload: {
            repeatDay: value,
          },
        }),
      setRepeatDate: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_REPEAT_DATE,
          payload: {
            repeatDate: value,
          },
        }),
      setRepeatTime: (value) =>
        dispatch({
          type: dispatchActionType.UPDATE_REPEAT_TIME,
          payload: {
            repeatTime: value,
          },
        }),
      toggleDialog: () =>
        dispatch({
          type: dispatchActionType.TOGGLE_DIALOG
        }),
      clear: () =>
        dispatch({
          type: dispatchActionType.CLEAR
        })
    };
  };