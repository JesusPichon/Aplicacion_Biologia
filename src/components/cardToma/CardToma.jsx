import React, { Component } from 'react';
import { principal } from '../../styles/style-colors';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const styleToma = StyleSheet.create({
  card: {
    width: "95%",
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

class CardToma extends Component {

  constructor(props) {
    super(props)
    this.info = this.props.infoToma;
    this.dir = this.info.direccion;
  }

  render() {
    return (
      <View style={styleToma.card}>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('InformacionToma');
        }} style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{padding: '2.5%'}}>
            {/**¨Cambiar  la imagen de las tomas */}
            <Image source={require('../../assets/images/flor.png')} style={{width: 50, height: 50, marginVertical: 30}}></Image>
          </View>
          <View style={{padding: '2.5%'}}>
            <Text style={styleToma.text}>Nombre Cientifico: {this.info.nombreCientifico == "" ? "NaN" : this.info.nombreCientifico}</Text>
            <Text style={styleToma.text}>Familia: {this.info.Familia}</Text>
            <Text style={styleToma.text}>Nombre Local: {this.info.nombreLocal}</Text>
            <Text style={styleToma.text}>Direccion: {this.dir.localidad + ", " + this.dir.municipio + ", " + this.dir.estado} </Text>
            <Text style={styleToma.text}>Coordenadas: {this.info.coordenadas}</Text>
            <Text style={styleToma.text}>Tipo de vegetacion: {this.info.tipoVegetacion}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CardToma;
