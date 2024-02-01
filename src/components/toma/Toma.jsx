import React, { Component } from 'react';
import { principal } from '../../styles/style-colors';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const styleToma = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: principal,
    borderRadius: 5,
    margin: "2.5%"
  },

  text: {
    color: 'white',
    paddingLeft: "1.5%",
    paddingBottom: "0.5%",
    fontWeight: '700',
  },
});

const DATA = [
  'Cientifico:',
  'Familia:',
  'Nombre local:',
  'Localidad:',
  'Municipio:',
  'Estado:',
  'Altitud:',
  'Coordenadas:',
  'Tipo de vegetacion:', // Corregido el typo en "vegetacion"
];

class Toma extends Component {

  render() {
    return (
      <View style={styleToma.card}>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('InformacionToma');
        }}>


          {DATA.map((element, index) => (
            <Text key={index} style={styleToma.text}>
              {element}
            </Text>))}

        </TouchableOpacity>
      </View>
    );
  }
}

export default Toma;
