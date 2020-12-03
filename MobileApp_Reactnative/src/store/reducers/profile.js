import {
    GET_PROFILE_LOADING, GET_PROFILE_SUCCESS, GET_PROFILE_FAILED
} from '../types'

const initialState = {
    getProfileLoading: false,
    getProfileError: undefined,
    profile: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_LOADING:
            return { ...state, getProfileLoading: true, getProfileError: undefined }
        case GET_PROFILE_SUCCESS:
            return { ...state, profile: action.payload, getProfileLoading: false, getProfileError: undefined }
        case GET_PROFILE_FAILED:
            return { ...state, getProfileLoading: false, getProfileError: action.error }
        default:
            return state
    }
}