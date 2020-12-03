import {
    LOGIN_SUCCESS, LOGIN_LOADING, LOGIN_FAILED,
    LOGOUT_LOADING, LOGOUT_SUCCESS, LOGOUT_FAILED
} from '../types'
import { axiosInstance } from '../../api/Services'
import Settings, { BASE_URL } from '../../config/Settings'
import { ToQueryString } from '../../utils/QueryStringBuilder'
import Storage from '../../api/Storage'

import { NavigationActions } from 'react-navigation';

export const authenticateAPI = (request) => {
    return async dispatch => {
        await axiosInstance
            .post(`/Login/Authenticate`, request, { isAuth0Auth: false, isAuth: false })
            .then(async response => {

                if (response.status === 200) {
                    if (response.data.responseType === "ERROR") {
                        authenticateSuccess(dispatch, response.data)
                    } else {
                        await Storage.set("permissions", response.data.data.permissions)
                        authenticateSuccess(dispatch, response.data)
                    }
                } else {
                    authenticateFailed(dispatch, "Could not authenticate user.")
                }
            }).catch(err => {
                authenticateFailed(dispatch, "Could not authenticate user.")
            })

    }
}

export const logout = (navigation) => {
    return async dispatch => {

        try {
            logoutLoading(dispatch);

            const queryParams = ToQueryString({
                client_id: Settings.AUTH0_LOGIN_CLIENT_ID
            });
            const authUrl = `${Settings.AUTH_URL}/v2/logout` + queryParams;

            await axiosInstance.get(authUrl, { isAuth0Auth: true });
            await axiosInstance.put(`/Logout`, {}, { isAuth0Auth: false });


            await Storage.remove('token') || null;
            await Storage.remove('user') || null;
            await Storage.remove('sixty_data') || null;

            logoutSuccess(dispatch)
            navigation.dispatch(NavigationActions.navigate({ routeName: 'Auth' }));

        } catch (error) {
            console.log('Redux logout error', error);
        }

    }
}

const logoutLoading = (dispatch) => dispatch({ type: LOGOUT_LOADING })
const logoutSuccess = (dispatch) => dispatch({ type: LOGOUT_SUCCESS })
const authenticateSuccess = (dispatch, payload) => dispatch({ type: LOGIN_SUCCESS, payload })
const authenticateFailed = (dispatch, payload) => dispatch({ type: LOGIN_FAILED, payload })

