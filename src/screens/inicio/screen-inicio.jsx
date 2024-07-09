import React, { useEffect, useState } from 'react';
import styles from '../../styles/style-app';
import animaciones from '../../components/animaciones/animaciones';
import { tercero } from '../../styles/style-colors';
import { crearTablas } from '../../services/database/SQLite';
import { PermissionsAndroid,useColorScheme } from 'react-native';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
    ImageBackground
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCache } from "./../../services/storage/CacheContext";
import { useSelector } from 'react-redux';


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

    // const systemTheme = useColorScheme(); // Obtiene el tema actual del sistema ('light' o 'dark')
    // const [theme, setTheme] = useState(systemTheme); // Estado para manejar el tema de la app

    // useEffect(() => {
    //     // Este efecto se ejecuta cuando cambia la preferencia de tema del sistema.
    //     setTheme(systemTheme);
    // }, [systemTheme]); // Dependencias: se vuelve a ejecutar el efecto si systemTheme cambia.

    // // Imágenes para cada tema
    // const logoClaro = require('../../assets/images/logoClaro.png'); // Paso 3
    // const logoOscuro = require('../../assets/images/logoOscuro.png'); // Asume que tienes otra imagen para el tema oscuro

    //  // Selecciona la imagen basada en el tema
    //  const logoImagen = theme === 'dark' ? logoOscuro : logoClaro; // Paso 4

    //  // Define las imágenes para cada tema
    // const fondoClaro = require('../../assets/images/fondoClaro.jpeg');
    // const fondoOscuro = require('../../assets/images/fondoOscuro.jpeg');

    // // Selecciona la imagen de fondo basada en el tema
    // const imagenFondo = theme === 'dark' ? fondoOscuro : fondoClaro;

    // const colorStatusBar = theme === 'dark' ? '#203c3b' : '#97b4a5';

    const theme = useSelector((state) => state.theme.currentTheme);

    return (
        // activamos la animacion de entrada
        <ImageBackground source={imagenFondo} resizeMode="cover" style={{flex: 1, width: '100%', height: '100%'}}>
        <View style={[
            {
                flex: 1,
                /*marginTop: Constants.statusBarHeight,*/
                justifyContent: 'center',
                alignItems: 'center',
            }]}>
            <StatusBar
                barStyle="dark-content"
                animated={true}
                backgroundColor={colorStatusBar}
            />

            
            {/* View del logo*/}
            <Animated.View style={{ flex: 10, flexDirection: 'row', overflow: 'hidden', transform: [{ translateY: translateAnimDOWN }, { scale: unoAnim }] }}>
                <View style={{ flex: 1 }}></View>
                <ImageBackground source={logoImagen} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
                <View style={{ flex: 1 }}></View>
            </Animated.View>

            {/* View del boton */}
            <Animated.View style={{ flex: 6, justifyContent: 'center', opacity: unoAnim }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Grupos');
                }}>
                    <Text style={[styles.boton, styles.fondoP, styles.textT, { paddingHorizontal: 25, paddingVertical: 15, fontSize: 18, fontWeight: 'bold' }]}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            {/* View para FAQ */}
            <Animated.View style={{ flex: 1, justifyContent: 'center', opacity: unoAnim }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('FAQ');
                }}>
                    <Text style={[styles.textP]}>
                        Preguntas frecuentes (FAQs)
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
        </ImageBackground> 
    )
}

export default Inicio;