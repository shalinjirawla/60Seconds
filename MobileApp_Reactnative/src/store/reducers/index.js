import { combineReducers } from 'redux';
import task from './task'
import gallery from './gallery'
import profile from './profile'
import user from './user';

const rootReducer = combineReducers({
    task,
    gallery,
    profile,
    user
});


export default rootReducer;