import * as dispatchType from '../containers/AddRecommendationDialog/redux/dispatch-types';
import { addRecDialogContentReducer } from '../containers/AddRecommendationDialog/redux/reducer';
import { TemplateItems } from '../containers/TemplateConfigurationModal/ListTemplateItems';
const detailsConfigInitialValues = {
  title: '',
  asset: [],
  preferredScenario: '',
  granularity: 'Daily',
  repeatDay: '',
  repeatDate: '',
  repeatTime: ''
}

let state = {
  isDialogOpen: false,
  template: {name: TemplateItems[0].name},
  basicConfiguration: detailsConfigInitialValues,
  parameters: {}
}

describe('Add Recommendation Dialog reducer', () => {
    it('should return the initial state', () => {
      expect(addRecDialogContentReducer(undefined, {})).toEqual(state)
    })
  
    it('should handle UPDATE_RECOMMENDATION_TEMPLATE', () => {
      expect(
        addRecDialogContentReducer(state, {
          type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE,
          payload: {
            name: 'Run the tests',
          },
        })
      ).toEqual({
        ...state,
        template: { name: 'Run the tests' },
      });
    });

    it('should handle UPDATE_TITLE', () => {
      expect(
        addRecDialogContentReducer(state, {
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
        addRecDialogContentReducer(state, {
          type: dispatchType.UPDATE_ASSET,
          payload: {
            asset: [{name: "Asset 3", id: 0}, {name: "Asset test", id: 1}],
          },
        })
      ).toEqual({
        ...state,
        basicConfiguration: {
          ...state.basicConfiguration,
          asset: [{name: "Asset 3", id: 0}, {name: "Asset test", id: 1}],
        },
      });
  })

    it('should handle UPDATE_PREFERRED_SCENARIO', () => {
      expect(
        addRecDialogContentReducer(state, {
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
        addRecDialogContentReducer(state, {
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
        addRecDialogContentReducer(state, {
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
        addRecDialogContentReducer(state, {
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
        addRecDialogContentReducer(state, {
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
        addRecDialogContentReducer(state, {
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

    it('should handle CLEAR Dialog', () => {
      expect(
        addRecDialogContentReducer(state, {
          type: dispatchType.CLEAR
        })
      ).toEqual({
        isDialogOpen: false,
        template: {name: TemplateItems[0].name},
        basicConfiguration: detailsConfigInitialValues,
        parameters: {}
      });
    });

  });


