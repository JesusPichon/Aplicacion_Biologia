import { useState, useEffect } from "react";
import { FlatList, View } from 'react-native';
import { SpeedDial, ButtonGroup, LinearProgress } from '@rneui/themed';
import styles from "../../styles/style-app";
import { principal, secundario } from '../../styles/style-colors';
import Toma from "../../components/Toma";
import { imprimirTomas } from "../../components/imprimir/imprimirSeleccionando";
import BarraBusqueda from "../../components/BarraBusqueda";
import TomaController from "../../services/controllers/tomaController";
import Snackbar from 'react-native-snackbar';


const Tomas = ({ navigation, route }) => {

    const nombreGrupo = route.params.nombre; //variable que obtine el nombre del canal 

    const numeroTomas = 10;
    const [progreso, setProgreso] = useState(0);
    const [desabilitar, setDesabilitar] = useState([0, 1, 2, 3, 4, 5, 6]);
    const [buscar, setBuscar] = useState("");
    const [campo, setCampo] = useState("nombre_cientifico");
    const [page, setPage] = useState(1);
    const [listTomas, setListTomas] = useState([]);
    const [listSelectPrint, setListSelectPrint] = useState([])
    const [listSelectDelete, setListSelectDelete] = useState([]);
    const [botones, setBotones] = useState();
    const [numPaginas, setNumPaginas] = useState(1);

    const [openButton, setOpenButton] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false);

    const [eliminar, setEliminar] = useState(false); //elige la opcion eliminar tomas 

    const controller = new TomaController(); //

    function rellenarBotones() {
        let temp = [];
        let calculos;
        temp.push("<<<");
        calculos = page - 2;
        temp.push((calculos > 0 && calculos <= numPaginas) ? calculos.toString() : "-");
        calculos = page - 1;
        temp.push((calculos > 0 && calculos <= numPaginas) ? calculos.toString() : "-");
        calculos = page;
        temp.push((calculos > 0 && calculos <= numPaginas) ? calculos.toString() : "-");
        calculos = page + 1;
        temp.push((calculos > 0 && calculos <= numPaginas) ? calculos.toString() : "-");
        calculos = page + 2;
        temp.push((calculos > 0 && calculos <= numPaginas) ? calculos.toString() : "-");
        temp.push(">>>");
        console.log('numero de paginas: ' + numPaginas);
        return temp;
    };

    function cambioPagina(boton) {
        switch (boton) {
            case 0:
                if (page - 5 > 0) {
                    setProgreso(0);
                    setDesabilitar([0, 1, 2, 3, 4, 5, 6]);
                    setPage(page - 5);
                }
                break;
            case 1:
                if (page - 2 > 0) {
                    setProgreso(0);
                    setDesabilitar([0, 1, 2, 3, 4, 5, 6]);
                    setPage(page - 2);
                }
                break;
            case 2:
                if (page - 1 > 0) {
                    setProgreso(0);
                    setDesabilitar([0, 1, 2, 3, 4, 5, 6]);
                    setPage(page - 1);
                }
                break;
            case 4:
                if (page + 1 <= numPaginas) {
                    setProgreso(0);
                    setDesabilitar([0, 1, 2, 3, 4, 5, 6]);
                    setPage(page + 1);
                }
                break;
            case 5:
                if (page + 2 <= numPaginas) {
                    setProgreso(0);
                    setDesabilitar([0, 1, 2, 3, 4, 5, 6]);
                    setPage(page + 2);
                }
                break;
            case 6:
                if (page + 5 <= numPaginas) {
                    setProgreso(0);
                    setDesabilitar([0, 1, 2, 3, 4, 5, 6]);
                    setPage(page + 5);
                }
                break;


            default:
                break;
        }
    }

    const cargarTomas = async (pageNumber) => {
        try {
            const tomas = await controller.obtenerTomas(nombreGrupo, pageNumber, numeroTomas, buscar, campo);
            setListTomas(tomas);
            setProgreso(1);
            setDesabilitar([]);
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de tomas.");
        }
    }

    const tomasTotales = async () => {
        try {
            const tomas = await controller.obtenerTomasTotales(nombreGrupo, buscar, campo);
            console.log(tomas);
            setNumPaginas(Math.ceil(tomas / numeroTomas));
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de tomas totales.");
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            cargarTomas(page);
            tomasTotales();
            setBotones(rellenarBotones()); // Esto se ejecutará cada vez que numPaginas cambie
        });

        return unsubscribe;
    }, [navigation, numPaginas, page]);

    const eliminarTomas = async (lista) => {
        try {
            if (lista.length !== 0) {

                lista.forEach(async (toma) => {
                    await controller.eliminarToma(nombreGrupo, toma.id);
                });

                setTimeout(async () => {
                    await cargarTomas(page);
                }, 300);

                if (lista.length == 1)
                    lanzarAlerta('Toma eliminada con exito');
                else
                    lanzarAlerta('Tomas eliminadas con exito');

                setListSelectDelete([]);
            }

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

    const updateTomas = (dataRecibida) => {
        setBuscar(dataRecibida[0]);
        setCampo(dataRecibida[1]);
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
        setPage(1);
        cargarTomas(1);
        tomasTotales();
        setListSelectPrint([]);
        setListSelectDelete([]);
        setEliminar(false);
    }, [navigation, buscar]);

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
                    )}

                />
                <ButtonGroup
                    buttons={botones}
                    selectedIndex={3}
                    disabled={desabilitar}
                    onPress={(value) => {
                        setProgreso(0);
                        cambioPagina(value);
                    }}
                    containerStyle={{ marginBottom: 0, height: 30, marginHorizontal: 'auto', opacity: openButton ? 0.1 : 1, display: showCheckBox ? 'none' : 'block' }}
                    selectedButtonStyle={{ backgroundColor: principal }}
                />
                <LinearProgress
                    style={{ marginBottom: 5, display: showCheckBox ? 'none' : 'block' }}
                    color={principal}
                    animation={100}
                    value={progreso}
                    variant="determinate"
                />
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'edit', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={secundario}
                containerStyle={{ marginBottom: 45 }}
                onOpen={() => setOpenButton(!openButton)}
                onClose={() => setOpenButton(!openButton)}>

                {
                    !showCheckBox && <SpeedDial.Action
                        icon={{ name: 'add', color: '#fff' }}
                        color={secundario}
                        title={'Agregar'}
                        onPress={() => {
                            setOpenButton(!openButton);
                            navigation.navigate('Formulario', { nombreGrupo });
                        }} />
                }

                {
                    !showCheckBox && <SpeedDial.Action
                        icon={{ name: 'delete', color: '#fff' }}
                        color={secundario}
                        title={'Eliminar'}
                        onPress={() => {
                            setOpenButton(!openButton);
                            setShowCheckBox(true); //muestra los checkbox para elegir las tomas que deseas eliminar 
                            setEliminar(true);
                        }} />
                }

                {
                    !showCheckBox && <SpeedDial.Action
                        icon={{ name: 'print', color: '#fff' }}
                        color={secundario}
                        title={'Imprimir'}
                        onPress={() => { // cambiar la logica para mandar a imprimir 
                            setOpenButton(!openButton);
                            setShowCheckBox(true);
                            setEliminar(false);
                        }} />
                }

                {
                    showCheckBox && <SpeedDial.Action //confirmacion de la opcion eliminar 
                        icon={{ name: 'done', color: '#fff' }}
                        title="Aceptar"
                        color={secundario}
                        onPress={() => {
                            setShowCheckBox(false);
                            setOpenButton(false);
                            if (eliminar) {
                                // implementar funcion de eliminar tomas 
                                eliminarTomas(listSelectDelete);
                            } else {
                                imprimirTomas(listSelectPrint);
                            }
                        }} />
                }

                {
                    showCheckBox && <SpeedDial.Action //cancelar la opcion de eliminar 
                        icon={{ name: 'cancel', color: '#fff' }}
                        title="Cancelar"
                        color={secundario}
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