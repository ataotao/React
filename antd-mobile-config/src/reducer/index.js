import { combineReducers } from 'redux';
import * as type from '../action/type';

const handleData = (state = {isFetching: true, res: {}, params: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, res: action.res, params: action.params};
        default:
            return {...state};
    }
};
const httpData = (state = {}, action) => {
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state,
                [action.category]: handleData(state[action.category], action)
            };
        default:
            return {...state};
    }
};

// 利用combineReducers组合多个reducer
export default combineReducers({
    httpData
});
