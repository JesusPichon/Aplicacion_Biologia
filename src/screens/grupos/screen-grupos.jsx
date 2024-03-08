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

    const [error, setError] = useState('');

    //Abrir Speed Dial y Modal
    const [openButton, setOpenButton] = useState(false);
    const [openModal, setOpenModal] = useState(false)

    //lista para guardar los objetos que se van a eliminar 
    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]);

    //agregar controller
    const controller = new GrupoController();

    const cargarGrupos = async () => {
        try {
            const grupos = await controller.obtenerGrupos();
            setGrupos(grupos);
        } catch (error) {
            console.error("Error al obtener la lista de grupos", error);
        }
    }

    const buscarGrupo = async (nombre) => {
        try {
            return (await controller.searchGroupByName(nombre));
        } catch (error) {
            console.error("Error al consultar el nombre del grupo en la tabla grupos: ", error);
        }
    }

    const agregarGrupo = async (nombre) => {
        try {
            return (await controller.addGrupo(nombre));
        } catch (error) {
            console.error("Error al agregar el grupo dentro de la base de datos: ", error);
        }
    }

    useEffect(() => {
        startAnimations();
        cargarGrupos();
    }, []);


    //funciones para manejar el comportamiento de los componentes
    function seleccionar(canal) {
        setListaBorrarGrupos([...listaBorrarGrupos, canal]);
    }

    function deseleccionar(canal) {
        setListaBorrarGrupos(listaBorrarGrupos.filter((item) => item !== canal));
    }

    function updateGrupos(nuevosGrupos) {
        setGrupos(nuevosGrupos); // Actualizamos los grupos con los resultados de la búsqueda
    };

    function handleTextChange(text) {
        setNombreGrupo(text);
        setError(''); // Limpiar el mensaje de error cuando se ingresa texto
    };

    function handleOpenButton(type) { //Abrir y cerrar Speed dial
        if (type === 'open')
            setOpenButton(true);
        if (type === 'close ')
            setOpenButton(false);
    }

    function handleOpenModal() { //Abrir y cerrar modal
        setOpenModal(true);
    }

    function handleCloseModal() { //cerrar modal
        setOpenModal(false);
        setNombreGrupo(''); // Limpiar el nombre del canal
        setError(''); // Limpiar el mensaje de error
    }

    function deleteGroupsSelected() { //eliminar la lista de grupos
        listaBorrarGrupos.forEach((name) => {
            borrarGrupo_Tomas(name);
        });
    }

    function guardarTexto() {
        if (nombreGrupo.trim() !== '') {
            if (!buscarGrupo()) {

            }
        } else
            setError('El nombre del grupo no puede estar vacio');
    };

    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>
            <Animated.View style={{ opacity: unoAnim }}>
                <BarraBusqueda titulo={'Buscar grupo'} pantalla={'default'} />
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
                            informacion={item}
                            nombre={item}
                            deseleccionar={deseleccionar}
                            seleccionar={seleccionar} />
                    )} />
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={principal}
                onOpen={() => handleOpenButton('open')}
                onClose={() => handleOpenButton('close')}>

                <SpeedDial.Action
                    icon={{ name: 'add', color: '#fff' }}
                    color={principal}
                    title={'agregar'}
                    onPress={() => {
                        handleOpenButton('close');
                        handleOpenModal('open');
                    }} />

                <SpeedDial.Action
                    icon={{ name: 'delete', color: '#fff' }}
                    color={principal}
                    title={'eliminar'}
                    onPress={() => {
                        handleOpenButton('close');
                        //deleteGroupsSelected();
                    }} />

            </SpeedDial>

            <VentanaFlotante
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleTextChange={handleTextChange}
                errorMessage={error}
                saveGroup={guardarTexto} />

        </View>
    );
};

export default Grupos;