import React, { useEffect } from 'react';
import styles from '../../styles/style-app';
import animaciones from '../../components/animaciones/animaciones';
import { tercero } from '../../styles/style-colors';


import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
    ImageBackground
} from "react-native";


const Inicio = ({ navigation }) => {
    const {
        unoAnim,
        translateAnimDOWN,
        startAnimations,
        resetAnimations,
    } = animaciones();


    useEffect(() => {
        startAnimations();
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
            <Animated.View style={{ flex: 2, flexDirection: 'row', overflow: 'hidden', transform: [{ translateY: translateAnimDOWN },{ scale: unoAnim}] }}>
                <View style={{ flex: 1 }}></View>
                <ImageBackground source={require('../../assets/images/buap.png')} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
                <View style={{ flex: 1 }}></View>
            </Animated.View>

            {/* View del boton */}
            <Animated.View style={{ flex: 1, justifyContent: 'center', opacity: unoAnim }}>
                <TouchableOpacity onPress={() => {
                    resetAnimations(navigation,'Canales');
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