import {combineReducers} from 'redux';
import { centerPointReducer, spanReducer, titleReducer, assetReducer, reducer } from './ParametersConfigurationReducers';
import { combinedReducer } from './DateConfigurationReducers';

const allReducers = combineReducers ({

    //Test
    combinedReducer:reducer,

    //Date Configuration
    combine: combinedReducer,

    //Parameters Configuration Dialog 
    title: titleReducer,
    asset: assetReducer,
    centerPoint: centerPointReducer,
    span: spanReducer,
});

export default allReducers;