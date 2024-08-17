import { useState, useEffect } from "react";
import { FlatList, Touchable, View} from 'react-native';
import { SpeedDial,LinearProgress } from '@rneui/themed';
import { principalFePro, secundarioFePro, terceropFePro, cuartoFePro, quintoFePro, terceroFePro } from "../../styles/style-colors";
import Toma from "../../components/Toma";
import { imprimirTomas } from "../../components/imprimir/imprimirSeleccionando";
import BarraBusqueda from "../../components/BarraBusqueda";
import TomaController from "../../services/controllers/tomaController";
import { useSelector } from 'react-redux';
import { Button, Icon, Text } from "react-native-elements";
import Snackbar from 'react-native-snackbar';
import PocketController from "../../services/controllers/pocketController";
import GrupoController from "../../services/controllers/grupoController";
import VentanaFlotante from "../../components/VentanaFlotante";
import { Controller } from "react-hook-form";

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
    const nombreGrupos = route.params.nombre;

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

    function handleGuardarGrupo(){
        setOpenModal(true);
    }

    const controllerLocal = new GrupoController(); //agregar controller
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState('');
    const [nombreGrupo, setNombreGrupo] = useState(nombreGrupos);
    const [isImporting, setIsImporting] = useState(false);

    const agregarGrupo = async (nombre) => {
        try {
            const encontrado = await controllerLocal.searchGroupByName(nombre);
            if (encontrado == true)
                setError('El nombre del grupo ya existe');
            else {
                await controllerLocal.addGrupoPublico(nombre);
                setOpenModal(false);
                setError('');
                setNombreGrupo('');
                data = await controller.ObtenerTomasFull(idGrupos);
                console.log(data);
                lanzarAlerta('Grupo: ' + nombre + ' , creado exitosamente!!');
                await controllerLocal.importTomas(nombre, data);
                setIsImporting(false);
            }
        } catch (error) {
            lanzarAlerta("Error al agregar el grupo dentro de la base de datos");
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

    function handleTextChange(text) {
        setNombreGrupo(text);
        setError(''); // Limpiar el mensaje de error cuando se ingresa texto
    };

    async function guardarTexto() { //guarda un nuevo grupo con el nombre que le fue asignado dentro del modal 
        if (nombreGrupo.trim() !== '') {
            await agregarGrupo(nombreGrupo);
        } else {
            setError('El nombre del grupo no puede estar vacio');
        }
    }

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
                <View style={{width:'80%', justifyContent:"center", alignItems:'center'}}>
                <Button
                    icon={<Icon name="save" size={15} color={colorPrimario} />}
                    buttonStyle={{backgroundColor: colorQuinario, borderRadius: 5}}
                    containerStyle={{backgroundColor: colorQuinario, width:'75%'}}
                    loadingProps={{ animating: true }}
                    onPress={() => handleGuardarGrupo()}
                    title="Guardar grupo"
                    titleStyle={{ marginHorizontal: 5, color:colorPrimario }}
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
            <VentanaFlotante
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                handleTextChange={handleTextChange}
                errorMessage={error}
                saveGroup={guardarTexto} 
                nombre={nombreGrupo}/>
        </View>
    );
}

export default TomasExplorar;
