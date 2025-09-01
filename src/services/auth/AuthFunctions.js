import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  startLoading,
  endLoading,
  loginSuccess,
  loginFailure,
  logout,
} from '../redux/slices/authSlice';
import pb from '../PocketBase/pocketbase';
import Snackbar from 'react-native-snackbar';
import {ClientResponseError} from 'pocketbase';

// ✅ FUNCIÓN DE LOGIN MEJORADA - Acepta objeto credentials
export const loginUser = credentials => async dispatch => {
  dispatch(startLoading());

  try {
    let authData;

    // ✅ Manejar tanto email como username
    if (credentials.email) {
      // Login con email
      authData = await pb
        .collection('users')
        .authWithPassword(credentials.email, credentials.password);
    } else if (credentials.username) {
      // Login con username
      authData = await pb
        .collection('users')
        .authWithPassword(credentials.username, credentials.password);
    } else {
      throw new Error('Email o username requerido');
    }

    if (authData) {
      console.log('Autenticación CORRECTA');
      await AsyncStorage.setItem('userToken', pb.authStore.token);
      const username = pb.authStore.model.username;
      dispatch(loginSuccess({user: username, token: pb.authStore.token}));
    }
  } catch (error) {
    handleAuthError(error, dispatch, 'login');
  }
};

// ✅ FUNCIÓN DE REGISTRO MEJORADA - Sin cambios pero con mejor manejo de errores
export const registerUser =
  (username, email, password, passwordConfirm) => async dispatch => {
    dispatch(startLoading());

    const newUserData = {
      username: username,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    };

    try {
      const newUser = await pb.collection('users').create(newUserData);

      // ✅ Mostrar mensaje de éxito
      Snackbar.show({
        text: 'Usuario registrado exitosamente. Ahora puedes iniciar sesión.',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#4CAF50',
      });

      dispatch(endLoading());
    } catch (error) {
      handleAuthError(error, dispatch, 'register');
    }
  };

// ✅ FUNCIÓN AUXILIAR PARA MANEJO DE ERRORES MEJORADO
const handleAuthError = (error, dispatch, context) => {
  console.error(`Error en ${context}:`, error);

  if (error instanceof ClientResponseError) {
    let errorMessage = '';

    if (context === 'login') {
      if (error.message.includes('Failed to authenticate')) {
        errorMessage = 'Usuario/email o contraseña incorrectos.';
      } else if (error.status === 400) {
        errorMessage = 'Datos de login inválidos.';
      } else if (error.status === 404) {
        errorMessage = 'Usuario no encontrado.';
      } else {
        errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
      }
    } else if (context === 'register') {
      if (error.message.includes('Failed to create record')) {
        const {data} = error;
        const emailError = data?.data?.email?.message;
        const usernameError = data?.data?.username?.message;
        const passwordError = data?.data?.password?.message;

        if (emailError && usernameError) {
          errorMessage = 'El correo y el nombre de usuario ya están en uso.';
        } else if (emailError) {
          errorMessage = 'El correo electrónico ya está en uso.';
        } else if (usernameError) {
          errorMessage = 'El nombre de usuario ya está en uso.';
        } else if (passwordError) {
          errorMessage = 'La contraseña no cumple los requisitos.';
        } else {
          errorMessage = 'Error al crear la cuenta. Verifica tus datos.';
        }
      } else {
        errorMessage = 'Error al registrar usuario.';
      }
    }

    // ✅ Mostrar error específico
    Snackbar.show({
      text: errorMessage,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: '#f44336',
    });

    dispatch(loginFailure(errorMessage));
  } else {
    // Error de red u otro tipo
    const networkError = 'Error de conexión. Verifica tu internet.';
    Snackbar.show({
      text: networkError,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: '#f44336',
    });
    dispatch(loginFailure(networkError));
  }

  dispatch(endLoading());
};

// ✅ FUNCIÓN DE LOGOUT - Sin cambios
export const logoutUser = () => async dispatch => {
  await AsyncStorage.removeItem('userToken');
  pb.authStore.clear();
  dispatch(logout());
};

// ✅ FUNCIÓN DE VERIFICACIÓN DE AUTENTICACIÓN - Sin cambios
export const checkUserAuthentication = () => async dispatch => {
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
        dispatch(loginSuccess({user: username, token: pb.authStore.token}));
      } else {
        dispatch(logout());
      }
      dispatch(endLoading());
    } else {
      dispatch(logout());
      dispatch(endLoading());
    }
  } catch (error) {
    console.error('Error en checkUserAuthentication:', error);
    Snackbar.show({
      text: 'Error al recuperar la sesión.',
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: '#f44336',
    });
    dispatch(endLoading());
  }
};

// ✅ FUNCIÓN DE ACTUALIZACIÓN DE USUARIO - Sin cambios
export const updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await pb.collection('users').update(userId, updateData);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
};

// ✅ FUNCIÓN AUXILIAR PARA VALIDACIÓN (Opcional - uso interno)
export const validateCredentials = credentials => {
  if (!credentials || (!credentials.email && !credentials.username)) {
    throw new Error('Email o username requerido');
  }

  if (!credentials.password) {
    throw new Error('Contraseña requerida');
  }

  // Validar formato de email si se proporciona
  if (credentials.email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(credentials.email)) {
      throw new Error('Formato de email inválido');
    }
  }

  // Validar username si se proporciona
  if (credentials.username) {
    if (credentials.username.length < 3) {
      throw new Error('Username debe tener al menos 3 caracteres');
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(credentials.username)) {
      throw new Error(
        'Username solo puede contener letras, números y guión bajo',
      );
    }
  }

  return true;
};
