import * as dispatchType from '../dispatch-types';
import * as action from '../reducer-actions';

describe('Verifying actions', () => {

  it('fires an update template  action of the name', () => {
    const value = "Yearly Wash Optimization";
    const expectedAction = {
      type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_NAME,
      payload: {
        name: value
      }
    }
    expect(action.setTemplateName(value)).toEqual(expectedAction);
  });

  it('fires an update template  action of the description', () => {
    const value = "This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.";
    const expectedAction = {
      type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_DESCRIPTION,
      payload: {
        description: value
      }
    }
    expect(action.setTemplateDescription(value)).toEqual(expectedAction);
  });

  it('fires an update template  action of the template input list', () => {
    const value = ["Span Increment", "Center Point Increment", "Accelerator", "Soiling Season Buffer"];
    const expectedAction = {
      type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_INPUTLIST,
      payload: {
        inputList: value
      }
    }
    expect(action.setInputList(value)).toEqual(expectedAction);
  });

  it('fires an update template  action of the algorithm name', () => {
    const value = "Yearly Wash Optimization";
    const expectedAction = {
      type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_ALGORITHM,
      payload: {
        algorithmName: value
      }
    }
    expect(action.setAlgorithmName(value)).toEqual(expectedAction);
  });

  it('fires an update to the title of the recommendation action', () => {
    const value = " Test";
    const expectedAction = {
      type: dispatchType.UPDATE_TITLE,
      payload: {
        title: value
      }
    }
    expect(action.setTitle(value)).toEqual(expectedAction);
  });

  it('fires an update to asset types taken for a specific recommendation.', () => {
    const value = ["Plant"];
    const expectedAction = {
      type: dispatchType.UPDATE_ASSET_TYPES,
      payload: {
        assetTypeList: value
      }
    }
    expect(action.updateAssetTypes(value)).toEqual(expectedAction);
  });



  it('fires an update to the assets selected', () => {
    const value = [{ name: "Asset 3", id: 0 }, { name: "Asset test", id: 1 }];
    const expectedAction = {
      type: dispatchType.UPDATE_ASSET,
      payload: {
        asset: value
      }
    }
    expect(action.updateAsset(value)).toEqual(expectedAction);
  });

  it('fires an update to the preferred scenario, setting it to netSaving', () => {
    const value = "Net Saving";
    const expectedAction = {
      type: dispatchType.UPDATE_PREFERRED_SCENARIO,
      payload: {
        preferredScenario: value
      }
    }
    expect(action.setPreferredScenario(value)).toEqual(expectedAction);
  });

  it('fires an update to the granularity, change it to weekly', () => {
    const value = "Weekly";
    const expectedAction = {
      type: dispatchType.UPDATE_GRANULARITY,
      payload: {
        granularity: value
      }
    }
    expect(action.setGranularity(value)).toEqual(expectedAction);
  });

  it('fires an update to the repeat day of the week, change it to Sunday', () => {
    const value = 0;
    const expectedAction = {
      type: dispatchType.UPDATE_REPEAT_DAY,
      payload: {
        repeatDay: value
      }
    }
    expect(action.setRepeatDay(value)).toEqual(expectedAction);
  });

  it('fires an update to the repeat date', () => {
    const value = "2020/01/01";
    const expectedAction = {
      type: dispatchType.UPDATE_REPEAT_DATE,
      payload: {
        repeatDate: value
      }
    }
    expect(action.setRepeatDate(value)).toEqual(expectedAction);
  });

  it('fires an update to the repeat time', () => {
    const value = "09:31 AM";
    const expectedAction = {
      type: dispatchType.UPDATE_REPEAT_TIME,
      payload: {
        repeatTime: value
      }
    }
    expect(action.setRepeatTime(value)).toEqual(expectedAction);
  });

  it('fires an update that sets the dialog to open to true', () => {
    const expectedAction = {
      type: dispatchType.TOGGLE_DIALOG,
    }
    expect(action.toggleDialog()).toEqual(expectedAction);
  });

  it('fires an update that sets the dialog to close and sets back the store states to their initial values', () => {
    const expectedAction = {
      type: dispatchType.SET_BACK_TO_INITIAL_VALUES
    }
    expect(action.setBackToInitialValues()).toEqual(expectedAction);
  });

  it('fires an update that sets the state of the AddRecommendation pop up to editing ', () => {
    const expectedAction = {
      type: dispatchType.EDITING_EXISTING_CONFIGURED_RECOMMENDATION
    }
    expect(action.setEditable()).toEqual(expectedAction);
  });

  it('fires an update that sets the id of the editing recommendation ', () => {
    const expectedAction = {
      type: dispatchType.UPDATE_ID,
      payload: {
        id: 1,
      },
    }
    expect(action.setId(1)).toEqual(expectedAction);
  });

  it('fires an update that sets the parameter list of a recommendation to a new one. ', () => {
    const expectedAction = {
      type: dispatchType.SET_PARAM_VALUE_FROM_EDIT,
      payload: ['params 1', 'params 2'],
    }
    expect(action.setParamValuesFromEdit(['params 1', 'params 2'])).toEqual(expectedAction);
  });

  it('fires an update that update the value of a specific parameter. ', () => {
    const expectedAction = {
      type: dispatchType.UPDATE_PARAM_VALUE,
      payload: {value: "-200", paramIndex: 0}
    }
    expect(action.setParamValue("-200", 0)).toEqual(expectedAction);
  });

});
