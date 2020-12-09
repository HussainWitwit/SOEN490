import { combineReducers } from 'redux'
import { AddConfiguredRecDialogReducer } from './AddRecDialogReducer/reducer';
import { ApiReducer } from './ApiReducer/reducer';

const rootReducer = combineReducers({
  addRecommendation: AddConfiguredRecDialogReducer,
  apiReducer: ApiReducer
})

export default rootReducer
