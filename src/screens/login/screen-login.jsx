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
import {Icon} from '@rneui/themed';

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

  // Estados para controlar la visibilidad de las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    colorTitulo,
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
      identifier: '', // Cambiado de 'email' a 'identifier'
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const [cargando, setCargando] = useState(false);

  // VALIDACIONES MEJORADAS
  const getValidationRules = fieldName => {
    switch (fieldName) {
      case 'identifier': // Campo para login
        return {
          required: 'Usuario o email obligatorio',
          validate: value => {
            if (!value?.trim()) return 'Campo obligatorio';

            const isEmail = value.includes('@');
            if (isEmail) {
              // Validar como email
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(value) || 'Formato de email inválido';
            } else {
              // Validar como username
              if (value.length < 3) return 'Usuario mínimo 3 caracteres';
              const usernameRegex = /^[a-zA-Z0-9_]+$/;
              return (
                usernameRegex.test(value) ||
                'Usuario solo puede contener letras, números y _'
              );
            }
          },
        };

      case 'username': // Campo para registro
        return {
          required: 'Nombre de usuario obligatorio',
          minLength: {value: 3, message: 'Mínimo 3 caracteres'},
          maxLength: {value: 20, message: 'Máximo 20 caracteres'},
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Solo letras, números y guión bajo permitidos',
          },
          validate: {
            notOnlyNumbers: value =>
              !/^\d+$/.test(value) || 'No puede ser solo números',
          },
        };

      case 'email': // Campo para registro
        return {
          required: 'Email obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Formato de email inválido',
          },
          validate: {
            maxLength: value => value.length <= 254 || 'Email demasiado largo',
          },
        };

      case 'password':
        if (isLogin) {
          return {required: 'La contraseña es obligatoria'};
        } else {
          return {
            required: 'La contraseña es obligatoria',
            minLength: {value: 8, message: 'Mínimo 8 caracteres'},
            validate: {
              hasUpperCase: value =>
                /[A-Z]/.test(value) || 'Debe contener al menos una mayúscula',
              hasLowerCase: value =>
                /[a-z]/.test(value) || 'Debe contener al menos una minúscula',
              hasNumber: value =>
                /\d/.test(value) || 'Debe contener al menos un número',
            },
          };
        }

      case 'passwordConfirm':
        return {
          required: 'Debes confirmar tu contraseña',
          validate: value =>
            value === watch('password') || 'Las contraseñas no coinciden',
        };

      default:
        return {};
    }
  };

  // ✅ LÓGICA DE ENVÍO MEJORADA
  const onSubmit = async data => {
    setCargando(true);

    if (isLogin) {
      Keyboard.dismiss();

      // Detectar si el identifier es email o username
      const isEmail = data.identifier.includes('@');
      const credentials = {
        [isEmail ? 'email' : 'username']: data.identifier,
        password: data.password,
      };

      await dispatch(loginUser(credentials)); // ✅ Envío mejorado

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

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para alternar la visibilidad de confirmar contraseña
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
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
              <Text style={[styles.titleText, {color: colorTitulo}]}>Laelia</Text>
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
              {/* ✅ CAMPO USERNAME PARA REGISTRO */}
              {!isLogin && (
                <View style={styles.viewUserField}>
                  <Image source={iconoUsuario} style={styles.viewUserIcon} />
                  <Controller
                    control={control}
                    name="username"
                    rules={getValidationRules('username')}
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
                        autoCapitalize="none"
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

              {/* ✅ CAMPO IDENTIFIER PARA LOGIN / EMAIL PARA REGISTRO */}
              <View style={styles.viewUserMailField}>
                <Image
                  source={isLogin ? iconoUsuario : iconoCorreo}
                  style={isLogin ? styles.iconoUsuario : styles.iconoCorreo}
                />
                <Controller
                  control={control}
                  name={isLogin ? 'identifier' : 'email'} // ✅ Campo dinámico
                  rules={getValidationRules(isLogin ? 'identifier' : 'email')}
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
                      placeholder={isLogin ? 'Usuario o Email' : 'Email'} // ✅ Placeholder mejorado
                      placeholderTextColor="#888"
                      autoCapitalize="none"
                      keyboardType={!isLogin ? 'email-address' : 'default'}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
              </View>
              {/* ✅ MOSTRAR ERRORES DINÁMICOS */}
              {isLogin && errors.identifier && (
                <Text style={styles.errorText}>
                  {errors.identifier.message}
                </Text>
              )}
              {!isLogin && errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}

              {/* CAMPO PASSWORD */}
              <View style={styles.viewPasswordField}>
                <Image source={iconoContraseña} style={styles.iconoPassword} />
                <Controller
                  control={control}
                  name="password"
                  rules={getValidationRules('password')}
                  render={({field: {onChange, onBlur, value}}) => (
                    <View style={styles.passwordContainer}>
                      <TextInput
                        style={[
                          styles.inputPassword,
                          {
                            backgroundColor: colorPrimario,
                            borderColor: colorTerciario,
                            color: colorTexto,
                          },
                        ]}
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#888"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.eyeButton}>
                        <Icon
                          name={showPassword ? 'visibility' : 'visibility-off'}
                          type="material"
                          size={20}
                          color="#888"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}

              {/* CAMPO CONFIRMAR PASSWORD PARA REGISTRO */}
              {!isLogin && (
                <View style={styles.viewPasswordField}>
                  <Image
                    source={iconoContraseña}
                    style={styles.iconoPassword}
                  />
                  <Controller
                    control={control}
                    name="passwordConfirm"
                    rules={getValidationRules('passwordConfirm')}
                    render={({field: {onChange, onBlur, value}}) => (
                      <View style={styles.passwordContainer}>
                        <TextInput
                          style={[
                            styles.inputPassword,
                            {
                              backgroundColor: colorPrimario,
                              borderColor: colorTerciario,
                              color: colorTexto,
                            },
                          ]}
                          placeholder="Confirmar Contraseña"
                          secureTextEntry={!showPasswordConfirm}
                          placeholderTextColor="#888"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                        <TouchableOpacity
                          onPress={togglePasswordConfirmVisibility}
                          style={styles.eyeButton}>
                          <Icon
                            name={
                              showPasswordConfirm
                                ? 'visibility'
                                : 'visibility-off'
                            }
                            type="material"
                            size={20}
                            color="#888"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              )}
              {errors.passwordConfirm && (
                <Text style={styles.errorText}>
                  {errors.passwordConfirm.message}
                </Text>
              )}

              {/* BOTÓN DE ENVÍO */}
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

            {/* BOTÓN CAMBIAR MODO */}
            <View style={styles.viewToggleLogin}>
              <TouchableOpacity
                style={[
                  styles.loginRegisterButton,
                  {backgroundColor: colorTerciario},
                ]}
                onPress={() => {
                  setIsLogin(!isLogin);
                  reset();
                  // Resetear visibilidad de contraseñas al cambiar modo
                  setShowPassword(false);
                  setShowPasswordConfirm(false);
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
