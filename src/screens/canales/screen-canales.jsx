import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, FlatList } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Canal from "../../components/Canal";
import BarraBusqueda from "../../components/BarraBusqueda";
import { SpeedDial } from "@rneui/themed";
import { insertarGrupos, verGrupos, eliminarTomas, eliminarGrupo, consultarIdGrupo, consultarNombreGrupo } from "../../services/database/SQLite";
import { selectCsv } from "../../services/functions/import-csv";
import Snackbar from 'react-native-snackbar';
import VentanaFlotante from "../../components/VentanaFlotante";

const Canales = ({ navigation }) => {

    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    //grupos y mensajes de error
    const [grupos, setGrupos] = useState([]);
    const [error, setError] = useState('');

    //Abrir Speed Dial y Modal
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    //guardar el nombre del canal 
    const [nombreCanal, setNombreCanal] = useState('');

    //lista para guardar los objetos que se van a eliminar 
    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]);

    //revisar variable 
    const [canales, setCanales] = useState([]);


    

    

    //funciones para manejar los objetos de la lista 
    const seleccionar = (canal) => {
        setListaBorrarGrupos([...listaBorrarGrupos, canal]);
    }

    const deseleccionar = (canal) => {
        setListaBorrarGrupos(listaBorrarGrupos.filter((item) => item !== canal));
    }

    

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

    
    const agregarCanal = (nombreCanal) => {
        const nuevoCanal = { nombre: nombreCanal };
        setCanales(canales.concat(nuevoCanal));
        insertarGrupos(nombreCanal)
            .then(() => {
                console.log('Grupo creado exitosamente vdxvxvf'); // Verificar si este mensaje se muestra en la consola
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Grupo creado exitosamente',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }, 200); // Esperar 0.2 segundos antes de mostrar la Snackbar
            })
            .catch((error) => {
                console.error('Error al agregar el canal:', error); // Verificar si se muestra el mensaje de error en la consola
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Error al crear el grupo',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }, 200); // Esperar 0.2 segundos antes de mostrar la Snackbar
            })
            .finally(() => {
                setError('');
                setNombreCanal('');
            });
    };



    const guardarTexto = () => {
        if (nombreCanal.trim() === '') {
            setError('El nombre del grupo no puede estar vacío');
        } else {
            consultarNombreGrupo(nombreCanal)
                .then(resultado => {
                    if (resultado) {
                        console.log('El nombre de grupo ya existe en la tabla GRUPOS.');
                        setError('El nombre de grupo ya existe');
                    } else {
                        // console.log('Texto guardado:', nombreCanal);
                        agregarCanal(nombreCanal);
                        // setModalVisible(false);
                        // setError(''); // Limpiar el mensaje de error
                        // setNombreCanal('');
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
                            Snackbar.show({
                                text: 'Grupo eliminado exitosamente',
                                duration: Snackbar.LENGTH_SHORT,
                            });
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

    function handleOpenModal(){
        setOpenModal(true);
    }
   
    function handleCloseModal() {
        setOpenModal(false);
        setNombreCanal(''); // Limpiar el nombre del canal
        setError(''); // Limpiar el mensaje de error
    }

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

            <View style={[styles.container, styles.fondoT]}>
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
                        handleOpenModal();
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

            <VentanaFlotante
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleTextChange={handleTextChange}
                errorMessage={error}
                guardarTexto={guardarTexto} />

        </View>
    );
};

export default Canales;