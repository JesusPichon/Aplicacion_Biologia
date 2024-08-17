import { useState, useEffect } from "react";
import { FlatList, View} from 'react-native';
import { SpeedDial,LinearProgress } from '@rneui/themed';
import { principalFePro, secundarioFePro, terceropFePro, cuartoFePro, quintoFePro, terceroFePro } from "../../styles/style-colors";
import Toma from "../../components/Toma";
import { imprimirTomas } from "../../components/imprimir/imprimirSeleccionando";
import BarraBusqueda from "../../components/BarraBusqueda";
import TomaController from "../../services/controllers/tomaController";
import { useSelector } from 'react-redux';
import { Icon, Text } from "react-native-elements";
import Snackbar from 'react-native-snackbar';
import PocketController from "../../services/controllers/pocketController";

const TomasExplorar = ({ navigation, route }) => {
    const {currentTheme, themes} = useSelector((state) => state.theme);

    const theme = themes[currentTheme] || themes.light;
    const {  
        colorPrimario,
        colorSecundario,
        colorTerciario,
        colorCuaternario,
        colorQuinario,
    } = theme;

    const idGrupos = route.params.id;

    const numeroTomas = 10;
    const [progreso, setProgreso] = useState(0);
    const [buscar, setBuscar] = useState("");
    const [campo, setCampo] = useState("nombre_cientifico");
    const [page, setPage] = useState(1);
    const [listTomas, setListTomas] = useState([]);
    const [listSelectPrint, setListSelectPrint] = useState([]);
    const [listSelectDelete, setListSelectDelete] = useState([]);
    const [numPaginas, setNumPaginas] = useState(1);
    const [openButton, setOpenButton] = useState(false);
    const [showCheckBox, setShowCheckBox] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [loading, setLoading] = useState(false);

    const controller = new PocketController();

    const cargarTomas = async (pageNumber, clearList = false) => {
        if (page <= numPaginas && !loading){
            setLoading(true);
            try {
                const tomas = await controller.ObtenerTomas(idGrupos, pageNumber, numeroTomas);
                setListTomas((prevGrupos) => [...prevGrupos, ...tomas.items]);
                setNumPaginas(tomas.totalPages)
                setLoading(false);
                setProgreso(1);
            } catch (error) {
                setLoading(false);
                lanzarAlerta("Error al obtener la lista de tomas.");
            }
        }
        setLoading(false);
    };

    const eliminarTomas = async (lista) => {
        try {
            if (lista.length !== 0) {
                lista.forEach(async (toma) => {
                    await controller.eliminarToma(idGrupos, toma.id);
                });
                setTimeout(async () => {
                    await cargarTomas(page);
                }, 150);
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
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colorPrimario }}>
            <View style={{ width: '100%', height: 50, flexDirection: "row",  paddingHorizontal: 10, marginVertical:10}}>
                <View style={{width:'10%', justifyContent:"center"}}>
                    <Icon
                        name='menu'
                        type='material'
                        color={colorQuinario}
                        size={30}
                        onPress={() => navigation.openDrawer()}
                    />
                </View>
                {/*
                <BarraBusqueda
                    titulo={'Buscar en las tomas'}
                    pantalla={idGrupos}
                    onResult={updateTomas} 
                />
                */}
            </View>

            <View style={{ flex: 1, backgroundColor: colorSecundario, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 60}}>
                <FlatList
                    ListEmptyComponent={<View style={{alignItems:"center"}}>
                        <Icon name='search-off' type='material' color={colorCuaternario} size={100}/>
                        <Text style={{fontSize:25, color:colorCuaternario}}>No se encontraron tomas. </Text>
                    </View>}
                    data={listTomas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <Toma
                            key={item.id.toString()}
                            data={item}
                            navigation={navigation}
                            seleccionarImprimir={seleccionarImprimir}
                            deseleccionarImprimir={deseleccionarImprimir}
                            seleccionarEliminar={seleccionarEliminar}
                            deseleccionarEliminar={deseleccionarEliminar}
                            showCheckBox={showCheckBox}
                            eliminar={eliminar} 
                            explorar={true}
                        />
                    )}
                    onEndReached={() => {
                        if (page < numPaginas && !loading) {
                            const nextPage = page + 1;
                            setPage(nextPage);
                            cargarTomas(nextPage);
                        }
                    }}
                    onEndReachedThreshold={0.8}
                    ListHeaderComponent={loading && <LinearProgress color={colorCuaternario} />}
                    ListHeaderComponentStyle={{marginBottom:15}}
                />
            </View>
        </View>
    );
}

export default TomasExplorar;
