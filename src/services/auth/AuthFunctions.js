import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';
import pb from '../PocketBase/pocketbase';

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        const userData = {
            user: authData.record,
            token: authData.token,
        };
        await AsyncStorage.setItem('userToken', authData.token);
        dispatch(loginSuccess(userData));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const registerUser = (username, email, password, passwordConfirm) => async (dispatch) => {
    if (password !== passwordConfirm) {
        dispatch(loginFailure('Las contraseñas no coinciden.'));
        return;
    }
    dispatch(startLoading());
    newUserData = {
        "username": username,
        "email": email,
        "password": password,
        "passwordConfirm": passwordConfirm,
    };
    try {
        const newUser = await pb.collection('users').create(newUserData);
         
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const logoutUser = () => async (dispatch) => {
    await AsyncStorage.removeItem('userToken');
    pb.authStore.clear();
    dispatch(logout());
};

export const checkUserAuthentication = () => async (dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        pb.authStore.save(token);
        const user = pb.authStore.model;
        if (user) {
            dispatch(loginSuccess({ user, token }));
        } else {
            dispatch(logout());
        }
    } else {
        dispatch(logout());
    }
};
