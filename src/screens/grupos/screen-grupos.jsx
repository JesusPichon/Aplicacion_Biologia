import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, FlatList } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import { selectCsv } from "../../services/functions/import-csv";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import Grupo from "../../components/Grupo";
import BarraBusqueda from "../../components/BarraBusqueda";
import VentanaFlotante from "../../components/VentanaFlotante";
import BotonAcciones from "../../components/BotonAcciones";
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

    const [error, setError] = useState(''); //manejador de errores

    //Abrir Speed Dial y Modal
    const [openButton, setOpenButton] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]); //lista para guardar los objetos que se van a eliminar 

    const controller = new GrupoController(); //agregar controller

    const [showCheckBox, setShowCheckBox] = useState(false);//hook para seleccionar

    const listActionsVerified = [{ //lista de acciones para verificar la opcion de eliminar 
        icon: { name: 'done', color: 'white' },
        title: 'aceptar',
        func: async () => {
            //console.log('aceptar');
            setShowCheckBox(false);
            setOpenButton(false);
            await eliminarGrupos(listaBorrarGrupos);
            setActions(listActionsDefault);
            console.log("lista borrar : ", listaBorrarGrupos);
        }
    }, {
        icon: { name: 'cancel', color: 'white' },
        title: 'cancelar',
        func: () => {
            console.log('eliminar')
            setShowCheckBox(false);
            setOpenButton(false);
            setActions(listActionsDefault);
        }
    }];

    const listActionsDefault = [{ //lista de acciones por default 
        icon: { name: 'add', color: 'white' },
        title: 'agregar',
        func: () => {
            setOpenButton(false);
            setOpenModal(true);
        }
    },
    {
        icon: { name: 'print', color: 'white' },
        title: 'eliminar',
        func: () => {
            setShowCheckBox(true);
            setOpenButton(false);
            setActions(listActionsVerified);
        }
    }];

    const [actions, setActions] = useState(listActionsDefault); //Asignar las acciones al boton flotante de forma dinamica 

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
                            mostrarSeleccionar={showCheckBox}
                            deseleccionar={deseleccionar}
                            seleccionar={seleccionar} />
                    )} />
            </View>

            <BotonAcciones
                isOpen={openButton}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                onOpen={() => { setOpenButton(true) }}
                onClose={() => { setOpenButton(false) }}
                acciones={actions} />

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