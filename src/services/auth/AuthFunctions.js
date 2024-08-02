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

// export const checkUserAuthentication = () => async (dispatch) => {
//     const token = await AsyncStorage.getItem('userToken');
//     if (token) {
//         pb.authStore.save(token);
//         const user = pb.authStore.model;
//         console.log(user);
//         if (user) {
//             dispatch(loginSuccess({ user, token }));
//         } else {
//             dispatch(logout());
//         }
//     } else {
//         dispatch(logout());
//     }
// };

export const checkUserAuthentication = () => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        console.log('Token from AsyncStorage:', token);
        if (token) {
            pb.authStore.save(token);
            console.log('Token saved in PocketBase authStore:', pb.authStore.token);
            const user = pb.authStore.model;
            if (user) {
                console.log('Authenticated user:', user);
                dispatch(loginSuccess({ user, token }));
            } else {
                await pb.collection('users').authRefresh();
                const refreshedUser = pb.authStore.model;
                if (refreshedUser) {
                    console.log('Refreshed user:', refreshedUser);
                    dispatch(loginSuccess({ user: refreshedUser, token }));
                } else {
                    console.log('User not found, logging out');
                    dispatch(logout());
                }
            }
        } else {
            console.log('No token found, logging out');
            dispatch(logout());
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        dispatch(logout());
    }
};
