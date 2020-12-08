import { combineReducers } from 'redux'
import { AddConfiguredRecDialogReducer } from '../containers/AddRecommendationDialog/redux/reducer';
import { ApiReducer } from '../api/redux/reducer';

const rootReducer = combineReducers({
  addRecommendation: AddConfiguredRecDialogReducer,
  apiReducer: ApiReducer
})

export default rootReducer
