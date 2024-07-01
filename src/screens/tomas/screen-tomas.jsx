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
        let i = 0;
        while (i < 7) {
            if (i === 0) {
                if (page - 5 > 0) {
                    temp.push("<<<");
                } else {
                    temp.push("-");
                }
            } else if (i === 6) {
                if (page + 5 <= numPaginas) {
                    temp.push(">>>");
                } else {
                    temp.push("-");
                }
            } else {
                calculos = page + i - 3;
                if (calculos > 0 && calculos <= numPaginas) {
                    temp.push(calculos);
                } else {
                    temp.push("-");
                }
            }
            i++;
        }
        return temp;
    };

    function cambioPagina(boton) {
        if (boton === 0) {
            temp = page - 5;
        } else if (boton === 6) {
            temp = page + 5;
        } else {
            temp = boton - 3 + page;
        }
        //console.log(temp);
        if (temp >= 1 && temp <= numPaginas) {
            setProgreso(0);
            setPage(temp);
        }
    }

    const cargarTomas = async (pageNumber) => {
        try {
            const tomas = await controller.obtenerTomas(nombreGrupo, pageNumber, numeroTomas, buscar, campo);
            setListTomas(tomas);
            setListSelectPrint([]);
            setListSelectDelete([]);
            setProgreso(1);
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de tomas.");
        }
    }

    const tomasTotales = async () => {
        try {
            const tomas = await controller.obtenerTomasTotales(nombreGrupo, buscar, campo);
            //console.log(tomas);
            setNumPaginas(Math.ceil(tomas / numeroTomas));
        } catch (error) {
            lanzarAlerta("Error al obtener la lista de tomas totales.");
        }
    }

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
        setBotones(rellenarBotones()); // Esto se ejecutará cada vez que numPaginas cambie

        const unsubscribe = navigation.addListener('focus', () => {
            cargarTomas(page);
            tomasTotales();
            setBotones(rellenarBotones()); // Esto se ejecutará cada vez que se agregue una toma nueva 
        });

        return unsubscribe;
    }, [navigation, numPaginas, page]);

    
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
                <LinearProgress
                    style={{ marginBottom: 0, display: showCheckBox ? 'none' : 'block', width: '100%' }}
                    color={principal}
                    animation={100}
                    value={progreso}
                    variant="determinate"
                />
                <ButtonGroup
                    buttons={botones}
                    selectedIndex={3}
                    onPress={(value) => {
                        setProgreso(0);
                        cambioPagina(value);
                    }}
                    containerStyle={{ marginTop: 0, height: 30, marginHorizontal: 'auto', opacity: openButton ? 0.1 : 1, display: showCheckBox ? 'none' : 'block', width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}
                    selectedButtonStyle={{ backgroundColor: principal }}
                />

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
                
            </View>

            <SpeedDial
                isOpen={openButton}
                icon={{ name: 'edit', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={secundario}
                onOpen={() => setOpenButton(!openButton)}
                onClose={() => setOpenButton(!openButton)}>

                {
                    !showCheckBox && <SpeedDial.Action
                        icon={{ name: 'edit', color: '#fff' }}
                        color={secundario}
                        title={'Campos Predeterminados'}
                        onPress={() => {
                            setOpenButton(!openButton);
                            navigation.navigate('CamposPred');
                        }} />
                }

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
                                setListSelectPrint([]);
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