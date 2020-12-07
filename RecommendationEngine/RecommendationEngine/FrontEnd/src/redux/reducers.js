import { combineReducers } from 'redux'
import { addRecDialogContentReducer } from '../containers/AddRecommendationDialog/redux/reducer';
import { AssetsReducer } from '../api/redux/reducer';

const rootReducer = combineReducers({
  addRecommendation: addRecDialogContentReducer,
  assetReducer: AssetsReducer
})

export default rootReducer
