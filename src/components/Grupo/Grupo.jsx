import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import stylesCanales from "../../screens/grupos/style-canales";
import { useSelector } from "react-redux";
import { principal } from "../../styles/style-colors";
import { Chip } from "@rneui/themed";
import Snackbar from 'react-native-snackbar';
import { readString, jsonToCSV } from 'react-native-csv';
import { getRawData, formatData, guardarArchivoCSV, columnasComillas } from "../../services/functions/export-csv";
import { toGammaSpace } from "react-native-reanimated/lib/typescript/Colors";

const Grupo = ({ navigation, nombre, seleccionar, deseleccionar, showCheckBox, selectionMode}) => {
  const { currentTheme, themes } = useSelector((state) => state.theme);

  const theme = themes[currentTheme] || themes.light;
  const { 
    colorPrimario,
    colorSecundario,
    colorTerciario,
    colorCuaternario,
    colorQuinario,
  } = theme;

  const handleExport = async () => {
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

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
  }, [showCheckBox]);

  const handleSeleccionarGrupo = () => {
    if (showCheckBox == true ){
      if (checked) {
        deseleccionar(nombre);
      } else {
        seleccionar(nombre);
      }
      setChecked(!checked);
    }

    if (!showCheckBox) navigation.navigate('Tomas', {nombre});
  };

  return (
    <TouchableOpacity style={stylesCanales.cardVertical} onPress={handleSeleccionarGrupo} onLongPress={selectionMode}>
      <ImageBackground
        source={require('../../assets/images/nature.jpg')}
        resizeMode="cover"
        style={stylesCanales.image}
      />
      <View style={{ flex: 1, flexDirection: 'row', width: '100%' }}>
        <View style={[stylesCanales.nombreView, { backgroundColor: colorQuinario }]}>
          <Text style={[stylesCanales.nombreViewText, { color: colorPrimario}]}>
            {nombre}
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
          ) : (
            <Chip
              icon={{
                name: 'file-upload',
                type: 'material',
                size: 25,
                color: 'white',
              }}
              onPress={handleExport}
              buttonStyle={{ backgroundColor: colorTerciario }}
            />
          )}
        </View>
        <View style={[stylesCanales.tomasView, { backgroundColor: colorCuaternario }]}>
          <Text style={[stylesCanales.tomasViewText, { color: colorPrimario}]}>Tomas: 300</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Grupo;
