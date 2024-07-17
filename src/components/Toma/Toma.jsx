import { Image } from "@rneui/base";
import { View, Text, TouchableOpacity } from "react-native";
import style_toma from "./style-toma";
import { CheckBox, ListItem, Icon } from "@rneui/themed";
import { useState, useEffect } from "react";
import { principal, principalFePro, quintoFePro } from "../../styles/style-colors";
import Snackbar from 'react-native-snackbar';

const Toma = ({ navigation, data, seleccionarImprimir, deseleccionarImprimir, seleccionarEliminar, deseleccionarEliminar, showCheckBox, eliminar }) => {

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
        containerStyle={{marginBottom:30, backgroundColor: quintoFePro, borderRadius: 20}}
      >
        <Icon name="flower-tulip-outline" type="material-community" color={principalFePro} size={60} />
        <ListItem.Content>
          <ListItem.Title style={{fontWeight: "bold" }}>
          {data.nombre_cientifico ? 
            `Nombre cientifico: ${data.nombre_cientifico}` : 
            `Estado: ${data.estado}`
          }
          </ListItem.Title>
          <ListItem.Title style={{fontWeight: "bold" }}>
            Colector(es): {data.colector_es}
          </ListItem.Title>
          <ListItem.Subtitle style={{}}>
            Fecha: {data.fecha}
          </ListItem.Subtitle>
        </ListItem.Content>
        {
          showCheckBox &&
          <ListItem.CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor={eliminar ? "#F00" : "#00F"}
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