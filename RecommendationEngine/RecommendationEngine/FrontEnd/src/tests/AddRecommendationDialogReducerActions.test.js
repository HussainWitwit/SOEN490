import * as dispatchType from '../redux/AddRecDialogReducer/dispatch-types';
import * as action from '../redux/AddRecDialogReducer/reducer-actions';

  describe('Verifying actions', () => {

    it('fires an update template  action', () => {
      const value = " Wash Optimization";
      const expectedAction = {
        type: dispatchType.UPDATE_RECOMMENDATION_TEMPLATE,
        payload: {
          name: value
        }
      }
      expect(action.setTemplateName(value)).toEqual(expectedAction);
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

    it('fires an update to the assets selected', () => {
      const value = [{name: "Asset 3", id: 0}, {name: "Asset test", id: 1}];
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
    it('fires an update that sets the dialog to close and clear all states', () => {
      const expectedAction = {
        type: dispatchType.CLEAR,
      }
      expect(action.clear()).toEqual(expectedAction);
    });



  });
