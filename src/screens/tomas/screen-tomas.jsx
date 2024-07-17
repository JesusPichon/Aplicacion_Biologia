import { useState, useEffect } from "react";
import { FlatList, View, Text } from 'react-native';
import { SpeedDial, ButtonGroup, LinearProgress } from '@rneui/themed';
import styles from "../../styles/style-app";
import { principalFePro, secundarioFePro, terceropFePro, cuartoFePro, quintoFePro, terceroFePro } from "../../styles/style-colors";
import Toma from "../../components/Toma";
import { imprimirTomas } from "../../components/imprimir/imprimirSeleccionando";
import BarraBusqueda from "../../components/BarraBusqueda";
import TomaController from "../../services/controllers/tomaController";
import Snackbar from 'react-native-snackbar';

const Tomas = ({ navigation, route }) => {

    const nombreGrupo = route.params.nombre;

    const numeroTomas = 10;
    const [progreso, setProgreso] = useState(0);
    const [buscar, setBuscar] = useState("");
    const [campo, setCampo] = useState("nombre_cientifico");
    const [page, setPage] = useState(1);
    const [listTomas, setListTomas] = useState([]);
    const [listSelectPrint, setListSelectPrint] = useState([]);
    const [listSelectDelete, setListSelectDelete] = useState([]);
    const [botones, setBotones] = useState([]);
    const [numPaginas, setNumPaginas] = useState(1);
    const [openButton, setOpenButton] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [loading, setLoading] = useState(false);

    const controller = new TomaController();

    const cargarTomas = async (pageNumber) => {
        try {
            setLoading(true);
            const tomas = await controller.obtenerTomas(nombreGrupo, pageNumber, numeroTomas, buscar, campo);
            setListTomas([...listTomas, ...tomas]);
            setLoading(false);
            setProgreso(1);
        } catch (error) {
            setLoading(false);
            lanzarAlerta("Error al obtener la lista de tomas.");
        }
    };

    const tomasTotales = async () => {
        try {
            const tomas = await controller.obtenerTomasTotales(nombreGrupo, buscar, campo);
            setNumPaginas(Math.ceil(tomas / numeroTomas));
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de tomas totales.");
        }
    };

    const eliminarTomas = async (lista) => {
        try {
            if (lista.length !== 0) {
                lista.forEach(async (toma) => {
                    await controller.eliminarToma(nombreGrupo, toma.id);
                });
                setTimeout(async () => {
                    await cargarTomas(page);
                }, 300);
                lanzarAlerta(lista.length == 1 ? 'Toma eliminada con éxito' : 'Tomas eliminadas con éxito');
                setListSelectDelete([]);
            }
        } catch (error) {
            lanzarAlerta('Error, no se pudo eliminar la toma.')
        }
    };

    const seleccionarImprimir = (toma) => {
        setListSelectPrint([...listSelectPrint, toma]);
    };

    const deseleccionarImprimir = (toma) => {
        setListSelectPrint(listSelectPrint.filter((item) => item !== toma));
    };

    const seleccionarEliminar = (toma) => {
        setListSelectDelete([...listSelectDelete, toma]);
    };

    const deseleccionarEliminar = (toma) => {
        setListSelectDelete(listSelectDelete.filter((item) => item !== toma));
    };

    const updateTomas = (dataRecibida) => {
        setBuscar(dataRecibida[0]);
        setCampo(dataRecibida[1]);
        setProgreso(0);
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
        cargarTomas(page);
        tomasTotales();
    }, [page]);

    useEffect(() => {
        setPage(1);
        cargarTomas(1);
        tomasTotales();
        setListSelectPrint([]);
        setListSelectDelete([]);
        setEliminar(false);
    }, [buscar]);

    return (
        <View style={{ flex: 1, backgroundColor: principalFePro }}>
            <View style={{ width: '100%', height: 50, flexDirection: "row" }}>
                <BarraBusqueda
                    titulo={'Buscar en las tomas'}
                    pantalla={nombreGrupo}
                    onResult={updateTomas} />
            </View>

            <View style={{ flex: 1, backgroundColor: secundarioFePro, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 60}}>
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
                    )}
                    onEndReached={() => {
                        if (page < numPaginas && !loading) {
                            setPage(page + 1);
                            cargarTomas(page);
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading && <LinearProgress color={quintoFePro} />}
                />
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'edit', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={secundarioFePro}
                onOpen={() => setOpenButton(!openButton)}
                onClose={() => setOpenButton(!openButton)}>

                {!showCheckBox && <SpeedDial.Action
                    icon={{ name: 'edit', color: '#fff' }}
                    color={secundarioFePro}
                    title={'Campos Predeterminados'}
                    onPress={() => {
                        setOpenButton(!openButton);
                        navigation.navigate('CamposPred');
                    }} />}
                
                {!showCheckBox && <SpeedDial.Action
                    icon={{ name: 'add', color: '#fff' }}
                    color={secundarioFePro}
                    title={'Agregar'}
                    onPress={() => {
                        setOpenButton(!openButton);
                        navigation.navigate('Formulario', { nombreGrupo });
                    }} />}
                
                {!showCheckBox && <SpeedDial.Action
                    icon={{ name: 'delete', color: '#fff' }}
                    color={secundarioFePro}
                    title={'Eliminar'}
                    onPress={() => {
                        setOpenButton(!openButton);
                        setShowCheckBox(true);
                        setEliminar(true);
                    }} />}
                
                {!showCheckBox && <SpeedDial.Action
                    icon={{ name: 'print', color: '#fff' }}
                    color={secundarioFePro}
                    title={'Imprimir'}
                    onPress={() => {
                        setOpenButton(!openButton);
                        setShowCheckBox(true);
                        setEliminar(false);
                    }} />}
                
                {showCheckBox && <SpeedDial.Action
                    icon={{ name: 'done', color: '#fff' }}
                    title="Aceptar"
                    color={secundarioFePro}
                    onPress={() => {
                        setShowCheckBox(false);
                        setOpenButton(false);
                        if (eliminar) {
                            eliminarTomas(listSelectDelete);
                        } else {
                            imprimirTomas(listSelectPrint);
                            setListSelectPrint([]);
                        }
                    }} />}
                
                {showCheckBox && <SpeedDial.Action
                    icon={{ name: 'cancel', color: '#fff' }}
                    title="Cancelar"
                    color={secundarioFePro}
                    onPress={() => {
                        setShowCheckBox(false);
                        setOpenButton(false);
                        setEliminar(false);
                    }} />}
            </SpeedDial>
        </View>
    );
}

export default Tomas;
