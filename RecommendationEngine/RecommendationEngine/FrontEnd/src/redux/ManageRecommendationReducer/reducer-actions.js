/** All of the following reducer actions will allow any connected component that pass these objects
 * as a param in the connect()() HOC to access value from the store and modify its value.
 * Make sure you don't have multiple components calling those actions in a manner that could break 
 * your logic.
 */
import * as dispatchActionType from './dispatch-types';
import { openScheduleDrilldown } from '../RightPanelReducer/reducer-actions';
import { getConfiguredRecommendationList } from '../SharedReducer/reducer-actions';
import { GetTemplateDetailsInfo } from '../../api/endpoints/TemplateDetailsEndpoints';
import { AddConfiguredRecommendation, EditConfiguredRecommendation, DeleteRecommendationById } from '../../api/endpoints/ConfiguredRecommendationEndpoints';

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

export const updateAssetTypes = (value) => {
  return {
    type: dispatchActionType.UPDATE_ASSET_TYPES,
    payload: {
      assetTypeList: value,
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

/* istanbul ignore next */
export const setRecommendationType = (dispatch, value) => {
  dispatch(setTemplateName(value.templateName));
  dispatch(setTemplateDescription(value.templateDescription));
  dispatch(setInputList(value.inputList));
  dispatch(setAlgorithmName(value.algorithmName));
  dispatch(updateAssetTypes(value.assetTypes));
};

export const setEditable = () => {
  return {
    type: dispatchActionType.EDITING_EXISTING_CONFIGURED_RECOMMENDATION,
  };
};

/* istanbul ignore next */
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

export const setParamValuesFromEdit = (params) => {
  return {
    type: dispatchActionType.SET_PARAM_VALUE_FROM_EDIT,
    payload: params
  }
}

export const setParamValue = (value, index) => {
  return {
    type: dispatchActionType.UPDATE_PARAM_VALUE,
    payload: { value: value, paramIndex: index }
  };
}

/* istanbul ignore next */
export const setEditableConfiguredRecommendation = (dispatch, value, templateType) => {
  dispatch(setTemplateName(value.type));
  dispatch(updateAsset(value.assetList));
  dispatch(setTitle(value.name));
  dispatch(updateAssetTypes(templateType));
  dispatch(setPreferredScenario(value.preferredScenario));
  dispatch(setGranularity(value.granularity));
  dispatch(setRepeatDay(value.recurrenceDayOfWeek));
  dispatch(setRepeatDate(new Date(value.recurrenceDatetime)));
  dispatch(setRepeatTime(new Date(value.recurrenceDatetime)));
  dispatch(setId(value.id));
  dispatch(setParamValuesFromEdit(value.parameters));
  dispatch(setEditable());
}

/* istanbul ignore next */
export const addConfiguredRecommendation = (configuredRecommendation) => async (dispatch, getState) => {
  const response = await AddConfiguredRecommendation(configuredRecommendation);
  dispatch({
    type: dispatchActionType.ADD_CONFIGURED_RECOMMENDATION,
    payload: response,
  });
  const state = getState();
  if (response) {
     dispatch(getConfiguredRecommendationList(state.assetFilterReducer.selectedAsset));
  }
  return response;
}

/* istanbul ignore next */
export const editConfiguredRecommendation = (configuredRecommendation, id) => async (dispatch, getState) => {
  const response = await EditConfiguredRecommendation(configuredRecommendation, id);
  dispatch({
    type: dispatchActionType.EDIT_CONFIGURED_RECOMMENDATION,
    payload: response,
  });
  const state = getState();
  if (response) {
    dispatch(getConfiguredRecommendationList(state.assetFilterReducer.selectedAsset));
    openScheduleDrilldown(dispatch, id);
  }
  return response;
}

/* istanbul ignore next */
export const deleteConfiguredRecommendation = (id) => async (dispatch, getState) => {
  const response = await DeleteRecommendationById(id);
  dispatch({
    type: dispatchActionType.DELETE_CONFIGURE_RECOMMENDATION,
    payload: response
  });
  const state = getState();
  if (response) {
    dispatch(getConfiguredRecommendationList(state.assetFilterReducer.selectedAsset));
  }
  return response;
}

/* istanbul ignore next */
export const postConfiguredRecommendation = async (dispatch, configuredRecommendation, editingState) => {
  if (editingState.isEditing) {
    return dispatch(editConfiguredRecommendation(configuredRecommendation, editingState.id));
  }
  else {
    return dispatch(addConfiguredRecommendation(configuredRecommendation));
  }
}

//**GETTER** This method will allow you to have direct access to all the states (the ones you wish to) value from the store
/* istanbul ignore next */
export const mapDialogStateToProps = (state) => {
  return {
    all: state,
    dialogsContent: state.manageRecommendationReducer,
    apiAssets: state.sharedReducer.nestedAssetsArray
  };
};

export const mapParamDialogStateToProps = (state) => {
  return {
    parameterList: state.manageRecommendationReducer.template.inputList
  };
}

/* istanbul ignore next */
export const mapTemplateStateToProps = (state) => {
  return {
    templateType: state.manageRecommendationReducer.template.assetTypes
  }
}

//This method will allow you to pass the actions as a prop to the connected component in
//order to modify the value in the store
/* istanbul ignore next */
export const mapDispatchToProps = (dispatch) => {
  return {
    setTemplateName: (value) => dispatch(setTemplateName(value)),
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
    setEditableConfiguredRecommendation: (value, templateType) => setEditableConfiguredRecommendation(dispatch, value, templateType),
    toggleDialog: () => dispatch(toggleDialog()),
    setBackToInitialValues: () => dispatch(setBackToInitialValues()),
    getTemplateDetails: () => getTemplateDetails(dispatch),
    setRecommendationType: (value) => (setRecommendationType(dispatch, value)),
    postConfiguredRecommendation: (configuredRecommendation, editingState) => postConfiguredRecommendation(dispatch, configuredRecommendation, editingState),
  };
}

/* istanbul ignore next */
export const mapDispatchParametersPageToProps = (dispatch) => {
  return {
    setParamValue: (value, index) => dispatch(setParamValue(value, index))
  }
}

/* istanbul ignore next */
export const mapDispatchManageRecommendationPageToProps = (dispatch) => {
  return {
    toggleDialog: () => dispatch(toggleDialog()),
    openScheduleDrilldown: (id) => openScheduleDrilldown(dispatch, id)
  }
}

/* istanbul ignore next */
export const mapDispatchDrillDownToProps = (dispatch) => {
  return {
    openScheduleDrilldown: (id) => openScheduleDrilldown(dispatch, id)
  }
}
