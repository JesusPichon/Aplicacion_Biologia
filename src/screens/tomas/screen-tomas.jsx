import {useState, useEffect} from 'react';
import {FlatList, View, Animated} from 'react-native';
import {SpeedDial, LinearProgress} from '@rneui/themed';
import Toma from '../../components/Toma';
import {imprimirTomas} from '../../components/imprimir/imprimirSeleccionando';
import BarraBusqueda from '../../components/BarraBusqueda';
import TomaController from '../../services/controllers/tomaController';
import {useSelector} from 'react-redux';
import {Icon, Text} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import animaciones from '../../components/animaciones/animaciones';

const Tomas = ({navigation, route}) => {
  const {currentTheme, themes} = useSelector(state => state.theme);
  const {unoAnim, startAnimations} = animaciones();

  const theme = themes[currentTheme] || themes.light;
  const {colorPrimario, colorSecundario, colorCuaternario, colorQuinario} =
    theme;

  const nombreGrupo = route.params.nombre;

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

  const controller = new TomaController();

  const cargarTomas = async (pageNumber, clearList = false) => {
    try {
      setLoading(true);
      const tomas = await controller.obtenerTomas(
        nombreGrupo,
        pageNumber,
        numeroTomas,
        buscar,
        campo,
      );
      setListTomas(clearList ? tomas : [...listTomas, ...tomas]);
      setLoading(false);
      setProgreso(1);
    } catch (error) {
      setLoading(false);
      lanzarAlerta('Error al obtener la lista de tomas.');
    }
  };

  const tomasTotales = async () => {
    try {
      const tomas = await controller.obtenerTomasTotales(
        nombreGrupo,
        buscar,
        campo,
      );
      setNumPaginas(Math.ceil(tomas / numeroTomas));
    } catch (error) {
      lanzarAlerta('Error al obtener la lista de tomas totales.');
    }
  };

  const eliminarTomas = async lista => {
    try {
      if (lista.length !== 0) {
        lista.forEach(async toma => {
          await controller.eliminarToma(nombreGrupo, toma.id);
        });
        setTimeout(async () => {
          await cargarTomas(page, true);
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

  const updateTomas = dataRecibida => {
    setBuscar(dataRecibida[0]);
    setCampo(dataRecibida[1]);
    setProgreso(0);
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
    tomasTotales();
  }, [page]);

  useEffect(() => {
    startAnimations();
  }, []);

  useEffect(() => {
    setPage(1);
    tomasTotales();
    cargarTomas(1, true);
    setListSelectPrint([]);
    setListSelectDelete([]);
    setEliminar(false);
  }, [buscar]);

  return (
    <View style={{flex: 1, backgroundColor: colorPrimario}}>
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
          titulo={'Buscar en las tomas'}
          pantalla={nombreGrupo}
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
          keyExtractor={(item, index) => item.id.toString()}
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
            />
          )}
          onEndReached={() => {
            if (page < numPaginas && !loading) {
              let nextPage = page + 1;
              setPage(nextPage);
              cargarTomas(nextPage);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponentStyle={{marginBottom: 15}}
        />
        {loading && <LinearProgress color={colorQuinario} />}
      </Animated.View>

      <SpeedDial
        isOpen={openButton}
        icon={{name: 'edit', color: colorPrimario}}
        openIcon={{name: 'close', color: colorPrimario}}
        color={colorCuaternario}
        onOpen={() => setOpenButton(!openButton)}
        onClose={() => setOpenButton(!openButton)}>
        {!showCheckBox && (
          <SpeedDial.Action
            icon={{name: 'edit', color: colorPrimario}}
            color={colorQuinario}
            title={'Campos Predeterminados'}
            onPress={() => {
              setOpenButton(!openButton);
              navigation.navigate('CamposPred');
            }}
          />
        )}

        {!showCheckBox && (
          <SpeedDial.Action
            icon={{name: 'add', color: colorPrimario}}
            color={colorQuinario}
            title={'Agregar'}
            onPress={() => {
              setOpenButton(!openButton);
              navigation.navigate('Formulario', {nombreGrupo});
            }}
          />
        )}

        {!showCheckBox && (
          <SpeedDial.Action
            icon={{name: 'delete', color: colorPrimario}}
            color={colorQuinario}
            title={'Eliminar'}
            onPress={() => {
              setOpenButton(!openButton);
              setShowCheckBox(true);
              setEliminar(true);
            }}
          />
        )}

        {!showCheckBox && (
          <SpeedDial.Action
            icon={{name: 'print', color: colorPrimario}}
            color={colorQuinario}
            title={'Imprimir'}
            onPress={() => {
              setOpenButton(!openButton);
              setShowCheckBox(true);
              setEliminar(false);
            }}
          />
        )}

        {showCheckBox && (
          <SpeedDial.Action
            icon={{name: 'done', color: colorPrimario}}
            title="Aceptar"
            color={colorQuinario}
            onPress={() => {
              setShowCheckBox(false);
              setOpenButton(false);
              if (eliminar) {
                eliminarTomas(listSelectDelete);
              } else {
                imprimirTomas(listSelectPrint);
                setListSelectPrint([]);
              }
            }}
          />
        )}

        {showCheckBox && (
          <SpeedDial.Action
            icon={{name: 'cancel', color: colorPrimario}}
            title="Cancelar"
            color={colorQuinario}
            onPress={() => {
              setShowCheckBox(false);
              setOpenButton(false);
              setEliminar(false);
            }}
          />
        )}
      </SpeedDial>
    </View>
  );
};

export default Tomas;
