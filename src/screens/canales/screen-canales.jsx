import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Modal, TextInput, FlatList, TouchableWithoutFeedback } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Canal from "../../components/Canal";
import BarraBusqueda from "../../components/BarraBusqueda";
import { SpeedDial } from "@rneui/themed";
import { insertarGrupos, verGrupos, eliminarTomas, eliminarGrupo, consultarIdGrupo, consultarNombreGrupo } from "../../services/database/SQLite";
import { selectCsv } from "../../services/functions/import-csv";

const Canales = ({ navigation }) => {

    const [grupos, setGrupos] = useState([]);
    const [error, setError] = useState('');

    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    //lista para guardar los objetos que se van a eliminar 
    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]);
    const [canales, setCanales] = useState([]);

    //funciones para manejar los objetos de la lista 
    const seleccionar = (canal) => {
        setListaBorrarGrupos([...listaBorrarGrupos, canal]);
    }

    const deseleccionar = (canal) => {
        setListaBorrarGrupos(listaBorrarGrupos.filter((item) => item !== canal));
    }

    //visualizar modal, speed dial
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    //nombre del canal
    const [nombreCanal, setNombreCanal] = useState('');

    const verCanales = () => {
        verGrupos()
            .then(result => {
                setGrupos(result);
            })
            .catch(error => {
                console.error('Ocurrió un error al obtener los grupos:', error);
            });

    };

    const updateGrupos = (nuevosGrupos) => {
        setGrupos(nuevosGrupos); // Actualizamos los grupos con los resultados de la búsqueda
    };

    useEffect(() => {
        startAnimations();
        verCanales();
    }, [canales]);

    //agregar canales
    // CAMBIAR PARA LAS NUEVAS VARIABLES
    const agregarCanal = (nombreCanal) => {
        const nuevoCanal = { nombre: nombreCanal };
        setCanales(canales.concat(nuevoCanal));
        insertarGrupos(nombreCanal);
    }

    const guardarTexto = () => {
        if (nombreCanal.trim() === '') {
            setError('El nombre del grupo no puede estar vacío');
        } else {
            consultarNombreGrupo(nombreCanal)
                .then(resultado => {
                    if (resultado) {
                        console.log('El nombre de grupo ya existe en la tabla GRUPOS.');
                    } else {
                        // console.log('Texto guardado:', nombreCanal);
                        agregarCanal(nombreCanal);
                        setModalVisible(false);
                        setError(''); // Limpiar el mensaje de error
                        setNombreCanal('');
                    }
                })
                .catch(error => {
                    console.error('Error al consultar el nombre de grupo en la tabla GRUPOS:', error);
                });
        }
    };

    const borrarGrupo_Tomas = (nombreGrupo) => {
        // Obtiene primero el ID del grupo a eliminar
        consultarIdGrupo(nombreGrupo).
            then((id) => {
                console.log("Obtiene id");
                // Elimina las tomas pertenecientes al grupo a eliminar
                eliminarTomas(id)
                    .then(() => {
                        console.log("Entra a eliminar tomas");
                        // Si las tomas se eliminan exitosamente, se procede a eliminar el grupo
                        eliminarGrupo(nombreGrupo).then(() => {
                            verCanales();
                            navigation.replace('Canales');
                        });
                    })
                    .catch((error) => {
                        console.error('Error al ejecutar eliminarTomas:', error);
                    });
            })
            .catch((error) => {
                console.error('Error al obtener el ID del grupo:', error);
            });
    };

    const handleTextChange = (text) => {
        setNombreCanal(text);
        setError(''); // Limpiar el mensaje de error cuando se ingresa texto
    };

    const closeModal = () => {
        setModalVisible(false);
        setNombreCanal(''); // Limpiar el nombre del canal
        setError(''); // Limpiar el mensaje de error
    };

    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>
            <Animated.View style={{ opacity: unoAnim }}>
                <BarraBusqueda titulo={'Buscar grupo'} pantalla={'canales'} onResult={updateGrupos} />
            </Animated.View>


            {/* Nueva sección con los botones en fila */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.fusionar, styles.fondoT]}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>EXPORTAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.exportar, styles.fondoT]}
                    onPress={selectCsv}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>IMPORTAR</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container2, styles.fondoT]}>
            </View>

            <View style={[styles.container, styles.fondoT, { alignItems: 'center' }]}>
                <View style={[styles.container1, styles.fondoT]}>
                </View>

                {/* Agregando nombre del canal  */}
                <FlatList
                    data={grupos}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Canal
                            key={index}
                            animacion={unoAnim}
                            navigation={navigation}
                            informacion={item}
                            nombre={item}
                            deseleccionar={deseleccionar}
                            seleccionar={seleccionar} />
                    )}
                />
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
                        listaBorrarGrupos.forEach((nombreGrupo) => {
                            borrarGrupo_Tomas(nombreGrupo);
                        });
                    }} />

            </SpeedDial>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <TouchableWithoutFeedback>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                                <TextInput
                                    placeholder="Ingrese el nombre del grupo"
                                    style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 5, color: 'black' }}
                                    onChangeText={handleTextChange}
                                />
                                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                                <TouchableOpacity
                                    style={{ backgroundColor: principal, padding: 10, borderRadius: 5 }}
                                    onPress={guardarTexto}
                                >
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

        </View>
    );
};

export default Canales;