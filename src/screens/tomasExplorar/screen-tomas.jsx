import {useState, useEffect} from 'react';
import {FlatList, View, Animated} from 'react-native';
import {LinearProgress} from '@rneui/themed';
import Toma from '../../components/Toma';
import BarraBusqueda from '../../components/BarraBusqueda';
import {useSelector} from 'react-redux';
import {Button, Icon, Text} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import PocketController from '../../services/controllers/pocketController';
import GrupoController from '../../services/controllers/grupoController';
import VentanaFlotante from '../../components/VentanaFlotante';
import NetInfo from '@react-native-community/netinfo';
import NoConexion from '../../components/noConexion/NoConexion';
import animaciones from '../../components/animaciones/animaciones';

const TomasExplorar = ({navigation, route}) => {
  const {currentTheme, themes} = useSelector(state => state.theme);
  const {unoAnim, startAnimations} = animaciones();

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
  const [buscar, setBuscar] = useState('');
  const [campo, setCampo] = useState('nombre_cientifico');
  const [page, setPage] = useState(1);
  const [listTomas, setListTomas] = useState([]);
  const [listSelectPrint, setListSelectPrint] = useState([]);
  const [listSelectDelete, setListSelectDelete] = useState([]);
  const [numPaginas, setNumPaginas] = useState(1);
  const [openButton, setOpenButton] = useState(false);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const controller = new PocketController();

  const cargarTomas = async (pageNumber, clearList = false) => {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      console.log('error de conexion');
      handleNetworkError();
      setLoading(false);
      return;
    }
    if (page <= numPaginas && !loading) {
      setLoading(true);
      try {
        const tomas = await controller.ObtenerTomas(
          idGrupos,
          pageNumber,
          numeroTomas,
          buscar,
          campo,
        );
        setNumPaginas(tomas.totalPages);
        if (clearList) {
          setListTomas([...tomas.items]);
        } else {
          setListTomas(prevGrupos => [...prevGrupos, ...tomas.items]);
        }
      } catch (error) {
        setLoading(false);
        lanzarAlerta('Error al obtener la lista de tomas.');
      } finally {
        setLoading(false);
        setProgreso(1);
      }
    }
    setLoading(false);
  };

  const eliminarTomas = async lista => {
    try {
      if (lista.length !== 0) {
        lista.forEach(async toma => {
          await controller.eliminarToma(idGrupos, toma.id);
        });
        setTimeout(async () => {
          await cargarTomas(page);
        }, 150);
        lanzarAlerta(
          lista.length == 1
            ? 'Toma eliminada con éxito'
            : 'Tomas eliminadas con éxito',
        );
        setListSelectDelete([]);
      }
    } catch (error) {
      lanzarAlerta('Error, no se pudo eliminar la toma.');
    }
  };

  const seleccionarImprimir = toma => {
    setListSelectPrint([...listSelectPrint, toma]);
  };

  const deseleccionarImprimir = toma => {
    setListSelectPrint(listSelectPrint.filter(item => item !== toma));
  };

  const seleccionarEliminar = toma => {
    setListSelectDelete([...listSelectDelete, toma]);
  };

  const deseleccionarEliminar = toma => {
    setListSelectDelete(listSelectDelete.filter(item => item !== toma));
  };

  const updateTomas = async data => {
    console.log(data);
    setPage(1);
    setCampo(data[1]);
    setBuscar(data[0]);
  };

  function lanzarAlerta(mensaje) {
    setTimeout(() => {
      Snackbar.show({
        text: mensaje,
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('cargando tomas ' + buscar);
        await cargarTomas(page, true);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [buscar]);

  useEffect(() => {
    startAnimations();
  }, []);

  function handleGuardarGrupo() {
    setOpenModal(true);
  }

  const controllerLocal = new GrupoController(); //agregar controller
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState('');
  const [nombreGrupo, setNombreGrupo] = useState(nombreGrupos);
  const [isImporting, setIsImporting] = useState(false);

  const agregarGrupo = async nombre => {
    try {
      const encontrado = await controllerLocal.searchGroupByName(nombre);
      if (encontrado == true) setError('El nombre del grupo ya existe');
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
      lanzarAlerta('Error al agregar el grupo dentro de la base de datos');
    }
  };

  const handleCloseModal = () => {
    if (isImporting && nombreGrupo === '') {
      lanzarAlerta(
        'La operación de importación se ha cancelado porque no se ingresó un nombre de grupo',
      );
      setOpenModal(false);
      setIsImporting(false);
    } else {
      setOpenModal(false);
      setError('');
      setIsImporting(false);
    }
  };

  function handleTextChange(text) {
    setNombreGrupo(text);
    setError(''); // Limpiar el mensaje de error cuando se ingresa texto
  }

  async function guardarTexto() {
    //guarda un nuevo grupo con el nombre que le fue asignado dentro del modal
    if (nombreGrupo.trim() !== '') {
      await agregarGrupo(nombreGrupo);
    } else {
      setError('El nombre del grupo no puede estar vacio');
    }
  }

  const checkInternetConnection = async () => {
    const state = await NetInfo.fetch();
    return state.isConnected;
  };

  const handleNetworkError = () => {
    lanzarAlerta(
      'No hay conexión a Internet. Por favor, verifica tu conexión e intenta nuevamente.',
    );
    setIsConnected(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: colorPrimario}}>
      {isConnected ? (
        <>
          <View
            style={{
              width: '100%',
              height: 50,
              flexDirection: 'row',
              paddingHorizontal: 10,
              marginVertical: 10,
            }}>
            <View style={{width: '10%', justifyContent: 'center'}}>
              <Icon
                name="menu"
                type="material"
                color={colorQuinario}
                size={30}
                onPress={() => navigation.openDrawer()}
              />
            </View>
            <BarraBusqueda
              titulo={'Buscar tomas'}
              pantalla={'explorar'}
              onResult={updateTomas}
            />
          </View>

          <Animated.View
            style={{
              flex: 1,
              backgroundColor: colorSecundario,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              paddingTop: 60,
              opacity: unoAnim,
            }}>
            <FlatList
              ListEmptyComponent={
                <View style={{alignItems: 'center'}}>
                  <Icon
                    name="search-off"
                    type="material"
                    color={colorCuaternario}
                    size={100}
                  />
                  <Text style={{fontSize: 25, color: colorCuaternario}}>
                    No se encontraron tomas. 
                  </Text>
                </View>
              }
              data={listTomas}
              keyExtractor={item => item.id.toString()}
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
              onEndReachedThreshold={0.5}
              ListHeaderComponentStyle={{marginBottom: 15}}
            />
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
              }}>
              <Button
                icon={<Icon name="save" size={15} color={colorPrimario} />}
                buttonStyle={{backgroundColor: colorQuinario, borderRadius: 5}}
                containerStyle={{backgroundColor: colorQuinario, width: '75%'}}
                loadingProps={{animating: true}}
                onPress={() => handleGuardarGrupo()}
                title="Guardar grupo"
                titleStyle={{marginHorizontal: 5, color: colorPrimario}}
              />
            </View>
            {loading && <LinearProgress color={colorQuinario} />}
          </Animated.View>
          <VentanaFlotante
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleTextChange={handleTextChange}
            errorMessage={error}
            saveGroup={guardarTexto}
            nombre={nombreGrupo}
          />
        </>
      ) : (
        <NoConexion navigation={navigation} />
      )}
    </View>
  );
};

export default TomasExplorar;
