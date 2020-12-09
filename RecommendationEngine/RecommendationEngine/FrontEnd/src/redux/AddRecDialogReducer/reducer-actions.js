import * as dispatchActionType from './dispatch-types';
//Note: All the following Actions target the AddRecommendationDialog Reducer only
import { mapDispatchApiToProps } from '../ApiReducer/reducer-actions';

//**GETTER** This method will allow you to direct access to all the states value from the store
export const mapDialogStateToProps = (state) => {
    return {
      all: state,
      dialogsContent: state.addRecommendation,
      isDialogOpen: state.addRecommendation.isDialogOpen,
      template: state.addRecommendation.template,
      basicConfiguration: state.addRecommendation.basicConfiguration,
      apiAssets: state.apiReducer.flatListAssets
    };
  };

  //**Actions --> Useful for unit testing the reducer.
  export const setTemplateName = (value) => {
    return {
      type: dispatchActionType.UPDATE_RECOMMENDATION_TEMPLATE,
      payload: {
        name: value
      }
    } 
  }

  export const setTitle = (value) => {
    return {
      type: dispatchActionType.UPDATE_TITLE,
      payload: {
        title: value
      }
    }
  }

  export const updateAsset = (value) => {
    return {
      type: dispatchActionType.UPDATE_ASSET,
      payload: {
        asset: value,
      }
    };
  }

  export const setPreferredScenario = (value) => {
    return {
      type: dispatchActionType.UPDATE_PREFERRED_SCENARIO,
      payload: {
        preferredScenario: value,
      },
    };
  };

  export const setGranularity = (value) => {
    return {
      type: dispatchActionType.UPDATE_GRANULARITY,
      payload: {
        granularity: value,
      },
    };
  };

  export const setRepeatDay = (value) => {
    return {
      type: dispatchActionType.UPDATE_REPEAT_DAY,
      payload: {
        repeatDay: value,
      },
    };
  };

  export const setRepeatDate = (value) => {
    return {
      type: dispatchActionType.UPDATE_REPEAT_DATE,
      payload: {
        repeatDate: value,
      },
    };
  };

  export const setRepeatTime = (value) => {
    return {
      type: dispatchActionType.UPDATE_REPEAT_TIME,
      payload: {
        repeatTime: value,
      },
    };
  };

  export const toggleDialog = () => {
    return {
      type: dispatchActionType.TOGGLE_DIALOG,
    };
  };

  export const clear = () => {
    return {
      type: dispatchActionType.CLEAR,
    };
  };

  
  //This method will allow you to pass the actions as a prop to the connected component in
  //order to modify the value in the store
  export const mapDispatchToProps = (dispatch) => {
    return {
      setTemplateName: (value) => dispatch(setTemplateName(value)),
      setTitle: (value) => dispatch(setTitle(value)),
      updateAsset: (value) => dispatch(updateAsset(value)),
      setPreferredScenario: (value) => dispatch(setPreferredScenario(value)),
      setGranularity: (value) => dispatch(setGranularity(value)),
      setRepeatDay: (value) => dispatch(setRepeatDay(value)),
      setRepeatDate: (value) => dispatch(setRepeatDate(value)),
      setRepeatTime: (value) => dispatch(setRepeatTime(value)),
      toggleDialog: () => dispatch(toggleDialog()),
      clear: () => dispatch(clear()),
    };
  };

  export const mapDispatchMergedToProps = (dispatch) => {
    return {
      ...mapDispatchApiToProps(dispatch),
      ...mapDispatchToProps(dispatch)
    }
  }