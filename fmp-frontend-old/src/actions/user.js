import axiosInstance from "../axiosAPI";
import {toast} from 'react-toastify';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    };
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.clear();
        dispatch(receiveLogout());
    };
}

export function loginUser(payload) {
    return async(dispatch) => {

        try {
            console.log(payload.creds)
            const response = await axiosInstance.post('/token/obtain/', {
                username: payload.creds.username,
                password: payload.creds.password
            });
            console.log(response)
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            
            
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('authenticated', true);
            toast.success("You've logged in successfully");
            payload.history.push('/app');
            
            dispatch(receiveLogin());
            
            return response.data;
        } catch (error) {
            dispatch(loginError('Something went wrong please try again'));
            throw error;
        }

    }
}
