import { Image } from "@rneui/base";
import { View, Text, TouchableOpacity } from "react-native";
import style_toma from "./style-toma";
import { CheckBox } from "@rneui/themed";
import { useState, useEffect } from "react";
import { principal } from "../../styles/style-colors";


const Toma = ({ navigation, data, seleccionarImprimir, deseleccionarImprimir, seleccionarEliminar, deseleccionarEliminar, showCheckBox, eliminar }) => {

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
  }, [showCheckBox])

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
            source={require('../../assets/images/nature.jpg')}
            style={{
              width: 150,
              height: showCheckBox ? 180 : 160, //hacer mas grande la imagen si se muestra el checkbox 
              borderRadius: 10
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