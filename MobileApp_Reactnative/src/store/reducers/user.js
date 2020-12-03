import {
    LOGOUT_LOADING, LOGOUT_SUCCESS, LOGOUT_FAILED, LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILED
} from '../types'

const initialState = {
    user: null,
    userLoading: false,
    userStatus: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_LOADING:
            return { ...state, user: true, userLoading: true }
        case LOGIN_SUCCESS:
            return {
                ...state, userLoading: false, user: action.payload
            }
        case LOGIN_FAILED:
            return { ...state, userLoading: false, userStatus: action.error, user: null }

        case LOGOUT_LOADING:
            return { ...state, userLoading: true }
        case LOGOUT_SUCCESS:
            return {
                ...state, userLoading: false, user: null
            }
        case LOGOUT_FAILED:
            return { ...state, userLoading: false, userStatus: action.error, user: null }

        default:
            return state;
    }
}