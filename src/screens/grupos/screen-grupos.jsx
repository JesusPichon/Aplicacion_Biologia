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
import { verTomasExportar, verTomasTotales } from "../../services/database/SQLite";
import { readString, jsonToCSV } from 'react-native-csv';
import { getRawData, formatData, guardarArchivoCSV, columnasComillas } from "../../services/functions/export-csv";

const Grupos = ({ navigation }) => {
    // animaciones
    const {
        unoAnim,
        startAnimations,
    } = animaciones();

    const [data, setData] = useState([]);

    //grupos y mensajes de error
    const [grupos, setGrupos] = useState([]);
    const [nombreGrupo, setNombreGrupo] = useState('');
    const [listaBorrarGrupos, setListaBorrarGrupos] = useState([]);

    //Estado de la funcionalidad importar
    const [isImporting, setIsImporting] = useState(false);

    //manejador de errores
    const [error, setError] = useState('');

    const [openButton, setOpenButton] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false); //mostrar casillas de seleccion
    
    // Estados de la funcionalidad de exportar
    const [exportando, setExportando] = useState(false); // Nuevo estado para controlar si se está exportando un grupo

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

                setListaBorrarGrupos([]);
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
                await controller.addGrupo(nombre);
                setOpenModal(false);
                setError('');
                setNombreGrupo('');
                lanzarAlerta('Grupo: ' + nombre + ' , creado exitosamente!!');
                await cargarGrupos();
                if (isImporting === true) {
                    controller.importTomas(nombre, data);
                    setIsImporting(false);
                }
            }
        } catch (error) {
            lanzarAlerta("Error al agregar el grupo dentro de la base de datos");
        }
    }

    function seleccionar(grupo) { //agregar grupo a la lista de seleccionados 
        setListaBorrarGrupos(listaBorrarGrupos.concat(grupo));
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

    async function guardarTexto() { //guarda un nuevo grupo con el nombre que le fue asignado dentro del modal 
        if (nombreGrupo.trim() !== '') {
            await agregarGrupo(nombreGrupo.toUpperCase()); //Cambia el nombre a mayusculas
        } else {
            setError('El nombre del grupo no puede estar vacio');
        }
    }

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

    const handleCloseModal = () => {
        if (isImporting && nombreGrupo === '') {
            lanzarAlerta('La operación de importación se ha cancelado porque no se ingresó un nombre de grupo');
            setOpenModal(false);
            setIsImporting(false);
        } else {
            setOpenModal(false);
            setError('');
            setIsImporting(false);
        }
    }

    const handleImport = async () => {
        try {
            const datos = await selectCsv();
            setData(datos);
            lanzarAlerta("CSV importado correctamente, Cree nuevo grupo");
            setIsImporting(true);
            setOpenModal(true);
            //console.log(data);
        } catch (error) {
            lanzarAlerta(error);
        }
    }

    const handleExport = async () => {
        try {
            const datosConsulta = await getRawData(nombreGrupo);
            //console.log(datosConsulta);
            const datosFormateados = await formatData(datosConsulta);
            //console.log(datosFormateados);
            const csv = jsonToCSV(datosFormateados,{quotes: columnasComillas});
            //console.log(csv);

            guardarArchivoCSV(nombreGrupo, csv)
                .then((mensaje) => {
                    lanzarAlerta(mensaje); // Imprimirá "Archivo guardado exitosamente" si la operación fue exitosa
                })
                .catch((error) => {
                    lanzarAlerta(error); // Imprimirá "Error al guardar el archivo" si ocurrió algún error
                });

            setExportando(false);
            setNombreGrupo('');

        } catch (error) {
            //console.error("Error al exportar: ", error);
            lanzarAlerta("Error al exportar: " + error);
        }
    };

    const seleccionarGrupoExportar = (nombre) => {
        // Guardar el grupo seleccionado para exportar
        // Realizar la lógica de exportación con el grupo seleccionado
        setNombreGrupo(nombre);
        setShowCheckBox(false);
    };

    const modoExportar = (nombre) => {
        if(grupos.length == 0){
            lanzarAlerta("No hay grupos para Exportar");
        }else{
            // Cambiar al modo de exportación y mostrar las casillas de selección
            setExportando(true);    
            setShowCheckBox(true);
        }
    };
    
    useEffect(() => {
        startAnimations();
        cargarGrupos();
        setListaBorrarGrupos([]);
    }, [data]);

    useEffect(() => {
        // Esta función se ejecutará cada vez que se actualice nombreGrupo
        if (nombreGrupo.trim() !== '' && exportando) {
            handleExport(); // Iniciar el proceso de exportación cuando nombreGrupo se actualice
        }
    }, [nombreGrupo, exportando]); // Observar cambios en nombreGrupo y exportando

    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>
            <Animated.View style={{ opacity: unoAnim }}>
                <BarraBusqueda titulo={'Buscar grupo'} pantalla={'grupos'} onResult={updateGrupos} />
            </Animated.View>
            {/* Nueva sección con los botones en fila */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.fusionar, styles.fondoT]} onPress={modoExportar}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>EXPORTAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.exportar, styles.fondoT]}
                    onPress={handleImport}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>IMPORTAR</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container, styles.fondoT]}>
                
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
                            mostrarSeleccionar={showCheckBox}
                            exportando={exportando}
                            seleccionarGrupoExportar={seleccionarGrupoExportar} />
                    )} />
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                onOpen={() => setOpenButton(!openButton)}
                onClose={() => setOpenButton(!openButton)}
                color={principal}
            >
                {
                    !showCheckBox && !exportando && (
                        <SpeedDial.Action
                            icon={{ name: 'add', color: '#fff' }}
                            title="Add"
                            color={principal}
                            onPress={() => {
                                setOpenButton(false);
                                setOpenModal(true);
                            }}
                        />
                    )
                }
                {
                    !showCheckBox && !exportando && (
                        <SpeedDial.Action
                            icon={{ name: 'delete', color: '#fff' }}
                            title="Delete"
                            color={principal}
                            onPress={() => {
                                setShowCheckBox(true);
                                setOpenButton(false);
                            }}
                        />
                    )
                }
                {
                    (showCheckBox && !exportando) && (
                        <SpeedDial.Action
                            icon={{ name: 'done', color: '#fff' }}
                            title="Acept"
                            color={principal}
                            onPress={async () => {
                                setShowCheckBox(false);
                                setOpenButton(false);
                                await eliminarGrupos(listaBorrarGrupos);
                            }}
                        />
                    )
                }
                {
                    (showCheckBox) && (
                        <SpeedDial.Action
                            icon={{ name: 'cancel', color: '#fff' }}
                            title="Cancel"
                            color={principal}
                            onPress={() => {
                                setShowCheckBox(false);
                                setOpenButton(false);
                                setListaBorrarGrupos([]);
                                if (exportando) {
                                    setNombreGrupo('');
                                    setExportando(false);
                                    lanzarAlerta('Exportar Cancelado');
                                }
                            }}
                        />
                    )
                }
            </SpeedDial>

            <VentanaFlotante
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleTextChange={handleTextChange}
                errorMessage={error}
                saveGroup={guardarTexto} />
        </View>
    );
}

export default Grupos;