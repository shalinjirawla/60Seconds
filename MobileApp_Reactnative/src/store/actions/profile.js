// import { BASE_URL } from '../../config/Settings'
import {
    GET_PROFILE_LOADING, GET_PROFILE_SUCCESS, GET_PROFILE_FAILED
} from '../types'
import { axiosInstance } from '../../api/Services';
import Storage from '../../api/Storage';


export const getProfileAPI = (pageIndex, pageSize) => {
    return async dispatch => {

        try {
            const { userId } = await Storage.get('sixty_data') || null;

            if (userId === null)
                getProfileFailed(dispatch, "Profile was not retrieved successfully.")

            getProfile(dispatch)
            axiosInstance
                .get(`/User/${userId}`)
                .then(response => {
                    if (response.status === 200) {
                        getProfileSuccess(dispatch, response.data.data)
                    } else {
                        getProfileFailed(dispatch, "Profile was not retrieved successfully.")
                    }
                }).catch(err => {
                    getProfileFailed(dispatch, err.response)
                })
        }
        catch (error) {
            console.log('getProfileAPI error', error)
            getProfileFailed(dispatch, error.response)
        }

    }
}

const getProfile = (dispatch) => dispatch({ type: GET_PROFILE_LOADING })
const getProfileSuccess = (dispatch, payload) => dispatch({ type: GET_PROFILE_SUCCESS, payload })
const getProfileFailed = (dispatch, error) => dispatch({ type: GET_PROFILE_FAILED, error })