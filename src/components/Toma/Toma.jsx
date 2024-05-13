import { Image } from "@rneui/base";
import { View, Text, TouchableOpacity } from "react-native";
import style_toma from "./style-toma";
import { CheckBox } from "@rneui/themed";
import { useState, useEffect } from "react";
import { principal } from "../../styles/style-colors";
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
        if (showCheckBox == false)
          navigation.navigate('InformacionToma', { data })
        else {
          if (eliminar) {
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

          setChecked(!checked);
        }
      }} >

      <View style={style_toma.view_toma}>

        <View style={{ flex: 1 }}>

        <Image
          source={
            data.imagen !== null && !showNoImage //Si el campo imagen en la BD es distinto de null y la imagen correspondiente existe en el télefono
              ? { uri: data.imagen } //Se carga dicha imagen en la toma
              : data.imagen === null //Si el campo imagen en la BD es null
                ? require('../../assets/images/nature.jpg') //Carga una imagen por default
                //En caso de que el campo imagen no sea null pero su imagen correspondiente ya no exista en el telefono
                : require('../../assets/images/no_image.jpg') //Se carga una imagen alusiva al error "No Image"
          }
          style={{
            width: 150,
            height: showCheckBox ? 180 : 160,
            borderRadius: 10
          }}
          onError={() => {
            setShowNoImage(true); //Se actualiza el estado a verdadero, indicando un error al cargar la imagen
            lanzarAlerta('No se encontró la imagen en el dispositivo'); //Se lanza la alerta para notificar al usuario
          }}
        />

        </View>

        <View style={{ flex: 2, padding: 5 }}>



          <Text style={style_toma.text_card}>Cientifico: {data.nombre_cientifico}</Text>
          <Text style={style_toma.text_card}>Familia: {data.familia}</Text>
          <Text style={style_toma.text_card}>Localidad: {data.localidad}</Text>
          <Text style={style_toma.text_card}>Municipio: {data.municipio}</Text>
          <Text style={style_toma.text_card}>Estado: {data.estado}</Text>
          <Text style={style_toma.text_card}>Tipo de vegetacion: {data.tipo_vegetacion}</Text>

          {
            showCheckBox && <CheckBox
              title={eliminar ? "Eliminar" : "Imprimir"}
              checkedColor={eliminar ? "red" : "blue"}
              checked={checked}
              containerStyle={{backgroundColor: principal}}
              textStyle={{color: "white"}}
            />
          }

        </View>

      </View>
    </TouchableOpacity>
  );
}

export default Toma;