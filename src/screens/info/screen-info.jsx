import React, { useEffect, useState } from 'react';
import styles from "../../styles/style-app";
import { cuarto, principal, secundario, tercero } from '../../styles/style-colors';
import imprimir from '../../components/imprimir/imprimirUno';
import animaciones from '../../components/animaciones/animaciones';
import { Button} from '@rneui/themed';
import { value, Switch } from "@rneui/base";
// notas para la reunion
// * ¿donde salio "option"?
// * ¿se modifico el formulario?
//      agregar tipo de vegetacion
// * que chinge a su ------- madre el de web semantica

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
        Fecha: route.params.data.Fecha,
        Determino: route.params.data.Determino,
        Otros_datos: route.params.data.Otros_datos,
        Tipo_vegetacion: route.params.data.Tipo_vegetacion,
        option: route.params.data.option,
    }

    const [switchStates, setSwitchStates] = useState({}); // Estado para los interruptores

    // Inicializar el estado de los interruptores con valores predeterminados
    useEffect(() => {
        const initialSwitchStates = {};
        Object.keys(route.params.data).forEach(key => {
            initialSwitchStates[key] = false;
        });
        setSwitchStates(initialSwitchStates);
    }, [route.params.data]);

    // Manejar el cambio de estado de un interruptor específico
    const handleSwitchChange = (field) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    // Obtener los datos con solo los campos que tienen interruptores activados
    const getFilteredData = () => {
        const filteredData = {};
        Object.keys(route.params.data).forEach(key => {
            if (key !== 'X' && key !== 'Y' && key !== 'Grados_Latitud' && key !== 'Minutos_Latitud' && key !== 'Hemisferio_Latitud' && key !== 'Grados_Longitud' && key !== 'Minutos_Longitud' && key !== 'Hemisferio_Longitud') {
                if (key === 'Fecha' && switchStates[key]) {
                    // Convertir la fecha a cadena en formato local
                    filteredData[key] = new Date(route.params.data[key]).toLocaleDateString();
                } else if (switchStates[key]) {
                    // Mantener otros datos que no sean fechas o que estén seleccionados por los interruptores
                    filteredData[key] = route.params.data[key];
                }
            } 
            if (route.params.data.option === 'metric' && switchStates['Coordenadas']) {
                filteredData['Coordenadas'] = 'x:' + route.params.data.X + '  y:' +route.params.data.Y;
            }else{
                filteredData['Coordenadas']
            }
        });
        return filteredData;
    };

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
                                //onPress={() => console.log(getFilteredData())}
                                onPress={() => imprimir(getFilteredData())}
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
                        <View style={{ rowGap: 25, columnGap: 5, flexDirection: 'column', marginBottom: 30,marginLeft: 10 }}>
                            {Object.entries(data).map(([campo, contenido], index) => {
                                if (contenido !== null && contenido !== "" && campo !==  'X' && campo !==  'Y' && campo !== 'Grados_Latitud' && campo !== 'Minutos_Latitud' && campo !== 'Hemisferio_Latitud' && campo !== 'Grados_Longitud' && campo !== 'Minutos_Longitud' && campo !== 'Hemisferio_Longitud' && campo !== 'option') {
                                    var nombreCampo;
                                    if (campo === 'Tamano') {
                                        nombreCampo = 'Tamaño';
                                    } else if (campo === 'Nombre_cientifico') {
                                        nombreCampo = 'Nombre cientifico';
                                    } else if (campo === 'Nombre_local') {
                                        nombreCampo = 'Nombre local';
                                    } else if (campo === 'Informacion_ambiental') {
                                        nombreCampo = 'Información ambiental';
                                    } else if (campo === 'Forma_biologica') {
                                        nombreCampo = 'Forma biologica';
                                    } else if (campo === 'Colector_es') {
                                        nombreCampo = 'Colector(es)';
                                    } else if (campo === 'No_colecta') {
                                        nombreCampo = 'Numero de la colecta';
                                    } else {
                                        nombreCampo = campo; // Mantener el mismo nombre si no es ninguno de los casos especiales
                                    }
                                    return (
                                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={[styles.textP, { fontSize: 18, fontWeight: 'bold', width:'30%', borderWidth: 1, borderColor: cuarto, padding: 1 }]}>{nombreCampo}</Text>
                                            <Text style={[styles.textP, { fontSize: 18, fontWeight: 'normal', width:'55%', borderWidth: 1, borderColor: cuarto, padding: 1, textAlign:'center' }]}>{contenido}</Text>
                                            <Switch
                                                color={secundario}
                                                value={switchStates[campo]}
                                                onValueChange={() => handleSwitchChange(campo)}
                                                style={{width: '15%'}}
                                            />
                                        </View>
                                    );
                                } else {
                                    if (campo === 'X') {
                                        return (
                                            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={[styles.textP, { fontSize: 18, fontWeight: 'bold', width:'30%', borderWidth: 1, borderColor: cuarto, padding: 1 }]}>Coordenadas</Text>
                                                {route.params.data.option === 'metric' ? (
                                                    <Text style={[styles.textP, { fontSize: 18, fontWeight: 'normal', width:'55%', borderWidth: 1, borderColor: cuarto, padding: 1, textAlign:'center' }]}>
                                                        {'x:' + route.params.data.X + '  y:' +route.params.data.Y}
                                                    </Text>
                                                ) : (
                                                    <Text style={[styles.textP, { fontSize: 18, fontWeight: 'normal', width:'55%', borderWidth: 1, borderColor: cuarto, padding: 1  }]}>
                                                        {'Latitud:' + route.params.data.Grados_Latitud + '° ' + route.params.data.Minutos_Latitud + "' " + route.params.data.Hemisferio_Latitud + ' Longitud:' + route.params.data.Grados_Longitud + '° ' + route.params.data.Minutos_Longitud +  "' " + route.params.data.Hemisferio_Longitud}
                                                    </Text>
                                                )}
                                                <Switch
                                                    color={secundario}
                                                    //value={switchStates['Coordenadas']}
                                                    value={switchStates['Coordenadas']}
                                                    onValueChange={() => handleSwitchChange('Coordenadas')}
                                                    style={{width: '15%'}}
                                                />
                                            </View>
                                        );
                                    } else {
                                        return null; // No renderizar si el campo no es 'X'
                                    }
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