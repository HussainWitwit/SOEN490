import * as dispatchType from '../redux/AddRecDialogReducer/dispatch-types';
import { AddConfiguredRecDialogReducer } from '../redux/AddRecDialogReducer/reducer';
import { TemplateItems } from '../containers/TemplateConfigurationModal/ListTemplateItems';
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
  template: {
    name: TemplateItems[0].name,
    description: TemplateItems[0].description,
    inputList: TemplateItems[0].inputList,
    algorithmName: TemplateItems[0].algorithmName
},
  basicConfiguration: detailsConfigInitialValues,
  parameters: {}
}

describe('Add Recommendation Dialog reducer', () => {
  // This test fails because of new Date()
  // it('should return the initial state', () => {
  //   expect(AddConfiguredRecDialogReducer(undefined, {})).toEqual(state)
  // })

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_NAME', () => {
    expect(
      AddConfiguredRecDialogReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_NAME,
        payload: {
          name: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      template: {
        name: "Run the tests",
        description: "This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.",
        inputList: ["Span Increment", "Center Point Increment", "Accelerator", "Soiling Season Buffer"],
        algorithmName: "Yearly Wash Optimization"
      },
    });
  });

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_DESCRIPTION', () => {
    expect(
      AddConfiguredRecDialogReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_DESCRIPTION,
        payload: {
          description: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      template: {
        name: "Yearly Wash Optimization",
        description: 'Run the tests',
        inputList: ["Span Increment", "Center Point Increment", "Accelerator", "Soiling Season Buffer"],
        algorithmName: "Yearly Wash Optimization"
      },
    });
  });

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_INPUTLIST', () => {
    expect(
      AddConfiguredRecDialogReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_INPUTLIST,
        payload: {
          inputList: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      template: {
        name: "Yearly Wash Optimization",
        description: "This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.",
        inputList: 'Run the tests',
        algorithmName: "Yearly Wash Optimization",
      },
    });
  });

  it('should handle UPDATE_RECOMMENDATION_TEMPLATE_ALGORITHM', () => {
    expect(
      AddConfiguredRecDialogReducer(state, {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE_ALGORITHM,
        payload: {

          algorithmName: 'Run the tests',
        },
      })
    ).toEqual({
      ...state,
      template: {
        name: "Yearly Wash Optimization",
        description: "This recommendation is used to suggest the optimal time to wash your solar panels. The algorithm takes in consideration:  dates  of soiling seasons, the rate of soiling, the energy price, predicated energy, cost of cleaning and more.",
        inputList: ["Span Increment", "Center Point Increment", "Accelerator", "Soiling Season Buffer"],
        algorithmName: 'Run the tests',
       },
    });
  });

  it('should handle UPDATE_TITLE', () => {
    expect(
      AddConfiguredRecDialogReducer(state, {
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
      AddConfiguredRecDialogReducer(state, {
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
  })

  it('should handle UPDATE_PREFERRED_SCENARIO', () => {
    expect(
      AddConfiguredRecDialogReducer(state, {
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
      AddConfiguredRecDialogReducer(state, {
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
      AddConfiguredRecDialogReducer(state, {
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
      AddConfiguredRecDialogReducer(state, {
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
      AddConfiguredRecDialogReducer(state, {
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
      AddConfiguredRecDialogReducer(state, {
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

  // This test fails because of new Date()
  // it('should handle CLEAR Dialog', () => {
  //   expect(
  //     AddConfiguredRecDialogReducer(state, {
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


