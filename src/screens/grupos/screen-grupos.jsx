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
import {  verTomas } from "../../services/database/SQLite";
import { readString, jsonToCSV } from 'react-native-csv';

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

    //Estado de la funcionalidad importar
    const [isImporting, setIsImporting] = useState(false);

    //manejador de errores
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
                await controller.addGrupo(nombre);
                setOpenModal(false);
                setError('');
                setNombreGrupo('');
                lanzarAlerta('Grupo: ' + nombre + ' , creado exitosamente!!');
                await cargarGrupos();
                if (isImporting === true) {
                    controller.importTomas(nombre, data);
                }          
            }
        } catch (error) {
            lanzarAlerta("Error al agregar el grupo dentro de la base de datos");
        }
    }

    function seleccionar(grupo) { //agregar grupo a la lista de seleccionados 
        setListaBorrarGrupos(listaBorrarGrupos.concat(grupo));
    }

    function deseleccionar(grupo) { //quitar grupo de la listad de seleccionados 
        setListaBorrarGrupos(listaBorrarGrupos.filter((item) => item !== grupo));
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
            //A qui va funcion que usa data para la consulta SQL

            //id para identificar el grupo de la toma 
            

        } catch (error) {
            lanzarAlerta(error);
        }
    }

    //Funciones para exportar
    const getRawData = async () => {
        try {
            const tomas = await verTomas(81);
            //console.log(tomas);
            //setListaTomas(tomas); // Actualiza el estado con las tomas obtenidas
            return tomas; // Resuelve la promesa con los datos obtenidos
        } catch (error) {
            console.error("Error obteniendo las tomas: ", error);
            throw error; // Lanza el error para que sea manejado en la función exportar
        }
    }
    
    const formatData = (data) => {
        return new Promise((resolve, reject) => {
            try {
                const nuevoDatosCsv = data.map((toma) => {
                    const tomaData = {
                        nombre_cientifico: toma.nombre_cientifico,
                        familia: toma.familia,
                        nombre_local: toma.nombre_local,
                        estado: toma.estado,
                        municipio: toma.municipio,
                        localidad: toma.localidad,
                        altitud: toma.altitud,
                        grados_Latitud: toma.grados_Latitud,
                        minutos_Latitud: toma.minutos_Latitud,
                        segundos_Latitud: toma.segundos_Latitud, // Nueva Variable
                        hemisferio_Latitud: toma.hemisferio_Latitud,
                        grados_Longitud: toma.grados_Longitud,
                        minutos_Longitud: toma.minutos_Longitud,
                        segundos_Longitud: toma.segundos_Longitud, // Nueva Variable
                        hemisferio_Longitud: toma.hemisferio_Longitud,
                        x: toma.x,
                        y: toma.y,
                        tipo_vegetacion: toma.tipo_vegetacion,
                        informacion_ambiental: toma.informacion_ambiental,
                        suelo: toma.suelo,
                        asociada: toma.asociada,
                        abundancia: toma.abundancia,
                        forma_biologica: toma.forma_biologica,
                        tamano: toma.tamano,
                        flor: toma.flor,
                        fruto: toma.fruto,
                        usos: toma.usos,
                        colector_es: toma.colector_es,
                        no_colecta: toma.no_colecta,
                        fecha: toma.fecha,
                        determino: toma.determino,
                        otros_datos: toma.otros_datos
                    };
                    return tomaData;
                });
                //setDatosCSV(nuevoDatosCsv); // Actualiza el estado con los datos formateados
                resolve(nuevoDatosCsv); // Resuelve la promesa con los datos formateados
            } catch (error) {
                console.error("Error formateando datos: ", error);
                reject(error); // Rechaza la promesa si hay un error
            }
        });
    }

    const exportar = async () => {  
        try {
            const datosConsulta = await getRawData();

            //console.log(datosConsulta);

            const datosFormateados = await formatData(datosConsulta);

            //console.log(datosFormateados);

            const csv = jsonToCSV(datosFormateados);

            console.log(csv);



        } catch (error) {
            console.error("Error al exportar: ", error);
        }
    }
    

    useEffect(() => {
        startAnimations();
        cargarGrupos();
        setListaBorrarGrupos([]);
    }, [data]);

    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>
            <Animated.View style={{ opacity: unoAnim }}>
                <BarraBusqueda titulo={'Buscar grupo'} pantalla={'grupos'} onResult={updateGrupos}  />
            </Animated.View>


            {/* Nueva sección con los botones en fila */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.fusionar, styles.fondoT]} onPress={exportar}>
                    <Text style={[styles.textP, { textAlign: 'center', fontWeight: 'bold' }]}>EXPORTAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.exportar, styles.fondoT]}
                    onPress={handleImport}>
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
                        await eliminarGrupos(listaBorrarGrupos);
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