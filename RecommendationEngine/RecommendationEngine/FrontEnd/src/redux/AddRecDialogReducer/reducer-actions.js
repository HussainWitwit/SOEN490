/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break 
 * your logic.
 */
import * as dispatchActionType from './dispatch-types';
//Note: importing mapDispatchToProps from api reducer so that we could dispatch its actions too.
import { mapDispatchApiToProps } from '../ApiReducer/reducer-actions';

//**GETTER** This method will allow you to have direct access to all the states (the ones you wish to) value from the store
export const mapDialogStateToProps = (state) => {
    return {
      all: state,
      dialogsContent: state.addRecommendation,
      isDialogOpen: state.addRecommendation.isDialogOpen,
      template: state.addRecommendation.template,
      basicConfiguration: state.addRecommendation.basicConfiguration,
      apiAssets: state.apiReducer.flatListAssets,
      isEditing: state.addRecommendation.isEditing
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

  export const isEditable = () => {
    return {
      type: EDITING_EXISTING_CONFIGURED_RECOMMENDATION,
    }
  }

  export const setEditableConfiguredRecommendation = (dispatch, value) => {
    dispatch(setTemplateName(value.type));
    dispatch(updateAsset(value.assetList));
    dispatch(setTitle(value.name));
    dispatch(setPreferredScenario(value.preferredScenario));
    dispatch(setGranularity(value.granularity));
    dispatch(setRepeatDay(value.recurrenceDayOfWeek));
    dispatch(setRepeatDate(new Date(value.recurrenceDatetime)));
    dispatch(setRepeatTime(new Date(value.recurrenceDatetime)));
  }

  
  //This method will allow you to pass the actions as a prop to the connected component in
  //order to modify the value in the store
  export const mapDispatchToProps = (dispatch) => {
    return {
      setTemplateName: (value) =>  dispatch(setTemplateName(value)),
      setTitle: (value) => dispatch(setTitle(value)),
      updateAsset: (value) => dispatch(updateAsset(value)),
      setPreferredScenario: (value) => dispatch(setPreferredScenario(value)),
      setGranularity: (value) => dispatch(setGranularity(value)),
      setRepeatDay: (value) => dispatch(setRepeatDay(value)),
      setRepeatDate: (value) => dispatch(setRepeatDate(value)),
      setRepeatTime: (value) => dispatch(setRepeatTime(value)),
      setEditableConfiguredRecommendation: (value) => setEditableConfiguredRecommendation(dispatch, value),
      toggleDialog: () => dispatch(toggleDialog()),
      clear: () => dispatch(clear()),
    };
  };

  //We can merged multiple mapDispatchToPros. In this case, I need to pass the reducer actions of two different reducers
  export const mapDispatchMergedToProps = (dispatch) => {
    return {
      ...mapDispatchApiToProps(dispatch),
      ...mapDispatchToProps(dispatch)
    }
  }