import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Modal, TextInput } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Canal from "../../components/Canal";
import BarraBusqueda from "../../components/BarraBusqueda";
import { Button, SpeedDial } from "@rneui/themed";
import { insertarGrupos, verGrupos } from "../../services/database/SQLite";
import  { selectCsv }  from "../../services/functions/import-csv"

const Canales = ({ navigation }) => {
    const [grupos, setGrupos] = useState([]);


     // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    //lista de tomas inizializada con un objeto vacio
    const [canales, setCanales] = useState([]);

    //visualizar modal, speed dial
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

     //nombre del canal
    const [nombreCanal, setNombreCanal] = useState('');

    const verCanales = () => {
        verGrupos()
        .then(result => {
            //Agregar aqui la funcionalidad para utilizar el resultado obtenido
            console.log('Grupos obtenidos: ', result);
            setGrupos(result);
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los grupos:', error);
        });
        
    };

    useEffect(() => {
        startAnimations();
        verCanales();
    }, [canales]);

    //agregar canales 
    const agregarCanal = (nombreCanal) => {
        const nuevoCanal = { nombre: nombreCanal };
        setCanales(canales.concat(nuevoCanal));
        insertarGrupos(nombreCanal);
    }

    const guardarTexto = () => {
       // console.log('Texto guardado:', nombreCanal);
        agregarCanal(nombreCanal);
        setModalVisible(false);
    };

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
                <TouchableOpacity 
                    style={[styles.exportar, styles.fondoT]}
                    onPress={selectCsv}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>EXPORTAR/IMPORTAR</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container2, styles.fondoT]}>
            </View>


             {/* visualizacion de canales */}
            <View style={[styles.container, styles.fondoT, { alignItems: 'center' }]}>
                <View style={[styles.container1, styles.fondoT]}>
                </View>

                {/* Agregando nombre del canal  */}

                {grupos.map((canal, index) => {
                    console.log(grupos)
                    return (
                        <Canal
                            key={index}
                            animacion={unoAnim}
                            navigation={navigation}
                            informacion={grupos[index]}
                            nombre={grupos[index]} />
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

                <Modal  //Ventana flotante 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10}}>
                        <TextInput
                            placeholder="Ingrese el nombre del grupo"
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 5, color: 'black' }}
                            onChangeText={(text) => setNombreCanal(text)}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: principal , padding: 10, borderRadius: 5 }}
                            onPress={guardarTexto}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default Canales;