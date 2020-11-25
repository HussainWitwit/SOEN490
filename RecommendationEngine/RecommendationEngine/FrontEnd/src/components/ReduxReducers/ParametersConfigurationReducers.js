import { handleAction } from 'redux-actions';
import { combineActions } from 'redux-actions';
import {createAction} from 'redux-actions';

export const setTitle = createAction('TITLE', title => title);
export const setSpan = createAction('SPAN', span => span);

export const titleReducer = (state = "", action) => {
    switch(action.type){
        case'TITLE': 
            return state = action.payload;
        default:
            return "Underfined"
    }
}

// export const combinedReducer = handleActions(
//     {
//       [combineActions(setTitle, setSpan)]: (
//         state,
//         { payload: {  } }
//       ) => {
//         return { ...state, counter: state.counter + amount };
//       }
//     },
//     { counter: 10 }
//   );


export const assetReducer = (state = "", action) => {
    switch(action.type){
        case'ASSET': 
            return state = action.payload;
        default:
            return "Underfined"
    }
}

export const centerPointReducer = (state = "", action) => {
    switch(action.type){
        case'CENTERPOINT': 
            return state = action.payload;
        default:
            return "Underfined"
    }
}

export const spanReducer = (state = "", action) => {
    switch(action.type){
        case'SPAN': 
            return state = action.payload;
        default:
            return "Underfined"
    }
}





