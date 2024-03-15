import { useState, useEffect } from "react";
import { FlatList, View } from 'react-native';
import { SpeedDial } from "@rneui/themed";
import styles from "../../styles/style-app";
import { principal, secundario } from '../../styles/style-colors';
import Toma from "../../components/Toma";
import imprimir from "../../components/imprimir/imprimir";
import BarraBusqueda from "../../components/BarraBusqueda";
import TomaController from "../../services/controllers/tomaController";
import Snackbar from 'react-native-snackbar';


const Tomas = ({ navigation, route }) => {

    const nombreGrupo = route.params.nombre; //variable que obtine el nombre del canal 

    const [listTomas, setListTomas] = useState([]);
    const [listSelectPrint, setListSelectPrint] = useState([])
    const [listSelectDelete, setListSelectDelete] = useState([]);

    const [openButton, setOpenButton] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false);

    const [eliminar, setEliminar] = useState(false); //elige la opcion eliminar tomas 

    const controller = new TomaController(); //


    const cargarTomas = async () => { //carga las tomas con ayuda del controller 
        try {
            const tomas = await controller.obtenerTomas(nombreGrupo);
            setListTomas(tomas);
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de tomas.");
        }
    }

    const eliminarToma = async () => {
        try {
            console.log('eliminando una toma')
        } catch (error) {
            lanzarAlerta('Error, no se pudo eliminar la toma.')
        }
    }

    const seleccionarImprimir = (toma) => { //agregar una tomas a la lista de tomas seleccionadas a la lista de imprimir
        setListSelectPrint([...listSelectPrint, toma]);
    }

    const deseleccionarImprimir = (toma) => { // quitar un tomas de la lista de tomas seleccionadas a la lista de imprimir 
        setListSelectPrint(listSelectPrint.filter((item) => item !== toma));
    }

    const seleccionarEliminar = (toma) => { //agregar una tomas a la lista de tomas seleccionadas a la lista de eliminar 
        setListSelectDelete([...listSelectDelete, toma]);
    }

    const deseleccionarEliminar = (toma) => { // quitar un tomas de la lista de tomas seleccionadas a la lista de eliminar 
        setListSelectDelete(listSelectDelete.filter((item) => item !== toma));
    }

    const updateTomas = (nuevasTomas) => {
        setListTomas(nuevasTomas);
    };

    function lanzarAlerta(mensaje) {
        setTimeout(() => {
            Snackbar.show({
                text: mensaje,
                duration: Snackbar.LENGTH_SHORT
            });
        }, 200);
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            cargarTomas();
            setListSelectPrint([]);
            setListSelectDelete([]);
            setEliminar(false);
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: secundario }}>

            <BarraBusqueda
                titulo={'Buscar en las tomas'}
                pantalla={nombreGrupo} // colocar el nombre del grupo
                onResult={updateTomas} />

            <View style={[styles.container, styles.fondoT]}>

                <FlatList
                    data={listTomas}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Toma
                            key={index}
                            data={item}
                            navigation={navigation}
                            seleccionarImprimir={seleccionarImprimir}
                            deseleccionarImprimir={deseleccionarImprimir}
                            seleccionarEliminar={seleccionarEliminar}
                            deseleccionarEliminar={deseleccionarEliminar}
                            showCheckBox={showCheckBox}
                            eliminar={eliminar} />
                    )} />
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={principal}
                onOpen={() => setOpenButton(!openButton)}
                onClose={() => setOpenButton(!openButton)}>

                {
                    !showCheckBox && <SpeedDial.Action
                        icon={{ name: 'add', color: '#fff' }}
                        color={principal}
                        title={'agregar'}
                        onPress={() => {
                            setOpenButton(!openButton);
                            navigation.navigate('Formulario', { nombreGrupo });
                        }} />
                }

                {
                    !showCheckBox && <SpeedDial.Action
                        icon={{ name: 'delete', color: '#fff' }}
                        color={principal}
                        title={'eliminar'}
                        onPress={() => {
                            setOpenButton(!openButton);
                            setShowCheckBox(true); //muestra los checkbox para elegir las tomas que deseas eliminar 
                            setEliminar(true);
                        }} />
                }

                {
                    !showCheckBox && <SpeedDial.Action
                        icon={{ name: 'print', color: '#fff' }}
                        color={principal}
                        title={'imprimir'}
                        onPress={() => { // cambiar la logica para mandar a imprimir 
                            setOpenButton(!openButton);
                            setShowCheckBox(true);
                            setEliminar(false);
                        }} />
                }

                {
                    showCheckBox && <SpeedDial.Action //confirmacion de la opcion eliminar 
                        icon={{ name: 'done', color: '#fff' }}
                        title="Acept"
                        color={principal}
                        onPress={() => {
                            setShowCheckBox(false);
                            setOpenButton(false);
                            if (eliminar) {
                                // implementar funcion de eliminar tomas 
                                
                            } else {
                                imprimir(listSelectPrint);
                            }
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
                            setEliminar(false);
                        }} />
                }

            </SpeedDial>

        </View>
    );
}


export default Tomas;