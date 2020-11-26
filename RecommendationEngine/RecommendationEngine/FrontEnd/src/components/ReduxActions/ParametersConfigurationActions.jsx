import { createActions } from 'redux-actions';


export const setTitle = title => {
    return{
        type: 'TITLE',
        payload: title,
    };
};

export const setAsset = asset => {
    return{
        type: 'ASSET',
        payload: asset,
    };
};

export const setCenterPoint = centerpoint => {
    return{
        type: 'CENTERPOINT',
        payload: centerpoint,
    };
};

export const setSpan = span => {
    return{
        type: 'SPAN',
        payload: span,
    };
};

// export const {setTitle2, setSpan2} = createActions({
//     TITLE: title => ({title}),
//     SPAN: span => ({span})
// })




