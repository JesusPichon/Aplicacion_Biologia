import { Image } from "@rneui/base";
import { View, Text,TouchableOpacity } from "react-native";
import style_toma from "./style-toma";

import { useState } from "react";


const Toma = ({ navigation, data , seleccionar, deseleccionar }) => {

  const [isSelected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate('InformacionToma', { data }) }}
      onLongPress={() => {
        if (isSelected) {
          deseleccionar(data);
        } else {
          seleccionar(data);
        }
        setSelected(!isSelected);
      }}>

      <View style={style_toma.view_toma}>

        <View style={{ flex: 1 }}>
          <Image
            source={require('../../assets/images/nature.jpg')}
            style={{ width: 150, height: 160, borderRadius: 10 }}
          />
        </View>

        <View style={{ flex: 2, padding: 5 }}>
          <Text style={style_toma.text_card}>Cientifico: {data.nombre_cientifico}</Text>
          <Text style={style_toma.text_card}>Familia: {data.familia}</Text>
          <Text style={style_toma.text_card}>Localidad: {data.localidad}</Text>
          <Text style={style_toma.text_card}>Municipio: {data.municipio}</Text>
          <Text style={style_toma.text_card}>Estado: {data.estado}</Text>
          <Text style={style_toma.text_card}>Tipo de vegetacion: {data.tipo_vegetacion}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

export default Toma;