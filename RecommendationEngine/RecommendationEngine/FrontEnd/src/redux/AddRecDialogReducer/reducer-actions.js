/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break 
 * your logic.
 */
import * as dispatchActionType from './dispatch-types';
//Note: importing mapDispatchToProps from api reducer so that we could dispatch its actions too.
import { mapDispatchApiToProps } from '../ApiReducer/reducer-actions';
import { GetTemplateDetailsInfo } from '../../api/endpoints/TemplateDetailsEndpoints';

//**GETTER** This method will allow you to have direct access to all the states (the ones you wish to) value from the store
  /* istanbul ignore next */
export const mapDialogStateToProps = (state) => {
    return {
      all: state,
      dialogsContent: state.addRecommendation,
      isDialogOpen: state.addRecommendation.isDialogOpen,
      template: state.addRecommendation.template,
      basicConfiguration: state.addRecommendation.basicConfiguration,
      apiAssets: state.apiReducer.flatListAssets,
      isEditing: state.addRecommendation.isEditing,
      templateDetailsList: state.addRecommendation.templateDetailsList,
      configurationId: state.addRecommendation.id
    };
};

//**Actions --> Useful for unit testing the reducer.
export const setTemplateName = (value) => {
  return {
    type: dispatchActionType.UPDATE_RECOMMENDATION_TEMPLATE_NAME,
    payload: {
      name: value
    }
  }
}

export const setTemplateDescription = (value) => {
  return {
    type: dispatchActionType.UPDATE_RECOMMENDATION_TEMPLATE_DESCRIPTION,
    payload: {
      description: value
    }
  }
}

export const setInputList = (value) => {
  return {
    type: dispatchActionType.UPDATE_RECOMMENDATION_TEMPLATE_INPUTLIST,
    payload: {
      inputList: value
    }
  }
}

export const setAlgorithmName = (value) => {
  return {
    type: dispatchActionType.UPDATE_RECOMMENDATION_TEMPLATE_ALGORITHM,
    payload: {
      algorithmName: value
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

  export const setId = (value) => {
    return {
      type: dispatchActionType.UPDATE_ID,
      payload: {
        id: value,
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

export const setBackToInitialValues = () => {
  return {
    type: dispatchActionType.SET_BACK_TO_INITIAL_VALUES
  }
};

export const setRecommendationType = (dispatch, value) => {
  dispatch(setTemplateName(value.templateName));
  dispatch(setTemplateDescription(value.templateDescription));
  dispatch(setInputList(value.inputList));
  dispatch(setAlgorithmName(value.algorithmName));
};

export const setEditable = () => {
    return {
        type: dispatchActionType.EDITING_EXISTING_CONFIGURED_RECOMMENDATION,
    };
};

export const getTemplateDetails = async (dispatch) => {
  const response = await GetTemplateDetailsInfo();
  dispatch({
    type: dispatchActionType.GET_TEMPLATE_DETAILS,
    payload: response,
  })
  if (response.length) {
    setRecommendationType(dispatch, response[0]);
  }
};

  //TODO: Should be testable
  /* istanbul ignore next */
  export const setEditableConfiguredRecommendation = (dispatch, value, id) => {
    dispatch(setTemplateName(value.type));
    dispatch(updateAsset(value.assetList));
    dispatch(setTitle(value.name));
    dispatch(setPreferredScenario(value.preferredScenario));
    dispatch(setGranularity(value.granularity));
    dispatch(setRepeatDay(value.recurrenceDayOfWeek));
    dispatch(setRepeatDate(new Date(value.recurrenceDatetime)));
    dispatch(setRepeatTime(new Date(value.recurrenceDatetime)));
    dispatch(setId(id));
    dispatch(setEditable());
  }

  
  //This method will allow you to pass the actions as a prop to the connected component in
  //order to modify the value in the store
  /* istanbul ignore next */
  export const mapDispatchToProps = (dispatch) => {
    return {
      setTemplateName: (value) =>  dispatch(setTemplateName(value)),
      setTemplateDescription: (value) => dispatch(setTemplateDescription(value)),
      setInputList: (value) => dispatch(setInputList(value)),
      setAlgorithmName: (value) => dispatch(setAlgorithmName(value)),
      setTitle: (value) => dispatch(setTitle(value)),
      updateAsset: (value) => dispatch(updateAsset(value)),
      setPreferredScenario: (value) => dispatch(setPreferredScenario(value)),
      setGranularity: (value) => dispatch(setGranularity(value)),
      setRepeatDay: (value) => dispatch(setRepeatDay(value)),
      setRepeatDate: (value) => dispatch(setRepeatDate(value)),
      setRepeatTime: (value) => dispatch(setRepeatTime(value)),
      setEditableConfiguredRecommendation: (value, id) => setEditableConfiguredRecommendation(dispatch, value, id),
      toggleDialog: () => dispatch(toggleDialog()),
      setBackToInitialValues: () => dispatch(setBackToInitialValues()),
      getTemplateDetails: () => getTemplateDetails(dispatch),
      setRecommendationType: (value) => (setRecommendationType(dispatch, value)),
    };
  }

//We can merged multiple mapDispatchToPros. In this case, I need to pass the reducer actions of two different reducers
  /* istanbul ignore next */
export const mapDispatchMergedToProps = (dispatch) => {
  return {
    ...mapDispatchApiToProps(dispatch),
    ...mapDispatchToProps(dispatch)
  }
}