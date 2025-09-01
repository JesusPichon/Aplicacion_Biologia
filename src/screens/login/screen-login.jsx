import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  StatusBar,
  ImageBackground,
  useColorScheme,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import animaciones from '../../components/animaciones/animaciones';
import styles from './style-login';
import {useSelector, useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {loginUser, registerUser} from '../../services/auth/AuthFunctions';
import {loginFailure} from '../../services/redux/slices/authSlice';
import pb from '../../services/PocketBase/pocketbase';

const Login = ({navigation}) => {
  const {
    unoAnim,
    translateAnimDOWN,
    translateAnimUP,
    startAnimations,
    resetAnimations,
  } = animaciones();

  const dispatch = useDispatch();
  const systemTheme = useColorScheme();
  const {currentTheme, themes} = useSelector(state => state.theme);

  useEffect(() => {
    const initializeLoginScreen = async () => {
      startAnimations();
      dispatch(loginFailure(''));
    };
    initializeLoginScreen();
  }, []);

  const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
  const {
    imageBackgroundInicio,
    logoInicio,
    colorStatusBarInicio,
    iconoUsuario,
    iconoContraseña,
    iconoCorreo,
    colorPrimario,
    colorTerciario,
    colorTexto,
  } = theme;

  const [isLogin, setIsLogin] = useState(true);
  const {error, user, token} = useSelector(state => state.auth);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const [cargando, setCargando] = useState(false);

  const onSubmit = async data => {
    setCargando(true);
    if (isLogin) {
      Keyboard.dismiss();
      await dispatch(loginUser(data.email, data.password));
      const AuthStatus = pb.authStore.isValid;
      if (AuthStatus === true) {
        reset();
        navigation.goBack();
      } else {
        reset();
      }
    } else {
      Keyboard.dismiss();
      await dispatch(
        registerUser(
          data.username,
          data.email,
          data.password,
          data.passwordConfirm,
        ),
      );
      setIsLogin(true);
      reset();
    }
    setCargando(false);
  };

  const rulesPasswordLogin = {required: 'La contraseña es obligatoria'};
  const rulesPasswordRegister = {
    required: 'La contraseña es obligatoria',
    minLength: {
      value: 8,
      message: 'La contraseña debe tener al menos 8 caracteres',
    },
  };

  const rulesEmailLogin = {required: 'Nombre de usuario o Email obligatorio'};
  const rulesEmailRegister = {
    required: 'Email obligatorio',
    pattern: {value: /^\S+@\S+$/i, message: 'Correo electrónico no válido'},
  };

  return (
    <ImageBackground
      source={imageBackgroundInicio}
      resizeMode="cover"
      style={styles.imageBackground}
      imageStyle={styles.imageStyle}>
      <View style={styles.container}>
        <StatusBar animated={true} backgroundColor={colorStatusBarInicio} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          <Animated.View
            style={[
              styles.animatedView,
              {
                transform: [{translateY: translateAnimDOWN}, {scale: unoAnim}],
              },
            ]}>
            <View style={{flex: 1}}></View>
            <ImageBackground
              source={logoInicio}
              resizeMode="contain"
              style={styles.keyboardView2}>
              <Text style={styles.titleText}>Laelia</Text>
            </ImageBackground>
            <View style={{flex: 1}}></View>
          </Animated.View>

          <Animated.View
            style={[
              styles.animatedView2,
              {
                opacity: unoAnim,
                transform: [{translateY: translateAnimUP}],
              },
            ]}>
            <View style={styles.viewForm}>
              {!isLogin && (
                <View style={styles.viewUserField}>
                  <Image source={iconoUsuario} style={styles.viewUserIcon} />
                  <Controller
                    control={control}
                    name="username"
                    rules={{required: 'El nombre de usuario es obligatorio'}}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: colorPrimario,
                            borderColor: colorTerciario,
                            color: colorTexto,
                          },
                        ]}
                        placeholder="Nombre de Usuario"
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                </View>
              )}
              {errors.username && (
                <Text style={styles.errorText}>{errors.username.message}</Text>
              )}
              <View style={styles.viewUserMailField}>
                <Image
                  source={isLogin ? iconoUsuario : iconoCorreo}
                  style={isLogin ? styles.iconoUsuario : styles.iconoCorreo}
                />
                <Controller
                  control={control}
                  name="email"
                  rules={
                    isLogin === true ? rulesEmailLogin : rulesEmailRegister
                  }
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: colorPrimario,
                          borderColor: colorTerciario,
                          color: colorTexto,
                        },
                      ]}
                      placeholder={
                        isLogin ? 'Nombre de Usuario o Email' : 'Email'
                      }
                      placeholderTextColor="#888"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
              <View style={styles.viewPasswordField}>
                <Image source={iconoContraseña} style={styles.iconoPassword} />
                <Controller
                  control={control}
                  name="password"
                  rules={
                    isLogin === true
                      ? rulesPasswordLogin
                      : rulesPasswordRegister
                  }
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      style={[
                        styles.input,
                        {
                          backgroundColor: colorPrimario,
                          borderColor: colorTerciario,
                          color: colorTexto,
                        },
                      ]}
                      placeholder="Contraseña"
                      secureTextEntry
                      placeholderTextColor="#888"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
              {!isLogin && (
                <View style={styles.viewPasswordField}>
                  <Image
                    source={iconoContraseña}
                    style={styles.iconoPassword}
                  />
                  <Controller
                    control={control}
                    name="passwordConfirm"
                    rules={{
                      required: 'Debes confirmar tu contraseña',
                      validate: value =>
                        value === watch('password') ||
                        'Las contraseñas no coinciden',
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: colorPrimario,
                            borderColor: colorTerciario,
                            color: colorTexto,
                          },
                        ]}
                        placeholder="Confirmar Contraseña"
                        secureTextEntry
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                  />
                </View>
              )}
              {errors.passwordConfirm && (
                <Text style={styles.errorText}>
                  {errors.passwordConfirm.message}
                </Text>
              )}
              {cargando ? (
                <ActivityIndicator size="large" color={colorTerciario} />
              ) : (
                <TouchableOpacity
                  style={[styles.button, {backgroundColor: colorTerciario}]}
                  onPress={handleSubmit(onSubmit)}>
                  <Text style={styles.buttonText}>
                    {isLogin ? 'Ingresar' : 'Registrarse'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.viewToggleLogin}>
              <TouchableOpacity
                style={[
                  styles.loginRegisterButton,
                  {backgroundColor: colorTerciario},
                ]}
                onPress={() => {
                  setIsLogin(!isLogin);
                  reset();
                }}>
                <Text style={[styles.buttonText]}>
                  {isLogin
                    ? '¿No tienes cuenta? Regístrate'
                    : '¿Ya tienes cuenta? Ingresa'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default Login;
