import React, { useEffect } from 'react';
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
} from "react-native";
import styles from '../../styles/style-app';
import animaciones from '../../components/animaciones/animaciones';
import { crearTablas } from '../../services/database/SQLite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCache } from "./../../services/storage/CacheContext";
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../../services/redux/slices/themeSlice';


const Inicio = ({ navigation }) => {
    const {
        unoAnim,
        translateAnimDOWN,
        startAnimations,
        resetAnimations,
    } = animaciones();

    //Permisos de escritura para la aplicacion 
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
            /*if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permiso concedido');
            } else {
                console.log('Permiso denegado');
            }*/
            granted;
        } catch (err) {
            console.warn(err);
        }
    };

    const { cacheData, setCacheData } = useCache();

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

    useEffect(() => { 
        crearTablas();
        requestWritePermission();
        startAnimations();
        getData();
        //console.log(cacheData);
    }, []);

    const dispatch = useDispatch();
    const systemTheme = useColorScheme(); // Obtiene el tema actual del sistema ('light' o 'dark')
    const {currentTheme, themes} = useSelector((state) => state.theme);
    
    useEffect(() => {
        // // Establecer el tema de la aplicación según el tema del sistema al iniciar
        // console.log("Current Theme:", currentTheme);
        // console.log("System Theme:", systemTheme);
        // console.log("Selected Theme:", theme);
        if (currentTheme === 'system' || currentTheme !== systemTheme) {
            dispatch(setTheme(systemTheme));
        }
    }, [dispatch, systemTheme, currentTheme]);

    useEffect(() => {
        const handleAppearanceChange = ({ colorScheme }) => {
            // Actualizar el tema de la aplicación cuando el tema del sistema cambie
            if (currentTheme === 'system') {
                dispatch(setTheme(colorScheme));
            }
        };

        const listener = Appearance.addChangeListener(handleAppearanceChange);

        return () => listener.remove();
    }, [dispatch, currentTheme]);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState === 'active' && currentTheme === 'system') {
                dispatch(setTheme(Appearance.getColorScheme()));
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => subscription.remove();
    }, [dispatch, currentTheme]);

    const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
    const { imageBackgroundInicio, logoInicio, colorStatusBarInicio } = theme;

    return (
        // activamos la animacion de entrada
        <ImageBackground source={imageBackgroundInicio} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <StatusBar
                barStyle="dark-content"
                animated={true}
                backgroundColor={colorStatusBarInicio}
            />            
            {/* View del logo*/}
            <Animated.View style={{ flex: 10, flexDirection: 'row', overflow: 'hidden', transform: [{ translateY: translateAnimDOWN }, { scale: unoAnim }] }}>
                <View style={{ flex: 1 }}></View>
                <ImageBackground source={logoInicio} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
                <View style={{ flex: 1 }}></View>
            </Animated.View>

            {/* View del boton */}
            <Animated.View style={{ flex: 6, justifyContent: 'center', opacity: unoAnim }}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home'); }}>
                    <Text style={[styles.boton, styles.fondoP, styles.textT, { paddingHorizontal: 25, paddingVertical: 15, fontSize: 18, fontWeight: 'bold' }]}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            {/* View para FAQ */}
            {/* <Animated.View style={{ flex: 1, justifyContent: 'center', opacity: unoAnim }}>
                <TouchableOpacity onPress={() => { navigation.navigate('FAQ'); }}>
                    <Text style={styles.textP}>
                        Preguntas frecuentes (FAQs)
                    </Text>
                </TouchableOpacity>
            </Animated.View> */}
        </View>
        </ImageBackground> 
    )
}

export default Inicio;