import { createStore } from 'redux';
import { addRecDialogContentReducer } from './containers/AddRecommendationDialog/redux/reducer';
import { combineReducers } from 'redux';

// const reducers = combineReducers ({

// });
// export default allReducers;

export const store = createStore(addRecDialogContentReducer);