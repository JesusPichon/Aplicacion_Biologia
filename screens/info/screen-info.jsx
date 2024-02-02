import React, { useEffect } from 'react';
import styles from "../../styles/style-app";
import { principal, secundario, tercero } from '../../styles/style-colors';
import imprimir from '../../components/imprimir/imprimir';
import animaciones from '../../components/animaciones/animaciones';

import {
    Text,
    View,
    TouchableWithoutFeedback,
    Animated,
    ImageBackground,
    SafeAreaView,
    StatusBar
} from "react-native";



const InfColecta = ({ navigation }) => {
    data={
        nombre: "nombre",
        nombre1: "nombre",
        nombre2: "nombre",
        nombre3: "nombre",
        nombre4: "nombre",
        nombre5: "nombre",
        nombre6: "nombre",
        nombre7: "nombre",
        nombre8: "nombre",
        nombre9: "nombre",
    }

    // variables de animacion
    const {
        unoAnim,
        translateAnimDOWN,
        translateAnimUP,
        startAnimations,
    } = animaciones();


    useEffect(() => {
        startAnimations();
    }, []);

    return (
        <View style={[
            styles.fondoS,
            {
                flex: 1,
                /*marginTop: Constants.statusBarHeight,*/
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
            }]}>
            <StatusBar
                barStyle="light-content"
                animated={true}
                backgroundColor={secundario}
            />

            <TouchableWithoutFeedback onPress={() => {
                imprimir(data);
            }}>
                <Animated.View style={[styles.fondoP, { width: 55, height: 55, borderRadius: 500, margin: 0, padding: 15, opacity: unoAnim, position: 'absolute', zIndex: 3, right: 10, bottom: 10 }]}>
                
                </Animated.View>
            </TouchableWithoutFeedback>

            <View style={{ flex: 3, flexDirection: 'row', overflow: 'visible', zIndex: 2 }}>
                <View style={{ flex: 1 }}></View>
                <Animated.View style={{ flex: 18, borderRadius: 20, backgroundColor: tercero, position: 'relative', transform: [{ translateY: translateAnimDOWN }] }}>
                    <Animated.View style={{ opacity: unoAnim, flex: 1 }}>
                        <ImageBackground source={{ uri: 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=hola' }} resizeMode="contain" style={{ flex: 8 }}></ImageBackground>
                        <TouchableWithoutFeedback style={{ flex: 1 }}>
                            <Animated.View style={[styles.fondoP, { width: 55, height: 55, borderRadius: 500, padding: 15, opacity: unoAnim, position: 'absolute', bottom: 5, right: 5 }]}>
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
                    <Animated.ScrollView style={{ opacity: unoAnim }}>
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