import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
    ImageBackground,
    useColorScheme,
    StyleSheet,
    TextInput,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import animaciones from '../../components/animaciones/animaciones';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { loginUser, registerUser,} from '../../services/auth/AuthFunctions';

const Login = ({ navigation }) => {
    const {
        unoAnim,
        translateAnimDOWN,
        translateAnimUP,
        startAnimations,
        resetAnimations,
    } = animaciones();

    const dispatch = useDispatch();
    const systemTheme = useColorScheme();
    const { currentTheme, themes, modeTheme } = useSelector((state) => state.theme);


    useEffect(() => {
        const initializeApp = async () => {
            startAnimations();
        };
        initializeApp();
    }, []);

   

    const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
    const { imageBackgroundInicio, logoInicio, colorStatusBarInicio, iconoUsuario, iconoContraseña, iconoCorreo, colorPrimario, colorTerciario, colorTexto } = theme;

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

    const { isAuthenticated, loading, error, token } = useSelector((state) => state.auth);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
    });

    const [cargando, setCargando] = useState(false);

    const onSubmit = async (data) => {
        setCargando(true);
        if (isLogin) {
            await dispatch(loginUser(data.email, data.password));
            console.log('Token despues del login...', token);
            const authToken = await AsyncStorage.getItem('userToken');
            console.log('Token despues del login en AsyncStorage...', authToken);
            if (authToken) {
                reset();
                //resetAnimations(navigation,'Home');
                navigation.goBack();
                // setTimeout(() => {
                //     startAnimations();
                // }, 500);
            }
        } else {
            await dispatch(registerUser(data.username, data.email, data.password, data.passwordConfirm));
            setIsLogin(true);
            reset();
        }
        setCargando(false);
    };

    return (
        <ImageBackground source={imageBackgroundInicio} resizeMode="cover" style={{ flex: 1, width: '100%', height: '100%' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <StatusBar
                    animated={true}
                    backgroundColor={colorStatusBarInicio}
                />
               <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1, width:'100%'}}
                >

                    <Animated.View style={{ flex: 30, flexDirection: 'row', overflow: 'hidden', transform: [{ translateY: translateAnimDOWN }, { scale: unoAnim }] }}>
                        <View style={{ flex: 1 }}></View>
                        <ImageBackground source={logoInicio} resizeMode="contain" style={{ flex: 8, margin:20 }}></ImageBackground>
                        <View style={{ flex: 1 }}></View>
                    </Animated.View>

                <Animated.View style={{ flex: 70, width: '100%', opacity: unoAnim, alignItems:'center', transform: [{ translateY: translateAnimUP }]}}>
                        <View style={{width: '80%', flex:80, justifyContent:'center', alignItems:'center'}}>
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
                            {cargando ? (
                                <ActivityIndicator size="large" color={colorTerciario} />
                            ) : (
                                <TouchableOpacity style={[styles.button, { alignSelf: 'center' }]} onPress={handleSubmit(onSubmit)}>
                                    <Text style={styles.buttonText}>{isLogin ? 'Ingresar' : 'Registrarse'}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ flexDirection: 'column', flex:20, justifyContent:'center',alignItems:'flex-start',width:'100%' }}>
                            <TouchableOpacity 
                                style={{
                                    backgroundColor: colorTerciario,
                                    borderTopEndRadius: 20,
                                    borderBottomEndRadius: 20,
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    alignItems: 'center',
                                }}  
                                onPress={() => {
                                setIsLogin(!isLogin);
                                setErrorMessage('');
                                reset();
                            }}>
                                <Text style={[styles.buttonText]}>{isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Ingresa'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
};

export default Login;
