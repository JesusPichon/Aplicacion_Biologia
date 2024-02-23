import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Modal } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Canal from "../../components/Canal";
import BarraBusqueda from "../../components/BarraBusqueda";
import { Button, Input, SpeedDial } from "@rneui/themed";

const Canales = ({ navigation}) => {

    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    //lista de tomas inizializada con un objeto vacio
    const [canales, setCanales] = useState([])

    //visualizar modal, speed dial
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    //nombre del canal
    const [nombreCanal, setNombreCanal] = useState('');


    useEffect(() => {
        startAnimations();
    }, [canales]);


    //agregar canales 
    const agregarCanal = (nombreCanal) => {
        const nuevoCanal = { nombre: nombreCanal };
        setCanales(canales.concat(nuevoCanal));
    }

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

            {/* visualizacion de canales */}

            <View style={[styles.container, styles.fondoT, { alignItems: 'center' }]}>
                <View style={[styles.container1, styles.fondoT]}>
                </View>


                {canales.map((canal, index) => {
                    return (
                        <Canal
                            key={index}
                            animacion={unoAnim}
                            navigation={navigation}
                            informacion={canal} />
                    )
                })}

            </View>


            {/* Boton flotante */}

            <SpeedDial
                isOpen={open}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={principal}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}>


                <SpeedDial.Action
                    icon={{ name: 'add', color: '#fff' }}
                    color={principal}
                    title={'agregar'}
                    onPress={() => {
                        setOpen(!open);
                        setModalVisible(!modalVisible);
                    }} />

                <SpeedDial.Action
                    icon={{ name: 'delete', color: '#fff' }}
                    color={principal}
                    title={'eliminar'}
                    onPress={() => {
                        setOpen(!open);
                        console.log("Delete Something!!");
                    }} />

            </SpeedDial>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>

                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ backgroundColor: principal, padding: 10, borderRadius: 10 }}>
                        
                        <Text style={{ color: 'white' }}> Nombre: </Text>

                        <Input
                            placeholder="Canal"
                            inputStyle={{ color: 'white' }}
                            containerStyle={{ width: '20' }}
                            onChangeText={(text) => setNombreCanal(text)} />

                        <Button
                            title={'Aceptar'}
                            buttonStyle={{ backgroundColor: principal }}
                            onPress={() => {
                                agregarCanal(nombreCanal);
                                setModalVisible(!modalVisible)
                            }} />

                    </View>
                </View>

            </Modal>

        </View>
    );
};

export default Canales;
