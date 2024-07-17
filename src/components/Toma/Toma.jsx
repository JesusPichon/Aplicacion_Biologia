import { Image } from "@rneui/base";
import { View, Text, TouchableOpacity } from "react-native";
import style_toma from "./style-toma";
import { CheckBox, ListItem, Icon } from "@rneui/themed";
import { useState, useEffect } from "react";
import { principal, principalFePro, quintoFePro } from "../../styles/style-colors";
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';

const Toma = ({ navigation, data, seleccionarImprimir, deseleccionarImprimir, seleccionarEliminar, deseleccionarEliminar, showCheckBox, eliminar }) => {
  const {currentTheme, themes} = useSelector((state) => state.theme);

  const theme = themes[currentTheme] || themes.light;
  const {  
      colorPrimario,
      colorSecundario,
      colorTerciario,
      colorCuaternario,
      colorQuinario,
  } = theme;

  const [checked, setChecked] = useState(false);

  const [showNoImage, setShowNoImage] = useState(false); //Estado para saber cuando hay un error al mostrar la imagen

  useEffect(() => {
    setChecked(false);
  }, [showCheckBox])

  function lanzarAlerta(mensaje) {
    setTimeout(() => {
        Snackbar.show({
            text: mensaje,
            duration: Snackbar.LENGTH_SHORT
        });
    }, 200);
  }

  return (

    <TouchableOpacity
      onPress={() => {
        if (showCheckBox == false){
          navigation.navigate('InformacionToma', { data })
        }
      }}
      style={{paddingHorizontal:20}} >

      <ListItem
        containerStyle={{marginBottom:30, backgroundColor: colorPrimario, borderRadius: 20}}
      >
        <Icon name="flower-tulip-outline" type="material-community" color={colorQuinario} size={60} />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: "bold", color:colorQuinario }}>
          {data.nombre_cientifico ? 
            `Nombre cientifico: ${data.nombre_cientifico}` : 
            `Estado: ${data.estado}`
          }
          </ListItem.Title>
          <ListItem.Title style={{fontWeight: "bold", color:colorQuinario }}>
            Colector(es): {data.colector_es}
          </ListItem.Title>
          <ListItem.Subtitle style={{color:colorQuinario}}>
            Fecha: {data.fecha}
          </ListItem.Subtitle>
        </ListItem.Content>
        {
          showCheckBox &&
          <ListItem.CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            containerStyle={{backgroundColor: colorPrimario}}
            uncheckedIcon="checkbox-blank-outline"
            checkedColor={colorQuinario}
            checked={checked}
            onPress={() => {if (eliminar) {
              if (checked)
                deseleccionarEliminar(data);
              else
                seleccionarEliminar(data);
            } else {
              if (checked)
                deseleccionarImprimir(data);
              else
                seleccionarImprimir(data);
            }
  
            setChecked(!checked);}}
          />
        }
      </ListItem>
    </TouchableOpacity>
  );
}

export default Toma;