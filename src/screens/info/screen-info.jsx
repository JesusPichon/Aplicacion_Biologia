import React, { useEffect, useState } from 'react';
import styles from "../../styles/style-app";
import { cuarto, principal, secundario, tercero } from '../../styles/style-colors';
import animaciones from '../../components/animaciones/animaciones';
import { Button} from '@rneui/themed';
import { value, Switch } from "@rneui/base";
import {imprimirTomas} from "../../components/imprimir/imprimirSeleccionando"
import {selectImg} from "../../components/imprimir/seleccionarImagen"
import { actualizarIMG} from "../../services/database/SQLite";
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
    const [listPrint, setListPrint] = useState([]);

    const imprimir = async () => {
        setListPrint([getFilteredData()]);
    };

    const cambiarImagen = async () => {
        try {
            const imagenUri = await selectImg(); // Llama a la función selectImg y espera su resultado
            console.log('URI de la imagen seleccionada:', imagenUri);
            // Aquí puedes realizar las operaciones necesarias con la URI de la imagen seleccionada
            actualizarIMG(route.params.data.id, imagenUri);
        } catch (error) {
            console.error('Error al seleccionar la imagen:', error);
        }
    };
    
    useEffect(() => {
        if (listPrint.length > 0) {
            imprimirTomas(listPrint);
        }
    }, [listPrint]);

    function tipoDeCoordenadas(coordenadas) {
        if (coordenadas !== null && coordenadas !== '') {
            return 'metric'
        }else{
            return 'geographic'
        }
    }

    data={
        Nombre_cientifico: route.params.data.nombre_cientifico,
        Familia: route.params.data.familia,
        Nombre_local: route.params.data.nombre_local,
        Estado: route.params.data.estado, // Debe coincidir con el value de la opción que deseas seleccionar
        Municipio: route.params.data.municipio,
        Localidad: route.params.data.localidad,
        Altitud: route.params.data.altitud,
        Grados_Latitud: route.params.data.grados_Latitud,
        Minutos_Latitud: route.params.data.minutos_Latitud,
        Segundos_Latitud: route.params.data.segundos_Latitud,
        Hemisferio_Latitud: route.params.data.hemisferio_Latitud,
        Grados_Longitud: route.params.data.grados_Longitud,
        Minutos_Longitud: route.params.data.minutos_Longitud,
        Segundos_Longitud: route.params.data.segundos_Longitud,
        Hemisferio_Longitud: route.params.data.hemisferio_Longitud,
        X: route.params.data.x,
        Y: route.params.data.y,
        Informacion_ambiental: route.params.data.informacion_ambiental,
        Suelo: route.params.data.suelo,
        Asociada: route.params.data.asociada,
        Abundancia: route.params.data.abundancia,
        Forma_biologica: route.params.data.forma_biologica,
        Tamano: route.params.data.tamano,
        Flor: route.params.data.flor,
        Fruto: route.params.data.fruto,
        Usos: route.params.data.usos,
        Colector_es: route.params.data.colector_es,
        No_colecta: route.params.data.no_colecta,
        Fecha: route.params.data.fecha,
        Determino: route.params.data.determino,
        Otros_datos: route.params.data.otros_datos,
        Tipo_vegetacion: route.params.data.tipo_vegetacion,
        option: tipoDeCoordenadas(route.params.data.x),
        id: route.params.data.id,
    }

    const [switchStates, setSwitchStates] = useState({}); // Estado para los interruptores


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
        //console.log.log('data')
        //console.log.log(data)
        //console.log.log('switch')
        //console.log.log(switchStates)
        Object.keys(data).forEach(key => {
            if (key !== 'x' && key !== 'y' && key !== 'grados_Latitud' && key !== 'minutos_Latitud' && key !== 'segundos_Latitud' && key !== 'hemisferio_Latitud' && key !== 'grados_Longitud' && key !== 'minutos_Longitud' && key !== 'segundos_Longitud' && key !== 'hemisferio_Longitud') {
                if (switchStates[key]) {
                    // Mantener otros datos que no sean fechas o que estén seleccionados por los interruptores
                    filteredData[key] = data[key];
                }
            } 
            if (data.option === 'metric' && switchStates['Coordenadas']) {
                filteredData['Coordenadas'] = 'x:' + route.params.data.x + '  y:' +route.params.data.y;
            } if (data.option === 'geographic' && switchStates['Coordenadas']) {
                filteredData['Coordenadas'] = 'Latitud:' + route.params.data.grados_Latitud + '° ' + route.params.data.minutos_Latitud + "' " + route.params.data.segundos_Latitud + "'' " + route.params.data.hemisferio_Latitud + ' Longitud:' + route.params.data.grados_Longitud + '° ' + route.params.data.minutos_Longitud +  "' " + route.params.data.segundos_Longitud + "'' " + route.params.data.hemisferio_Longitud;
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
                                onPress={() => imprimir()}
                                title="  Imprimir" 
                                buttonStyle={{ backgroundColor: tercero}}
                                icon={{name: 'print', color: principal}}
                                titleStyle={{ color: principal }}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <Button 
                                radius={"md"} 
                                type="solid"
                                //onPress={() => console.log(getFilteredData())}
                                //boton para cambiar la imagen
                                onPress={cambiarImagen}
                                title="Cambiar Imagen" 
                                buttonStyle={{ backgroundColor: tercero}}
                                icon={{name: 'edit', color: principal}}
                                titleStyle={{ color: principal }}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>
                <View style={{ flex: 1 }}></View>
            </View>

            <Animated.View style={{ flex: 8, overflow: 'visible', flexDirection:"row", zIndex: 1, transform: [{ translateY: translateAnimUP }] }}>
                <SafeAreaView style={[styles.fondoT, { flex: 18}]}>
                    <Animated.ScrollView style={{ opacity: unoAnim, marginTop:10}}>
                        <View style={{ rowGap: 25, columnGap: 5, flexDirection: 'column', marginBottom: 30,marginLeft: 10 }}>
                            {Object.entries(data).map(([campo, contenido], index) => {
                                if (contenido !== null && contenido !== "" && campo !==  'X' && campo !==  'Y' && campo !== 'Grados_Latitud' && campo !== 'Minutos_Latitud' && campo !== 'Segundos_Latitud' && campo !== 'Hemisferio_Latitud' && campo !== 'Grados_Longitud' && campo !== 'Minutos_Longitud' && campo !== 'Segundos_Longitud' && campo !== 'Hemisferio_Longitud' && campo !== 'option' && campo !== 'id') {
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
                                                {data.option === 'metric' ? (
                                                    <Text style={[styles.textP, { fontSize: 18, fontWeight: 'normal', width:'55%', borderWidth: 1, borderColor: cuarto, padding: 1, textAlign:'center' }]}>
                                                        {'x:' + route.params.data.x + '  y:' +route.params.data.y}
                                                    </Text>
                                                ) : (
                                                    <Text style={[styles.textP, { fontSize: 18, fontWeight: 'normal', width:'55%', borderWidth: 1, borderColor: cuarto, padding: 1  }]}>
                                                        {'Latitud:' + route.params.data.grados_Latitud + '° ' + route.params.data.minutos_Latitud + "' " + route.params.data.segundos_Latitud + "'' " + route.params.data.hemisferio_Latitud + ' Longitud:' + route.params.data.grados_Longitud + '° ' + route.params.data.minutos_Longitud +  "' " + route.params.data.segundos_Longitud + "'' " + route.params.data.hemisferio_Longitud}
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