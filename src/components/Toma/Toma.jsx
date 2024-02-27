import { Image } from "@rneui/base";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import { useState } from "react";


const Toma = ({ navigation, data , seleccionar, deseleccionar }) => {

  const [isSelected, setSelected] = useState(false);


  const style_toma = StyleSheet.create({
    view_toma: {
      flexDirection: 'row',
      margin: 5,
      backgroundColor: isSelected ? secundario : principal,
      borderRadius: 16,
    },

    text_card: {
      fontSize: 13,
      color: 'white'
    },
  });

  return (
    <TouchableOpacity
      onPress={() => { navigation.navigate('InformacionToma') }}
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
          <Text style={style_toma.text_card}>Cientifico: {data.Nombre_cientifico}</Text>
          <Text style={style_toma.text_card}>Familia: {data.Familia}</Text>
          <Text style={style_toma.text_card}>Localidad: {data.Localidad}</Text>
          <Text style={style_toma.text_card}>Municipio: {data.Municipio}</Text>
          <Text style={style_toma.text_card}>Estado: {data.Estado}</Text>
          <Text style={style_toma.text_card}>Tipo de vegetacion: {data.Tipo_vegetacion}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

export default Toma;