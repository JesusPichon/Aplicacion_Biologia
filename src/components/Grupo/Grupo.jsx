import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground, FlatList } from "react-native";
import stylesCanales from "../../screens/grupos/style-canales";
import { useSelector } from "react-redux";
import { Chip } from "@rneui/themed";
import Snackbar from 'react-native-snackbar';
import PocketController from "../../services/controllers/pocketController";
import { jsonToCSV } from 'react-native-csv';
import { getRawData, formatData, guardarArchivoCSV, columnasComillas } from "../../services/functions/export-csv";
import GrupoController from "../../services/controllers/grupoController";


const Grupo = ({ navigation, nombre, seleccionar, deseleccionar, showCheckBox, selectionMode, explorar=false, misGrupos=false, item, onEliminarGrupo}) => {
  const { currentTheme, themes } = useSelector((state) => state.theme);
  const theme = themes[currentTheme] || themes.light;
  const { 
    colorPrimario,
    colorSecundario,
    colorTerciario,
    colorQuinario,
  } = theme;

  const [checked, setChecked] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [totalTomas, setTotalTomas] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { user, isAuthenticated } = useSelector(state => state.auth);


  useEffect(() => {
    setChecked(false);
  }, [showCheckBox]);

  const controllerPocket = new PocketController(); //agregar controller
  const controller = new GrupoController();
  
  useEffect(() => {
    if (!explorar) {
      // Obtén el total de tomas para este grupo cuando se monte el componente
      controller.obtenerNumeroTomas(nombre)
        .then(total => {
          setTotalTomas(total);
        })
        .catch(error => {
          console.error("Error al obtener el total de tomas:", error);
        });
    }else{
      setTotalTomas(item.numero_tomas);
    }
  }, [nombre]);

  const handleExportOptions = () => {
    setShowExportOptions(prevState => !prevState); // Alterna la visibilidad
  };

  const handleLocalExport = async () => {
    setShowExportOptions(false);
    try {
      const datosConsulta = await getRawData(nombre);
      
      const datosFormateados = await formatData(datosConsulta);
      
      const csv = jsonToCSV(datosFormateados, { quotes: columnasComillas });
      await guardarArchivoCSV(nombre, csv)
        .then((mensaje) => {
          Snackbar.show({
            text: mensaje,
            duration: Snackbar.LENGTH_SHORT
          });
        })
        .catch((error) => {
          Snackbar.show({
            text: error,
            duration: Snackbar.LENGTH_SHORT
          });
        });
    } catch (error) {
      console.error("Error al exportar: ", error);
      Snackbar.show({
        text: "Error al exportar: " + error.message,
        duration: Snackbar.LENGTH_SHORT
      });
    }
  };

  const handlePublicar = async () => {
    try{
      const datosConsulta = await getRawData(nombre);
      const datosFormateados = await formatData(datosConsulta);

      const dataGrupo = {
        autor: user,
        nombre: nombre,
        numero_tomas: totalTomas
      }

      await controllerPocket.publicarGrupo(dataGrupo, datosFormateados);

      Snackbar.show({
      text: "Grupo Publicado",
      duration: Snackbar.LENGTH_SHORT
      });
    } catch (error) {
      Snackbar.show({
        text: "Error al publicar el grupo",
        duration: Snackbar.LENGTH_SHORT
      });
      console.error("Error al publicar el grupo:", error);
      throw new Error("Error al publicar el grupo: " + error.message);
    }
    setShowExportOptions(false);
  };

  const handleSeleccionarGrupo = () => {
    if (showCheckBox) {
      if (checked) {
        deseleccionar(nombre);
      } else {
        seleccionar(nombre);
      }
      setChecked(!checked);
    } else {
      explorar ? id = item.id : null;
      explorar ? navigation.navigate('TomasExplorar', {id}) : navigation.navigate('Tomas', {nombre});
    }
  };

  const exportLocal = [{ id: '1', label: 'Descargar en este dispositivo', action: handleLocalExport }];
  const exportLocalPb = [
    { id: '1', label: 'Descargar en este dispositivo', action: handleLocalExport },
    { id: '2', label: 'Compartir públicamente', action: handlePublicar }
  ];

  const renderExportOptions = () => (
    <View style={[stylesCanales.exportOptionsContainer, { backgroundColor: colorPrimario }]}>
    <FlatList
      data={!isAuthenticated ? exportLocal : exportLocalPb}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={[stylesCanales.exportOptionButton, { backgroundColor: colorTerciario }]} 
          onPress={item.action}
        >
          <Text style={{  color: "white"}}>{item.label}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  </View>

  );

  const imageSource = explorar && item.url_imagen
    ? { uri: item.url_imagen }  // Si `url_imagen` es una URL remota, se usa `uri`
    : require('../../assets/images/nature.jpg');

  function lanzarAlerta(mensaje) {
    setTimeout(() => {
        Snackbar.show({
            text: mensaje,
            duration: Snackbar.LENGTH_SHORT
        });
    }, 200);
  }

  const handleEliminarGrupo = async (grupoId) => {
    try {
        lanzarAlerta("Eliminando el grupo: " + item.nombre);
        await controllerPocket.EliminarGrupo(grupoId);
        onEliminarGrupo(grupoId); // Llamar la función que actualiza el estado en el componente padre
        lanzarAlerta("Grupo eliminado exitosamente");
    } catch (error) {
        lanzarAlerta("Error al eliminar el grupo");
    }
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  return (

    <TouchableOpacity style={stylesCanales.cardVertical} onPress={handleSeleccionarGrupo} onLongPress={selectionMode}>
      <ImageBackground
        source={isLoading ? require('../../assets/images/nature.jpg') : imageSource}
        resizeMode="cover"
        style={stylesCanales.image}
        onLoadEnd={() => setIsLoading(false)}
      />
      <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
        <View style={[stylesCanales.nombreView, { backgroundColor: colorPrimario }]}>
          <Text style={[stylesCanales.nombreViewText, { color: colorQuinario}]}>
            {explorar ? (
              <View style={{flexDirection:"column"}}>
                <Text style={{ color: colorQuinario, fontWeight: 'bold' }}>{nombre}</Text>
                <Text style={{ color: colorQuinario}}><Text style={{fontWeight:'bold'}}>Publicado:</Text> {formatearFecha(item.created)}</Text>
                <Text style={{ color: colorQuinario}}><Text style={{fontWeight:'bold'}}>Autor:</Text> {item.autor}</Text>
              </View>
            ) : nombre}
          </Text>
          {showCheckBox ? (
            <Chip
              icon={{
                name: checked ? 'check-box' : 'check-box-outline-blank',
                type: 'material',
                size: 25,
                color: 'white',
              }}
              onPress={handleSeleccionarGrupo}
              buttonStyle={{ backgroundColor: 'red' }}
            />
          ) : explorar ? (
            misGrupos ? (
              <>
                <Chip
                  icon={{
                    name: 'delete',
                    type: 'material',
                    size: 25,
                    color: 'white',
                  }}
                  buttonStyle={{ backgroundColor: 'red' }}
                  onPress={() => handleEliminarGrupo(item.id)}
                />
              </>
            ) : (
              <></>
            )
          ) : (
            <Chip
              icon={{
                name: 'file-upload',
                type: 'material',
                size: 25,
                color: 'white',
              }}
              onPress={handleExportOptions}
              buttonStyle={{ backgroundColor: colorTerciario }}
            />
          )}
        </View>
        <View style={[stylesCanales.tomasView, { backgroundColor: colorTerciario }]}>
          <Text style={[stylesCanales.tomasViewText, { color: "white"}]}>Tomas: {totalTomas}</Text>
        </View>
      </View>
      {showExportOptions && renderExportOptions()}
    </TouchableOpacity>
  );
}

export default Grupo;

