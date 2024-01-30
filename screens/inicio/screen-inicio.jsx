import React, { useRef } from 'react';
import styles from '../../styles/style-app';

import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Easing,
    ImageBackground
} from "react-native";


const Inicio = ({ navigation }) => {
    // definimos las variables de las animaciones
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const bezierPoints = [.59, 1.44, .88, .97];
    let anim = false;

    // funciones que activan las animaciones
    const scaleIn = () => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.bezier(...bezierPoints),
            useNativeDriver: true,
        }).start();
        anim = true;
    };

    const scaleOut = () => {
        Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        anim = false;
    };

    // decidimos que animacion usar
    const animacion = () => {
        if (anim === false) {
            scaleIn()
        } else {
            scaleOut()
        }
        //console.log(scaleAnim)
    }


    return (
        // activamos la animacion de entrada
        scaleIn(),
        <View style={[
            styles.fondoT,
            {
                flex: 1,
                /*marginTop: Constants.statusBarHeight,*/
                justifyContent: 'center',
                alignItems: 'center',
            }]}>
            {/* definimos el diseños de la barra de notificaciones 
            <StatusBar
                style="dark"
                animated={true}
                backgroundColor={tercero}
            />*/}

            {/* View del logo*/}
            <Animated.View style={{ flex: 2, flexDirection: 'row', overflow: 'hidden', transform: [{ scale: scaleAnim }] }}>
                <View style={{ flex: 1 }}></View>
                <ImageBackground source={require('../../images/buap.png')} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
                <View style={{ flex: 1 }}></View>
            </Animated.View>

            {/* View del boton */}
            <Animated.View style={{ flex: 1, justifyContent: 'center', opacity: scaleAnim }}>
                <TouchableOpacity onPress={() => {
                    animacion()
                    setTimeout(() => {
                        navigation.replace('Canales');
                    }, 250);
                }}>
                    <Text style={[styles.boton, styles.fondoP, styles.textT, { paddingHorizontal: 25, paddingVertical: 15, fontSize: 18, fontWeight: 'bold' }]}>
                        Entrar
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
    )
}

export default Inicio;