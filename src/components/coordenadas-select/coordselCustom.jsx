import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { principal, secundario, tercero } from '../../styles/style-colors';
import { CheckBox, Icon } from '@rneui/themed';
import { Dropdown } from "react-native-element-dropdown";

const Hemisferio_longitud = [
  { label: 'Este', value: 'Este' },
  { label: 'Oeste', value: 'Oeste' }
];

const Hemisferio_latitud = [
  { label: 'Norte', value: 'Norte' },
  { label: 'Sur', value: 'Sur' }
];

const ExclusiveCheckboxes = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [valueLongitud, setValueLongitud] = useState('');
  const [valueLatitud, setValueLatitud] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CheckBox
          center
          title="Geográficas"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={selectedOption === 'geographic'}
          onPress={() => setSelectedOption('geographic')}
        />

        <CheckBox
          center
          title="Métricas"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={selectedOption === 'metric'}
          onPress={() => setSelectedOption('metric')}
        />
      </View>

      {selectedOption === 'geographic' && (
        <View>
          <Text style={styles.textP}>   Latitud:</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder="Horas" style={styles.textInputCoordenadas }/>
            <TextInput placeholder="Minutos" style={styles.textInputCoordenadas}/>
          </View>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={Hemisferio_latitud}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Hemisferio de latitud' : '...'}
            value={valueLatitud}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValueLatitud(item.value);
              setIsFocus(false);
            }}
          />
          <Text style={styles.textP}>   Longitud:</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput placeholder="Horas" style={styles.textInputCoordenadas }/>
            <TextInput placeholder="Minutos" style={styles.textInputCoordenadas}/>
          </View>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={Hemisferio_longitud}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Hemisferio de Longitud' : '...'}
            value={valueLongitud}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValueLongitud(item.value);
              setIsFocus(false);
            }}
          />
        </View>
      )}
      {selectedOption === 'metric' && (
        <View>
          <TextInput placeholder="X" style={styles.textInput}/>
          <TextInput placeholder="Y" style={styles.textInput}/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textP: {
      color: principal,
      textAlign: 'left',
      fontWeight: 'bold'
  },
  // TextInput
  textInput: {
      backgroundColor: 'rgb(128, 155, 174)',
      borderRadius: 5,
      borderColor: false,
      color: tercero,
      paddingLeft: 10,
      marginBottom: 10,
      marginHorizontal:10
  },
  textInputCoordenadas: {
    flex: 1,
    backgroundColor: 'rgb(128, 155, 174)',
    borderRadius: 5,
    borderColor: false,
    color: tercero,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  dropdown: {
    backgroundColor: 'rgb(128, 155, 174)',
    borderRadius: 5,
    borderColor: false,
    paddingLeft: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textError: {
      color: 'red'
  },
})

export default ExclusiveCheckboxes;
