import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Animated, ScrollView } from "react-native";
import { secundario } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Canal from "../../components/Canal";
import BotonFlotante from "../../components/BotonFlotante";
import BarraBusqueda from "../../components/BarraBusqueda";

const Canales = ({ navigation }) => {

    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    //lista de tomas inizializada con un objeto vacio
    const [canales, setCanales] = useState([{}, {},])


    useEffect(() => {
        startAnimations();
    }, []);


    //Funciones que se incorporan al boton flotante 
    const [actions, setActions] = useState([
        {
            icon: 'add',
            title: 'agregar',
            action: () => console.log("Add Something!!")
        },
        {
            icon: 'delete',
            title: 'eliminar',
            action: () => console.log("Delete Something!!")
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


                {canales.map((canal, index) => {
                    return (
                        <Canal
                            key={index}
                            animacion={unoAnim}
                            navigation={navigation} />
                    )
                })}

            </View>

            <BotonFlotante actions={actions} />

        </View>
    );
};

export default Canales;
