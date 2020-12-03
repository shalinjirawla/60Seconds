import axios from 'axios';
import Storage from "../api/Storage";
import { BASE_URL } from "../config/Settings";

let isAlreadyFetchingAccessToken = false

// initialise axios
export const axiosInstance = axios.create({
    baseURL: BASE_URL
});

const isAuth = (config = {}) => {
    return config.hasOwnProperty('isAuth') && !config.isAuth ?
        false : true
}

const isAuth0Auth = (config = {}) => {
    return config.hasOwnProperty('isAuth0Auth') && !config.isAuth0Auth ?
        false : true
}

const requestHandler = async (request) => {

    if (isAuth(request)) {

        const { accessToken } = await Storage.get('sixty_data') || null;
        request.headers['Authorization'] = `Bearer ${accessToken}`
    }
    else if (isAuth0Auth(request)) {

        const { access_token } = await Storage.get('token') || null;
        request.headers['Authorization'] = `Bearer ${access_token}`
    }
    return request
}

const responseErrorHandler = async (error) => {

    if (401 === error.response.status && !isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true
        const accessToken = await requestNewToken() || null;

        if (accessToken) {
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;

            return axiosInstance.request(error.config);
        } else {
            return Promise.reject({ ...error })
        }
    }
    return Promise.reject({ ...error })
}

const responseSuccessHandler = (response) => {
    return response
}

const requestNewToken = () => {
    return new Promise(async (resolve) => {

        try {
            const { sub, email } = await Storage.get('user') || null;
            const { access_token } = await Storage.get('token') || null;
            const { accessToken, refreshToken } = await Storage.get('sixty_data') || null;

            let request = {
                "grantType": "refresh_token",
                "email": email,
                "auth0Id": sub,
                "accessToken": accessToken,
                "refreshToken": refreshToken
            };

            axios
                .post(`${BASE_URL}/Login/Authenticate`, request).then(async response => {

                    await Storage.set('sixty_data', response.data.data);
                    await Storage.set('permissions', response.data.data.permissions);
                    const { accessToken } = response.data.data;

                    resolve(accessToken);
                }).catch(err => {
                    resolve(null);
                });
        } catch (error) {
            resolve(null);
        }
    });
}

axiosInstance.interceptors.request.use(
    request => requestHandler(request)
)

axiosInstance.interceptors.response.use(
    response => responseSuccessHandler(response),
    error => responseErrorHandler(error)
)