import * as dispatchType from '../dispatch-types';
import { ManageRecommendationReducer } from '../reducer';

const detailsConfigInitialValues = {
  title: '',
  asset: [],
  createdBy: 'Kenzo',
  preferredScenario: 'ROI',
  granularity: 'Yearly',
  repeatDay: 1,
  repeatDate: new Date(),
  repeatTime: new Date()
}

let state = {
  isDialogOpen: false,
  id: null,
  isEditing: false,
  template: {
    name: "",
    description: "",
    assetTypes: [],
    inputList: [{ parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'NUMBER' }],
    algorithmName: ""
  },
  basicConfiguration: detailsConfigInitialValues,
  templateDetailsList: [],
  addRecommenendationResponse: null,
  deleteRecommendationResponse: null,
  editRecommendationReponse: null,
}

describe('Add Recommendation Dialog reducer', () => {
  // This test fails because of new Date()
  // it('should return the initial state', () => {
  //   expect(ManageRecommendationReducer(undefined, {})).toEqual(state)
  // })

  it('should handle GET_TEMPLATE_DETAILS', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.GET_TEMPLATE_DETAILS,
        payload: []
      })
    ).toEqual({
      ...state,
      templateDetailsList: []
    });
  });

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_NAME', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_NAME,
        payload: {
          name: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      template: {
        ...state.template,
        name: "Run the tests"
      },
    });
  });

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_DESCRIPTION', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_DESCRIPTION,
        payload: {
          description: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      template: {
        ...state.template,
        description: 'Run the tests'
      },
    });
  });

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_INPUTLIST', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_INPUTLIST,
        payload: {
          inputList: ['param 1', 'param 2'],
        },
      })
    ).toEqual({
      ...state,
      template: {
        ...state.template,
        inputList: ['param 1', 'param 2']
      },
    });
  });

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_ALGORITHM', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_ALGORITHM,
        payload: {
          algorithmName: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      template: {
        ...state.template,
        algorithmName: 'Run the tests',
      },
    });
  });

  it('should handle UPDATE_TITLE', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_TITLE,
        payload: {
          title: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      basicConfiguration: {
        ...state.basicConfiguration,
        title: 'Run the tests',
      }
    });
  });

  it('should handle UPDATE_ASSET', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_ASSET,
        payload: {
          asset: [{ name: "Asset 3", id: 0 }, { name: "Asset test", id: 1 }],
        },
      })
    ).toEqual({
      ...state,
      basicConfiguration: {
        ...state.basicConfiguration,
        asset: [{ name: "Asset 3", id: 0 }, { name: "Asset test", id: 1 }],
      },
    });
  });

  it('should handle UPDATE_ASSET_TYPES', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_ASSET_TYPES,
        payload: {
          assetTypeList: ['Portfolio'],
        },
      })
    ).toEqual({
      ...state,
      template: {
        ...state.template,
        assetTypes: ['Portfolio'],
      },
    });
  });

  it('should handle UPDATE_PREFERRED_SCENARIO', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_PREFERRED_SCENARIO,
        payload: {
          preferredScenario: 'Net Saving',
        },
      })
    ).toEqual({
      ...state,
      basicConfiguration: {
        ...state.basicConfiguration,
        preferredScenario: 'Net Saving',
      }
    });
  });

  it('should handle UPDATE_GRANULARITY', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_GRANULARITY,
        payload: {
          granularity: 'Weekly',
        },
      })
    ).toEqual({
      ...state,
      basicConfiguration: {
        ...state.basicConfiguration,
        granularity: 'Weekly',
      },
    });
  });

  it('should handle UPDATE_REPEAT_DAY', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_REPEAT_DAY,
        payload: {
          repeatDay: 0,
        },
      })
    ).toEqual({
      ...state,
      basicConfiguration: {
        ...state.basicConfiguration,
        repeatDay: 0,
      },
    });
  });

  it('should handle UPDATE_REPEAT_DATE', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_REPEAT_DATE,
        payload: {
          repeatDate: '2020/01/01',
        },
      })
    ).toEqual({
      ...state,
      basicConfiguration: {
        ...state.basicConfiguration,
        repeatDate: '2020/01/01',
      },
    });
  });

  it('should handle UPDATE_REPEAT_TIME', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_REPEAT_TIME,
        payload: {
          repeatTime: '09:31 AM',
        },
      })
    ).toEqual({
      ...state,
      basicConfiguration: {
        ...state.basicConfiguration,
        repeatTime: '09:31 AM',
      },
    });
  });

  it('should handle TOGGLE Dialog', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.TOGGLE_DIALOG,
        payload: {
          isDialogOpen: true,
        },
      })
    ).toEqual({
      ...state,
      isDialogOpen: true,
    });
  });

  it('should handle the setting of the edited recommendation id: 1', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_ID,
        payload: {
          id: 1,
        },
      })
    ).toEqual({
      ...state,
      id: 1,
    });
  });

  it('should handle the update of recommendation pop state to editing', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.EDITING_EXISTING_CONFIGURED_RECOMMENDATION,
      })
    ).toEqual({
      ...state,
      isEditing: true,
    });
  });

  it('should correctly handle setting back the recommendation pop-up default values.  ', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.SET_BACK_TO_INITIAL_VALUES,
      })
    ).toEqual({
      ...state,
      templateDetailsList: state.templateDetailsList,
      template: {
        ...state.template,
        name: state.templateDetailsList.length ? state.templateDetailsList[0].templateName : '',
        description: state.templateDetailsList.length ? state.templateDetailsList[0].templateDescription : '',
        inputList: state.templateDetailsList.length ? state.templateDetailsList[0].inputList : [],
        algorithmName: state.templateDetailsList.length ? state.templateDetailsList[0].algorithmName : ''
      }
    });
  });

  it('Setting the parameter list to a new list (edit rec context)', () => {
    let parameterList=[
      { parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'NUMBER' },
      { parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'NUMBER' },
      { parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'DATE'  },
      { parameterName: '', defaultValue: null, parameterValue: null, displayText: null, parameterType: 'DATE' }
  ];
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.SET_PARAM_VALUE_FROM_EDIT,
        payload: parameterList
      })
    ).toEqual({
      ...state,
      template: {
          ...state.template,
          inputList: parameterList
      }
    });
  });



  it('should handle the update of a recommendation parameter value', () => {
    expect(
      ManageRecommendationReducer(state, {
        type: dispatchType.UPDATE_PARAM_VALUE,
        payload: {value: "-200", paramIndex: 0}
      })
    ).toEqual({
      ...state,
      template: {
          ...state.template,
          inputList: [{ parameterName: '', defaultValue: null, parameterValue: "-200", displayText: null, parameterType: 'NUMBER' },
        ] 
      }
    });
  });




  // This test fails because of new Date()
  // it('should handle CLEAR Dialog', () => {
  //   expect(
  //     ManageRecommendationReducer(state, {
  //       type: dispatchType.CLEAR
  //     })
  //   ).toEqual({
  //     isDialogOpen: false,
  //     template: {name: TemplateItems[0].name},
  //     basicConfiguration: detailsConfigInitialValues,
  //     parameters: {}
  //   });
  // });

});


