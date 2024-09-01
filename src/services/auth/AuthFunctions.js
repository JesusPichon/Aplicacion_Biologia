import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, endLoading, loginSuccess, loginFailure, logout } from '../redux/slices/authSlice';
import pb from '../PocketBase/pocketbase';
import Snackbar from 'react-native-snackbar';
import { ClientResponseError } from 'pocketbase';

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(startLoading());
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        if (authData) {
            console.log("Autenticacion CORRECTA");
            await AsyncStorage.setItem('userToken', pb.authStore.token);
            const username = pb.authStore.model.username;
            dispatch(loginSuccess({ user: username, token: pb.authStore.token }));
        }
    } catch (error) {
        if (error instanceof ClientResponseError) {
            if (error.message.includes('Failed to authenticate')) {
                Snackbar.show({
                    text: 'Correo o contraseña incorrectos.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: '#ff0000',
                });
                dispatch(loginFailure('Correo o contraseña incorrectos.'));
            }else {
                Snackbar.show({
                    text: 'Error al procesar la solicitud.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: '#ff0000',
                });
                dispatch(loginFailure('Error al procesar la solicitud.'));
            }
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
        if (error instanceof ClientResponseError) {
            if (error.message.includes('Failed to create record')) {
                const { data } = error;  // Extraer los datos del error
                let errorMessage = '';

                // Verificar si hay errores en el email y username
                const emailError = data?.data.email?.message;
                const usernameError = data?.data.username?.message;

                if (emailError && usernameError) {
                    // Ambos errores están presentes
                    errorMessage = "El correo y el nombre de usuario son inválidos o ya están en uso.";
                } else if (emailError) {
                    // Solo el error de correo
                    errorMessage = "El correo es inválido o ya está en uso.";
                } else if (usernameError) {
                    // Solo el error de nombre de usuario
                    errorMessage = "El nombre de usuario es inválido o ya está en uso.";
                }

                if (errorMessage) {
                    // Mostrar un solo Snackbar con el mensaje combinado
                    console.error('Mensaje de error final:', errorMessage);
                    // Aquí llamas a tu función para mostrar el Snackbar con el mensaje
                    Snackbar.show({
                        text: errorMessage,
                        duration: Snackbar.LENGTH_LONG,
                        backgroundColor: '#ff0000',
                    });
                }
            }else{
                Snackbar.show({
                    text: 'Error al procesar la solicitud.',
                    duration: Snackbar.LENGTH_LONG,
                    backgroundColor: '#ff0000',
                });
                dispatch(loginFailure('Error al procesar la solicitud.'));
            }
        } else {
            console.error('Error desconocido:', error);
        }
    }
};

export const logoutUser = () => async (dispatch) => {
    await AsyncStorage.removeItem('userToken');
    pb.authStore.clear();
    dispatch(logout());
};

export const checkUserAuthentication = () => async (dispatch) => {
    try {
        dispatch(startLoading());
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
            dispatch(endLoading());
        } else {
            dispatch(logout());
            dispatch(endLoading());
        }
    } catch (error) {
        //console.error('Error en checkUserAuthentication:', error);
        Snackbar.show({
            text: 'Error recuperar la sesión.',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: '#ff0000',
        });
        dispatch(endLoading());
        // Manejo de errores
    }
};

export const updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await pb.collection('users').update(userId, updateData);

        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
};

