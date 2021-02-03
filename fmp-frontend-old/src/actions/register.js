import {toast} from 'react-toastify';
import axiosInstance from "../axiosAPI";
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function receiveRegister() {
    return {
        type: REGISTER_SUCCESS
    };
}

export function registerError(payload) {
    return {
        type: REGISTER_FAILURE,
        payload,
    };
}

export function  registerUser(payload) {
    return async(dispatch) => {

        try {
            const response = await axiosInstance.post('/user/create/', {
                username: payload.creds.username,
                email: payload.creds.email,
                password: payload.creds.password
            });    
            
            toast.success("You've been registered successfully");
            payload.history.push('/login');
        } catch (error) {
            dispatch(registerError('Something was wrong. Try again'));
            console.log(error.stack);
        }
        
     
    }
}
