import {counterReducer} from './counter';
import loggedReducer from './isLogged';
import {combineReducers} from 'redux';
import { centerPointReducer, spanReducer, titleReducer, assetReducer } from './ParametersConfigurationReducers';

const allReducers = combineReducers ({

    counter: counterReducer,
    isLogged: loggedReducer,

    //Parameters Configuration Dialog 
    title: titleReducer,
    asset: assetReducer,
    centerPoint: centerPointReducer,
    span: spanReducer,




});

export default allReducers;