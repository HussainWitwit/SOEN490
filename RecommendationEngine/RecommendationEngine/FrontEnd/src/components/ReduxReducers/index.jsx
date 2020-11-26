import {combineReducers} from 'redux';
import { centerPointReducer, spanReducer, titleReducer, assetReducer, reducer } from './ParametersConfigurationReducers';

const allReducers = combineReducers ({

    //Test
    combinedReducer:reducer,

    //Parameters Configuration Dialog 
    title: titleReducer,
    asset: assetReducer,
    centerPoint: centerPointReducer,
    span: spanReducer,
});

export default allReducers;