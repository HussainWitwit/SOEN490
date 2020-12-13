import { combineReducers } from 'redux'
import { AddConfiguredRecDialogReducer } from './AddRecDialogReducer/reducer';
import { ApiReducer } from './ApiReducer/reducer';

/**
 * Add your reducer here... Each reducer should have its own folder. 
 * In each folder, you must have reducer actions, reducer and dispatch types files.
 */
const rootReducer = combineReducers({
  addRecommendation: AddConfiguredRecDialogReducer,
  apiReducer: ApiReducer
})

export default rootReducer
