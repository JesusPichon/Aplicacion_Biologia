import React, { useRef } from 'react';
import Inicio from '../inicio';
import styles from "../../components/styles/style-app";
import {
    principal,
    secundario,
    tercero
} from '../../components/styles/style-colors';

import {
    Text,
    View,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions
} from "react-native";



const InfColecta = ({ navigation }) => {
    // animaciones
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateAnimUP = useRef(new Animated.Value(Dimensions.get('screen').height)).current;
    const translateAnimDOWN = useRef(new Animated.Value(-Dimensions.get('screen').height)).current;
    const bezierPoints = [.59, 1.2, .88, .97];

    // variables de animacion
    let opacity = false

    // animaciones
    const opacityIn = () => {
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            delay: 750,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        opacity = true;
    };

    const opacityOut = () => {
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
        opacity = false;
    };

    const translateIn = () => {
        Animated.timing(translateAnimUP, {
            toValue: 0,
            duration: 750,
            easing: Easing.bezier(...bezierPoints),
            useNativeDriver: true,
        }).start();

        Animated.timing(translateAnimDOWN, {
            toValue: 0,
            duration: 750,
            easing: Easing.bezier(...bezierPoints),
            useNativeDriver: true,
        }).start();
    };

    const translateOut = () => {
        Animated.timing(translateAnimUP, {
            toValue: Dimensions.get('screen').height,
            duration: 1000,
            delay: 500,
            easing: Easing.bezier(...bezierPoints),
            useNativeDriver: true,
        }).start();

        Animated.timing(translateAnimDOWN, {
            toValue: -Dimensions.get('screen').height,
            duration: 1000,
            delay: 500,
            easing: Easing.bezier(...bezierPoints),
            useNativeDriver: true,
        }).start();
    };


    // funciones para activar animaciones
    const animacionOpacity = () => {
        //console.log(opacity)
        if (opacity === false) {
            //console.log('IN')
            opacityIn()
            translateIn()
        } else {
            opacityOut()
            //console.log('OUT')
            translateOut()
        }
        //console.log(Dimensions.get('screen').height)
    }

    return (
        // ejecutar animaciones al inicio
        animacionOpacity(),
        // aplicacion
        <View style={[
            styles.fondoS,
            {
                flex: 1,
                /*marginTop: Constants.statusBarHeight,*/
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }]}>
            {/*<StatusBar
                style="light"
                animated={true}
                backgroundColor={secundario}
        />*/}

            <TouchableWithoutFeedback style={{}} onPress={() => {
                animacionOpacity()
                setTimeout(() => {
                    navigation.replace('Tomas');
                }, 1500);
            }}>
                <Animated.View style={[styles.fondoP, { width: 55, height: 55, borderRadius: 500, margin: 0, padding: 15, opacity: opacityAnim, position: 'absolute', zIndex: 3, left: 10, top: 10 }]}>
                    <ImageBackground source={require('../../images/regresar.png')} resizeMode="contain" style={{ flex: 1 }}></ImageBackground>
                </Animated.View>
            </TouchableWithoutFeedback>

            <View style={{ flex: 3, flexDirection: 'row', overflow: 'visible', zIndex: 2 }}>
                <View style={{ flex: 1 }}></View>
                <Animated.View style={{ flex: 18, borderRadius: 20, backgroundColor: tercero, position: 'relative', transform: [{ translateY: translateAnimDOWN }] }}>
                    <Animated.View style={{ opacity: opacityAnim, flex: 1 }}>
                        <ImageBackground source={{ uri: 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=hola' }} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
                        <TouchableWithoutFeedback style={{ flex: 1 }}>
                            <Animated.View style={[styles.fondoP, { width: 55, height: 55, borderRadius: 500, padding: 15, opacity: opacityAnim, position: 'absolute', bottom: 5, right: 5 }]}>
                                <ImageBackground source={require('../../images/compartir.png')} resizeMode="contain" style={{ flex: 1 }}></ImageBackground>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </Animated.View>
                <View style={{ flex: 1 }}></View>
            </View>

            <Animated.View style={{ flex: 6, flexDirection: 'row', overflow: 'hidden', zIndex: 1, transform: [{ translateY: translateAnimUP }] }}>
                <View style={{ flex: 1 }}></View>
                <SafeAreaView style={[styles.fondoT, styles.container, { flex: 18 }]}>
                    <Animated.ScrollView style={{ opacity: opacityAnim }}>
                        <View style={{ rowGap: 25, columnGap: 5, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textP, { fontSize: 15, fontWeight: 'bold' }]}>campo:</Text>
                                <Text style={[styles.textP, { fontSize: 14, fontWeight: 'normal' }]}>Contenido</Text>
                            </View>
                        </View>
                    </Animated.ScrollView>
                </SafeAreaView>
                <View style={{ flex: 1 }}></View>
            </Animated.View>
        </View>
    )
}

export default InfColecta;