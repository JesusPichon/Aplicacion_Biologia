import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, FlatList } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import { selectCsv } from "../../services/functions/import-csv";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Grupo from "../../components/Grupo";
import BarraBusqueda from "../../components/BarraBusqueda";
import VentanaFlotante from "../../components/VentanaFlotante";
import Snackbar from 'react-native-snackbar';
import GrupoController from "../../services/controllers/grupoController";
import { SpeedDial } from "@rneui/themed";



const Grupos = ({ navigation }) => {

    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    
    const [grupos, setGrupos] = useState([]); //lista de grupos 
    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]); //lista para guardar los objetos que se van a eliminar 
    const [nombreGrupo, setNombreGrupo] = useState('');

    const [error, setError] = useState(''); //manejador de errores

    const [openButton, setOpenButton] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false); //mostrar casillas de seleccion 

    const controller = new GrupoController(); //agregar controller

    const cargarGrupos = async () => {
        try {
            const grupos = await controller.obtenerGrupos();
            setGrupos(grupos);
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de grupos");
        }
    }

    const eliminarGrupos = async (list) => {
        try {
            if (list.length !== 0) {
                await controller.deleteGroups(list);

                setTimeout(async () => {
                    await cargarGrupos();
                }, 300);

                if (list.length == 1)
                    lanzarAlerta('Grupo eliminado con exito');
                else
                    lanzarAlerta('Grupos eliminados con exito');
            }
        } catch (error) {
            lanzarAlerta('Error elimnando grupos');
        }
    }

    const agregarGrupo = async (nombre) => {
        try {
            const encontrado = await controller.searchGroupByName(nombre);
            if (encontrado == true)
                setError('El nombre del grupo ya existe');
            else {
                await controller.addGrupo(nombreGrupo);
                setOpenModal(false);
                setError('');
                setNombreGrupo('');
                lanzarAlerta('Grupo: ' + nombreGrupo + ' , creado exitosamente!!');
                await cargarGrupos();
            }
        } catch (error) {
            lanzarAlerta("Error al agregar el grupo dentro de la base de datos");
        }
    }

    function seleccionar(nombre) {
        setListaBorrarGrupos(listaBorrarGrupos.concat(nombre));
    }

    function deseleccionar(nombre) {
        setListaBorrarGrupos(listaBorrarGrupos.filter((item) => {
            item !== nombre;
        }))
    }

    function updateGrupos(nuevosGrupos) {
        setGrupos(nuevosGrupos); // Actualizamos los grupos con los resultados de la búsqueda
    };

    function handleTextChange(text) {
        setNombreGrupo(text);
        setError(''); // Limpiar el mensaje de error cuando se ingresa texto
    };

    function lanzarAlerta(mensaje) {
        setTimeout(() => {
            Snackbar.show({
                text: mensaje,
                duration: Snackbar.LENGTH_SHORT
            });
        }, 200);
    }

    async function guardarTexto() { //guarda un nuevo grupo con el nombre que le fue asignado dentro del modal 
        if (nombreGrupo.trim() !== '') {
            await agregarGrupo(nombreGrupo);
        } else {
            setError('El nombre del grupo no puede estar vacio');
        }
    }


    useEffect(() => {
        startAnimations();
        cargarGrupos();
        setListaBorrarGrupos([]);
    }, []);

    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>
            <Animated.View style={{ opacity: unoAnim }}>
                <BarraBusqueda titulo={'Buscar grupo'} pantalla={'grupos'} onResult={updateGrupos} />
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

                <FlatList
                    data={grupos}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Grupo
                            key={index}
                            animacion={unoAnim}
                            navigation={navigation}
                            nombre={item}
                            seleccionar={seleccionar}
                            deseleccionar={deseleccionar}
                            mostrarSeleccionar={showCheckBox} />
                    )} />
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpenButton(!openButton)}
                onClose={() => setOpenButton(!openButton)}
                color={principal}>

                {
                    !showCheckBox && <SpeedDial.Action //Implementacion de la opcion agregar grupo
                        icon={{ name: 'add', color: '#fff' }}
                        title="Add"
                        color={principal}
                        onPress={() => {
                            setOpenButton(false);
                            setOpenModal(true);
                        }} />
                }

                {
                    !showCheckBox && <SpeedDial.Action //implementacion de la opcion eliminar grupo 
                        icon={{ name: 'delete', color: '#fff' }}
                        title="Delete"
                        color={principal}
                        onPress={() => {
                            setShowCheckBox(true);
                            setOpenButton(false);
                        }} />
                }

                {
                    showCheckBox && <SpeedDial.Action //confirmacion de la opcion eliminar 
                        icon={{ name: 'done', color: '#fff' }}
                        title="Acept"
                        color={principal}
                        onPress={async () => {
                            setShowCheckBox(false);
                            setOpenButton(false);
                            await eliminarGrupos(listaBorrarGrupos);
                        }} />
                }

                {
                    showCheckBox && <SpeedDial.Action //cancelar la opcion de eliminar 
                        icon={{ name: 'cancel', color: '#fff' }}
                        title="Cancel"
                        color={principal}
                        onPress={() => {
                            setShowCheckBox(false);
                            setOpenButton(false);
                            setListaBorrarGrupos([]);
                        }} />
                }
            </SpeedDial>

            <VentanaFlotante
                openModal={openModal}
                handleCloseModal={() => {
                    setOpenModal(false);
                    setError('');
                }}
                handleTextChange={handleTextChange}
                errorMessage={error}
                saveGroup={guardarTexto} />
        </View>
    );
};


export default Grupos;