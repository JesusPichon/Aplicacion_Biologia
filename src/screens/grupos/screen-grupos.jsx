import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, FlatList } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import { SpeedDial } from "@rneui/themed";
import { selectCsv } from "../../services/functions/import-csv";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Grupo from "../../components/Grupo";
import BarraBusqueda from "../../components/BarraBusqueda";
import VentanaFlotante from "../../components/VentanaFlotante";
import Snackbar from 'react-native-snackbar';
import GrupoController from "../../services/controllers/grupoController";


const Grupos = ({ navigation }) => {

    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    //grupos y mensajes de error
    const [grupos, setGrupos] = useState([]);
    const [nombreGrupo, setNombreGrupo] = useState('');

    //manejador de errores
    const [error, setError] = useState('');

    //Abrir Speed Dial y Modal
    const [openButton, setOpenButton] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    //lista para guardar los objetos que se van a eliminar 
    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]);

    //agregar controller
    const controller = new GrupoController();

    //nuevo hook para seleccionar 
    const [showCheckBox, setShowCheckBox] = useState(false);

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


    function seleccionar(grupo) { //agregar grupo a la lista de seleccionados 
        setListaBorrarGrupos(listaBorrarGrupos.concat(grupo));
        console.log("Seleccionados: ", listaBorrarGrupos);
    }

    function deseleccionar(grupo) { //quitar grupo de la listad de seleccionados 
        setListaBorrarGrupos(listaBorrarGrupos.filter((item) => item !== grupo));
        console.log("Seleccionados: ", listaBorrarGrupos);
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
                <BarraBusqueda titulo={'Buscar grupo'} pantalla={'grupos'} onResult={updateGrupos}  />
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
                            mostrarSeleccionar={showCheckBox}
                            deseleccionar={deseleccionar}
                            seleccionar={seleccionar} />
                    )} />
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={principal}
                onOpen={() => setOpenButton(true)}
                onClose={() => setOpenButton(false)}>

                <SpeedDial.Action
                    icon={{ name: 'add', color: '#fff' }}
                    color={principal}
                    title={'agregar'}
                    onPress={() => {
                        setOpenButton(false);
                        setOpenModal(true);
                    }} />

                <SpeedDial.Action
                    icon={{ name: 'delete', color: '#fff' }}
                    color={principal}
                    title={'eliminar'}
                    onPress={async () => {
                        setOpenButton(false);
                        setShowCheckBox(true);
                        //await eliminarGrupos(listaBorrarGrupos);
                    }} />

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