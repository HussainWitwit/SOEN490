const initialState = {
    title: "",
    granuluarity: ""
}

// export const combinedReducer = (state = initialState, action) => {
//     switch(action.type){
//         case'COMBINED': 
        
//             state= {
//                 ...state,
//                title: state.title = action.payload,
//                granuluarity: state.granuluarity = action.payload 
//     };break
//         default:
//             return state;
//     }
// }

export const combinedReducer = (state="", action) => {
    switch(action.type){
        case'COMBINED': 
        return state = action.payload;
        default:
            return "Undefined";
    }
}

