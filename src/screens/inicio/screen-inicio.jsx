import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
    ImageBackground,
    PermissionsAndroid,
    useColorScheme,
    Appearance,
    AppState,
    StyleSheet,
    TextInput,
    Image,
    Alert,
} from "react-native";
import styles from '../../styles/style-app';
import animaciones from '../../components/animaciones/animaciones';
import { crearTablas } from '../../services/database/SQLite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCache } from "./../../services/storage/CacheContext";
import { useSelector, useDispatch } from 'react-redux';
import { setModeTheme, setTheme } from '../../services/redux/slices/themeSlice';
import { useForm, Controller } from 'react-hook-form';
// import { pb } from '../../services/PocketBase/pocketbase'
import PocketBase from 'pocketbase';

const Inicio = ({ navigation }) => {
    const pb = new PocketBase('https://djd96hdp-8090.usw3.devtunnels.ms/');

    const {
        unoAnim,
        translateAnimDOWN,
        startAnimations,
    } = animaciones();

    const requestWritePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permiso de escritura en almacenamiento externo',
                    message: 'Necesitamos tu permiso para escribir en el almacenamiento externo.',
                    buttonNeutral: 'Preguntar más tarde',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'OK',
                },
            );
            granted;
        } catch (err) {
            console.warn(err);
        }
    };

    const { setCacheData } = useCache();

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@form_default');
            if (jsonValue !== null) {
                const defaultData = JSON.parse(jsonValue);
                setCacheData(defaultData);
            }
        } catch (e) {
            console.error('Error al recuperar datos de AsyncStorage:', e);
        }
    };

    const dispatch = useDispatch();
    const systemTheme = useColorScheme();
    const { currentTheme, themes, modeTheme } = useSelector((state) => state.theme);

    const initializeTheme = async () => {
        try {
            const themeValue = await AsyncStorage.getItem('theme');
            dispatch(setModeTheme(themeValue || 'system'));
        } catch (e) {
            console.error('Error al recuperar datos de AsyncStorage:', e);
        }
    };

    useEffect(() => {
        const initializeApp = async () => {
            await crearTablas();
            await requestWritePermission();
            await getData();
            await initializeTheme();
            startAnimations();
        };
        initializeApp();
    }, []);

    useEffect(() => {
        if (modeTheme === 'system') {
            dispatch(setTheme(systemTheme));
        } else {
            dispatch(setTheme(modeTheme));
        }
    }, [modeTheme, systemTheme]);

    useEffect(() => {
        if (modeTheme === 'system') {
            const handleAppearanceChange = ({ colorScheme }) => {
                dispatch(setTheme(colorScheme));
            };
            const listener = Appearance.addChangeListener(handleAppearanceChange);
            return () => listener.remove();
        }
    }, [modeTheme]);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active' && modeTheme === 'system') {
                dispatch(setTheme(Appearance.getColorScheme()));
            }
        };
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, [modeTheme]);

    const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
    const { imageBackgroundInicio, logoInicio, colorStatusBarInicio, iconoUsuario, iconoContraseña, colorPrimario, colorTerciario, colorTexto } = theme;

    const styles = StyleSheet.create({
        input: {
          backgroundColor: colorPrimario,
          borderColor: colorTerciario,
          color: colorTexto,
          fontWeight: 'bold',
          borderWidth: 2,
          borderRadius: 10,
          paddingLeft: 10,
          marginBottom: 25,
          height: 40,
          width: '85%'
        },
        button: {
          backgroundColor: colorTerciario,
          borderRadius: 25,
          width: '35%',
          paddingVertical: 10,
          alignItems: 'center',
        },
        buttonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        },
        labelText: {
          color: colorTexto,
          fontSize: 16,
        },
    });

    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const onSubmit = async (data) => {
        if (isLogin) {
            await handleLogin(data);
        } else {
            await handleRegister(data);
        }
    };

    const handleLogin = async ({ email, password }) => {
        try {
            const authData = await pb.collection('users').authWithPassword(email, password);

            console.log(pb.authStore.isValid);
            console.log(pb.authStore.token);
            console.log(pb.authStore.model.id);

            navigation.navigate('Home');
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error al iniciar sesión. Verifique sus credenciales.');
            Alert.alert('Error', 'Error al iniciar sesión. Verifique sus credenciales.');
        }
    };

    const handleRegister = async ({ username, email, password, passwordConfirm }) => {
        if (password !== passwordConfirm) {
            setErrorMessage('Las contraseñas no coinciden.');
            Alert.alert('Error', 'Las contraseñas no coinciden.');
            return;
        }
        
        const newUserData = {
            "username": username,
            "email": email,
            "password": password,
            "passwordConfirm": passwordConfirm,
        }
        try {
            
            const newUser = await pb.collection('users').create(newUserData);

            Alert.alert('Éxito', 'Registro exitoso. Ahora puede iniciar sesión.');
            setIsLogin(true);
            reset();
        } catch (error) {
            console.error('Error registering:', error);
            setErrorMessage('Error al registrar. Verifique sus datos.');
            Alert.alert('Error', `Error al registrar. Verifique sus datos.\n${error.message}`);
        }
    };

    return (
        <ImageBackground source={imageBackgroundInicio} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <StatusBar
                    animated={true}
                    backgroundColor={colorStatusBarInicio}
                />
                <Animated.View style={{ flex: 1, flexDirection: 'row', overflow: 'hidden', transform: [{ translateY: translateAnimDOWN }, { scale: unoAnim }] }}>
                    <View style={{ flex: 1 }}></View>
                    <ImageBackground source={logoInicio} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
                    <View style={{ flex: 1 }}></View>
                </Animated.View>


                <Animated.View style={{ flex: 1, width: '100%', opacity: unoAnim }}>
                    <View style={{width: '80%',  alignSelf: 'center'}}>
                        {!isLogin && (
                            <View style={{flexDirection: 'row', alignSelf: 'center' }}>
                            <Image source={iconoUsuario} style={{ width: 40, height: 40, marginRight: 10 }}/>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nombre de Usuario"
                                        placeholderTextColor="#888"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                )}
                            />
                            </View>
                            )
                        }
                        <View style={{flexDirection: 'row', alignSelf: 'center' }}>
                            <Image source={iconoUsuario} style={{ width: 40, height: 40, marginRight: 10 }}/>
                            <Controller
                                control={control}
                                name="email"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
                                        placeholder={isLogin ? "Nombre de Usuario o Email" : "Email"}
                                        placeholderTextColor="#888"
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                )}
                            />
                        </View>
                        <View style={{flexDirection: 'row', alignSelf: 'center' }}>
                            <Image source={iconoContraseña} style={{ width: 45, height: 45, marginRight: 5 }}/>
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.input}
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
                        {!isLogin && (
                            <View style={{flexDirection: 'row', alignSelf: 'center' }}>
                            <Image source={iconoContraseña} style={{ width: 45, height: 45, marginRight: 5 }}/>
                            <Controller
                                control={control}
                                name="passwordConfirm"
                                render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
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
                        {errorMessage ? (
                            <Text style={{ color: 'red', marginVertical: 10 }}>{errorMessage}</Text>
                        ) : null}
                    </View>
                    <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]}  onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.buttonText}>{isLogin ? 'Ingresar' : 'Registrarse'}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', marginTop: 50, }}>
                        <TouchableOpacity 
                            style={[styles.button, { alignSelf: 'center', width: 250, }]}  
                            onPress={() => {
                            setIsLogin(!isLogin);
                            setErrorMessage('');
                            reset();
                        }}>
                            <Text style={[styles.buttonText]}>{isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Ingresa'}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                
            </View>
        </ImageBackground>
    );
};

export default Inicio;
