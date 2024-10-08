import React, { useEffect } from 'react';
import styles from '../../styles/style-app';
import animaciones from '../../components/animaciones/animaciones';
import { tercero } from '../../styles/style-colors';
import { crearTablas } from '../../services/database/SQLite';
import { PermissionsAndroid } from 'react-native';
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




    return (
        // activamos la animacion de entrada
        <View style={[
            styles.fondoT,
            {
                flex: 1,
                /*marginTop: Constants.statusBarHeight,*/
                justifyContent: 'center',
                alignItems: 'center',
            }]}>
            <StatusBar
                barStyle="dark-content"
                animated={true}
                backgroundColor={tercero}
            />

            {/* View del logo*/}
            <Animated.View style={{ flex: 10, flexDirection: 'row', overflow: 'hidden', transform: [{ translateY: translateAnimDOWN }, { scale: unoAnim }] }}>
                <View style={{ flex: 1 }}></View>
                <ImageBackground source={require('../../assets/images/buap.png')} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
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
    )
}

export default Inicio;