import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, FlatList } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';
import { Canal, BarraBusqueda, VentanaFlotante } from "../../components";
import Snackbar from 'react-native-snackbar';
import { SpeedDial } from "@rneui/themed";
import { selectCsv } from "../../services/functions/import-csv";
import GrupoController from "../../services/controllers/grupoController";


const Canales = ({ navigation }) => {

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

    useEffect(() => {
        startAnimations();
    }, []);


    //funciones para manejar el comportamiento de los componentes
    const seleccionar = (canal) => {
        setListaBorrarGrupos([...listaBorrarGrupos, canal]);
    }

    const deseleccionar = (canal) => {
        setListaBorrarGrupos(listaBorrarGrupos.filter((item) => item !== canal));
    }

    const updateGrupos = (nuevosGrupos) => {
        setGrupos(nuevosGrupos); // Actualizamos los grupos con los resultados de la búsqueda
    };

    const handleTextChange = (text) => { 
        setNombreCanal(text);
        setError(''); // Limpiar el mensaje de error cuando se ingresa texto
    };

    function handleOpenButton(type) { //Abrir y cerrar Speed dial
        if (type === 'open') 
            setOpenButton(true); 
        if (type === 'close ')
            setOpenButton(false);
    }

    function handleOpenModal(type) { //Abrir y cerrar modal
        if (type === 'open') 
            setOpenModal(true); 
        if (type === 'close ')
            setOpenModal(false);
    }

    function handleCloseModal() { //cerrar modal
        setOpenModal(false);
        setNombreCanal(''); // Limpiar el nombre del canal
        setError(''); // Limpiar el mensaje de error
    }

    function deleteGroupsSelected() { //eliminar la lista de grupos
        listaBorrarGrupos.forEach((name) => {
            borrarGrupo_Tomas(name);
        });
    }

    function guardarTexto() {

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

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={principal}
                onOpen={() => handleOpenButton()}
                onClose={() => handleCloseButton()}>

                <SpeedDial.Action
                    icon={{ name: 'add', color: '#fff' }}
                    color={principal}
                    title={'agregar'}
                    onPress={() => {
                        handleCloseButton();
                        handleOpenModal();
                    }} />

                <SpeedDial.Action
                    icon={{ name: 'delete', color: '#fff' }}
                    color={principal}
                    title={'eliminar'}
                    onPress={() => {
                        handleCloseButton();
                        deleteGroupsSelected();
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