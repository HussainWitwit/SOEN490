import { handleActions } from 'redux-actions';
import { combineActions } from 'redux-actions';
import { createActions } from 'redux-actions';

export const titleReducer = (state = "", action) => {
    switch(action.type){
        case'TITLE': 
            return state = action.payload;
        default:
            return "Undefined"
    }
}

export const assetReducer = (state = "", action) => {
    switch(action.type){
        case'ASSET': 
            return state = action.payload;
        default:
            return "Undefined"
    }
}

export const centerPointReducer = (state = "", action) => {
    switch(action.type){
        case'CENTERPOINT': 
            return state = action.payload;
        default:
            return "Undefined"
    }
}

export const spanReducer = (state = null, action) => {
    switch(action.type){
        case'SPAN': 
            return state = action.payload;
        default:
            return "Undefined"
    }
}

export const setParam = createActions({
    SETTITLE2: title => ({title}),
    SETSPAN2: span => ({span})
})

export const reducer = handleActions(
    {
      [combineActions('SETTITLE2', 'SETSPAN2')]: 
     (
         state, 
         {payload: {title, span}}
     ) => {
         return {
             ...state, titleAtt: state.titleAtt = title, spanAtt: state.spanAtt = span };
         }
     },
     
    {titleAtt: "Undefine", spanAt: "Undefine"}
  );






