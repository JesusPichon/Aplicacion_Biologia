import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ImageBackground, Animated } from "react-native";
import { secundario } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import BotonFlotante from "../../components/BotonFlotante";
import BarraBusqueda from "../../components/BarraBusqueda";


const Canales = ({ navigation }) => {

    // animaciones
    const {
        unoAnim,
        translateAnimDOWN,
        translateAnimUP,
        startAnimations,
    } = animaciones();


    useEffect(() => {
        startAnimations();
    }, []);


    //Funciones que se incorporan al boton flotante 
    const [actions, setActions] = useState([
        {
            icon: 'add',
            title: 'agregar',
            action: () => console.log("add something")
        },
        {
            icon: 'delete',
            title: 'eliminar',
            action: () => console.log("delete something")
        }
    ]);


    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>

            <Animated.View style={{ opacity: unoAnim }}>
                <BarraBusqueda titulo={'Buscar grupo'} />
            </Animated.View>

            {/* Nueva sección con los botones en fila */}
            <View style={styles.buttonContainer}>

                <TouchableOpacity style={[styles.fusionar, styles.fondoT]}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>FUSIONAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.exportar, styles.fondoT]}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>EXPORTAR/IMPORTAR</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container2, styles.fondoT]}>
            </View>

            <View style={[styles.container, styles.fondoT, { alignItems: 'center' }]}>
                <View style={[styles.container1, styles.fondoT]}>
                </View>

                <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32, transform: [{ scale: unoAnim }] }}>
                    <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            <ImageBackground source={require('../../assets/images/Campo_flores.jpg')}
                                resizeMode="cover"
                                style={styles.image}>
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={[styles.botongrupo, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>MIS TOMAS</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>

            <BotonFlotante actions={actions} />

        </View>
    );
};

export default Canales;
