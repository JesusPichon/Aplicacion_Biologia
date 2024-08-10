import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';
import pb from '../PocketBase/pocketbase';
import Snackbar from 'react-native-snackbar';

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
        
        //dispatch(loginFailure(error.message));

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
            const user = pb.authStore.model;

            if (user) {
                dispatch(loginSuccess({ user, token }));
            } else {
                await pb.collection('users').authRefresh();
                const refreshedUser = pb.authStore.model;

                if (refreshedUser) {
                    await AsyncStorage.setItem('userToken', pb.authStore.token);
                    dispatch(loginSuccess({ user: refreshedUser, token: pb.authStore.token }));
                } else {
                    dispatch(logout());
                }
            }
        } else {
            dispatch(logout());
        }
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            dispatch(loginFailure('No se pudo conectar al servidor. Verifique su conexión a internet.'));
        } else {
            const errorMessage = error?.data?.message || error.message || 'Ocurrió un error';
            dispatch(loginFailure(errorMessage));

            if (error.message.includes('Unauthorized') || error.message.includes('Invalid token')) {
                await AsyncStorage.removeItem('userToken');
            }
        }
        dispatch(logout());
    }
};

