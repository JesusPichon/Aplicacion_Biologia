import { Image } from "@rneui/base";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { principal, secundario } from "../../styles/style-colors";
import { useState } from "react";

const notas = [
  'Cientifico:',
  'Familia:',
  'Nombre local:',
  'Localidad:',
  'Municipio:',
  'Estado:',
  'Altitud:',
  'Coordenadas:',
  'Tipo de vegetacion:',
];


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
      fontSize: 12,
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
          {notas.map((item, index) => {
            return (
              <Text
                key={index}
                style={style_toma.text_card}>
                {item}
              </Text>);
          })}
        </View>

      </View>
    </TouchableOpacity>
  );
}

export default Toma;