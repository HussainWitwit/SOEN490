import {createAction} from 'redux-actions';


export const setTitle = createAction('TITLE', title => title);

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

export const setSpan = createAction('SPAN', span => span);