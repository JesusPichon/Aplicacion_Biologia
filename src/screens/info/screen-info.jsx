import React, { useEffect } from 'react';
import styles from "../../styles/style-app";
import { principal, secundario, tercero } from '../../styles/style-colors';
import imprimir from '../../components/imprimir/imprimirUno';
import animaciones from '../../components/animaciones/animaciones';
import { Button} from '@rneui/themed';

import {
    Text,
    View,
    TouchableWithoutFeedback,
    Animated,
    ImageBackground,
    SafeAreaView,
    StatusBar
} from "react-native";



const InfColecta = ({ navigation, route }) => {
    data={
        Nombre_cientifico: route.params.data.Nombre_cientifico,
        Familia: route.params.data.Familia,
        Nombre_local: route.params.data.Nombre_local,
        Estado: route.params.data.Estado, // Debe coincidir con el value de la opción que deseas seleccionar
        Municipio: route.params.data.Municipio,
        Localidad: route.params.data.Localidad,
        Altitud: route.params.data.Altitud,
        Grados_Latitud: route.params.data.Grados_Latitud,
        Minutos_Latitud: route.params.data.Minutos_Latitud,
        Hemisferio_Latitud: route.params.data.Hemisferio_Latitud,
        Grados_Longitud: route.params.data.Grados_Longitud,
        Minutos_Longitud: route.params.data.Minutos_Longitud,
        Hemisferio_Longitud: route.params.data.Hemisferio_Longitud,
        X: route.params.data.X,
        Y: route.params.data.Y,
        Informacion_ambiental: route.params.data.Informacion_ambiental,
        Suelo: route.params.data.Suelo,
        Asociada: route.params.data.Asociada,
        Abundancia: route.params.data.Abundancia,
        Forma_biologica: route.params.data.Forma_biologica,
        Tamano: route.params.data.Tamano,
        Flor: route.params.data.Flor,
        Fruto: route.params.data.Fruto,
        Usos: route.params.data.Usos,
        Colector_es: route.params.data.Colector_es,
        No_colecta: route.params.data.No_colecta,
        Fecha: route.params.data.Fecha.toLocaleDateString(),
        Determino: route.params.data.Determino,
        Otros_datos: route.params.data.Otros_datos,
    }

    // variables de animacion
    const {
        unoAnim,
        translateAnimDOWN,
        translateAnimUP,
        startAnimations,
        resetAnimations,
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
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'relative'
            }]}>
            <StatusBar
                barStyle="light-content"
                animated={true}
                backgroundColor={secundario}
            />

            <View style={{ height:50, flexDirection: 'row', overflow: 'visible', zIndex: 2, marginVertical:20 }}>
                <View style={{ flex: 1 }}></View>
                <Animated.View style={{ flex: 18, borderRadius: 20, position: 'relative', transform: [{ translateY: translateAnimDOWN }] }}>
                    <Animated.View style={{ opacity: unoAnim, flex: 1, flexDirection: "row"}}>
                        <View style={{ flex: 1, marginRight: 5 }}>
                            <Button 
                                radius={"md"} 
                                type="solid"
                                onPress={() => navigation.navigate("Editar", { data })}
                                title="  Editar" 
                                buttonStyle={{ backgroundColor: tercero}}
                                icon={{name: 'edit', color: principal}}
                                titleStyle={{ color: principal }}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Button 
                                radius={"md"} 
                                type="solid"
                                onPress={() => imprimir(data)}
                                title="  Imprimir" 
                                buttonStyle={{ backgroundColor: tercero}}
                                icon={{name: 'print', color: principal}}
                                titleStyle={{ color: principal }}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
                <View style={{ flex: 1 }}></View>
            </View>

            <Animated.View style={{ flex: 8, overflow: 'visible', flexDirection:"row", zIndex: 1, transform: [{ translateY: translateAnimUP }] }}>
                <SafeAreaView style={[styles.fondoT, { flex: 18}]}>
                    <View style={{ height: 10, width:'120%', backgroundColor: secundario, transform: [{ rotate: '-1deg' }, {translateY: -5}, {translateX: -10}] }}></View>
                    <Animated.ScrollView style={{ opacity: unoAnim, marginTop:10}}>
                        <View style={{ rowGap: 25, columnGap: 5, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
                            {Object.entries(data).map(([campo, contenido], index) => {
                            if (contenido !== null && contenido !== "") {
                                const nombreCampo = campo === 'Tamano' ? 'Tamaño' : campo;
                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.textP, { fontSize: 18, fontWeight: 'bold' }]}>{nombreCampo}:</Text>
                                        <Text style={[styles.textP, { fontSize: 18, fontWeight: 'normal' }]}>{contenido}</Text>
                                    </View>
                                );
                            } else {
                                return null; // No renderizar si el contenido es null
                            }
                        })}
                        </View>
                    </Animated.ScrollView>
                </SafeAreaView>
            </Animated.View>
        </View>
    )
}

export default InfColecta;