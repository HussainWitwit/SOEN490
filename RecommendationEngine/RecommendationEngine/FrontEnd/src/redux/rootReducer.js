import { combineReducers } from 'redux'
import { ManageRecommendationReducer } from './ManageRecommendationReducer/reducer';
import { SharedReducer } from './SharedReducer/reducer';
import { RightPanelReducer } from './RightPanelReducer/reducer'
import { AssetFilterReducer } from './AssetFilterReducer/reducer'

/**
 * Add your reducer here... Each reducer should have its own folder. 
 * In each folder, you must have reducer actions, reducer and dispatch types files.
 */
const rootReducer = combineReducers({
  manageRecommendationReducer: ManageRecommendationReducer,
  sharedReducer: SharedReducer,
  rightPanelReducer: RightPanelReducer,
  assetFilterReducer: AssetFilterReducer
})

export default rootReducer
