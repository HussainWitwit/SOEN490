import { combineReducers } from 'redux'
import { addRecDialogContentReducer } from '../containers/AddRecommendationDialog/redux/reducer';

const rootReducer = combineReducers({
  addRecommendation: addRecDialogContentReducer,
})

export default rootReducer
