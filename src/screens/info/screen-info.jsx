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



const InfColecta = ({ navigation }) => {
    data={
        Nombre_cientifico: 'Ejemplo de nombre cientifico',
        Familia: 'patricio es un dios',
        Nombre_local: 'Ejemplo de nombre local',
        Estado: 'puebla', // Debe coincidir con el value de la opción que deseas seleccionar
        Municipio: 'Ejemplo de municipio',
        Localidad: 'Ejemplo de localidad',
        Altitud: 'asfa',
        Grados_Latitud: '',
        Minutos_Latitud: '',
        Hemisferio_Latitud: '',
        Grados_Longitud: '',
        Minutos_Longitud: '',
        Hemisferio_Longitud: '',
        X:'25215151',
        Y:'1515151',
        Informacion_ambiental: 'casdfasf',
        Suelo: 'asdasd',
        Asociada: 'sadfdsdf',
        Abundancia: 'Abundante',
        Forma_biologica: 'Arbusto',
        Tamano: 'sdvsdv',
        Flor: 'sdvdv',
        Fruto: 'crsced',
        Usos: 'sdfvsdv',
        Colector_es: 'sdvsdv',
        No_colecta: 'sdvsdvsdv',
        Fecha: '2024-02-15',
        Determino: '15151',
        Otros_datos: 'asdnauisdbnasuidgbaisudb',
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