import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';
import pb from '../PocketBase/pocketbase';
import Snackbar from 'react-native-snackbar';

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        
        await AsyncStorage.setItem('userToken', pb.authStore.token);
        const username = pb.authStore.model.username;
        dispatch(loginSuccess({ user: username, token: pb.authStore.token }));

    } catch (error) {
        if (error.message.includes('Failed to authenticate')) {
            dispatch(loginFailure('El nombre de usuario o contraseña son incorrectos'));
        }
    }
};

export const registerUser = (username, email, password, passwordConfirm) => async (dispatch) => {
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
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            pb.authStore.save(token);

            await pb.collection('users').authRefresh();

            const user = pb.authStore.model;
            const username = pb.authStore.model.username;
            if (user) {
                await AsyncStorage.setItem('userToken', pb.authStore.token);
                dispatch(loginSuccess({ user: username, token: pb.authStore.token }));
            } else {
                dispatch(logout());
            }
        } else {
            dispatch(logout());
        }
    } catch (error) {
        console.error('Error en checkUserAuthentication:', error);
        // Manejo de errores
    }
};
