import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet,Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { principal, secundario, tercero } from '../../styles/style-colors';
import { CheckBox } from '@rneui/themed';
import { Dropdown } from "react-native-element-dropdown";

const Hemisferio_longitud = [
  { label: 'Este', value: 'Este' },
  { label: 'Oeste', value: 'Oeste' }
];

const Hemisferio_latitud = [
  { label: 'Norte', value: 'Norte' },
  { label: 'Sur', value: 'Sur' }
];

const InputCoordenadas = ({control, rules, errors, name1, name2, name3, name4, name5, name6, name7, name8, name9, name10, watch, setValue }) => {
  const watchOption = watch('option', 'geographic'); 
  const setValueOption = (value) => {setValue('option', value);};
  const [isFocus, setIsFocus] = useState(false);
  const [selectedLatitud, setSelectedLatitud] = useState('Norte'); // Estado local para la latitud
  const [selectedLongitud, setSelectedLongitud] = useState('Oeste'); // Estado local para la longitud

  const handleOptionChange = (value) => {
    if (value === 'geographic') {
        setValue(name9, ''); // Campo de coordenada X
        setValue(name10, ''); // Campo de coordenada Y
    } else if (value === 'metric') {
        setValue(name1, ''); // Campo de grados de latitud
        setValue(name2, ''); // Campo de minutos de latitud
        setValue(name3, ''); // Campo de segundos de latitud
        setValue(name4, 'Norte'); // Dropdown de hemisferio de latitud
        setValue(name5, ''); // Campo de grados de longitud
        setValue(name6, ''); // Campo de minutos de longitud
        setValue(name7, ''); // Campo de segundos de latitud
        setValue(name8, 'Oeste'); // Dropdown de hemisferio de longitud
    }
    setValueOption(value);
  };

  useEffect(() => {
    // Actualiza el estado local de la latitud cuando se cambia el valor seleccionado
    setValue(name4, selectedLatitud);
  }, [selectedLatitud]);

  useEffect(() => {
    // Actualiza el estado local de la longitud cuando se cambia el valor seleccionado
    setValue(name8, selectedLongitud);
  }, [selectedLongitud]);

  return (
    <View style={styles.container}>
      <Text style={styles.textP}>Coordenadas:</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CheckBox
          center
          title="Geográficas"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={watchOption === 'geographic'}
          onPress={() => {
            handleOptionChange('geographic');
          }}
        />
        <CheckBox
          center
          title="Métricas"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={watchOption === 'metric'}
          onPress={() => {
            handleOptionChange('metric');
          }}
        />
      </View>

      {watchOption === 'geographic' && (
        <View style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.textPCoordenadas}>Latitud:</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese los grados de latitud"
                  keyboardType="numeric"
                />
              )}
              name={name1}
              defaultValue="" 
              rules={rules}
            />
            {errors && errors[name1] && <Text style={styles.textError}>{errors[name1].message}</Text>}
          </View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese los minutos de latitud"
                  keyboardType="numeric"
                />
              )}
              name={name2}
              defaultValue="" 
              rules={rules} 
            />
            {errors && errors[name2] && <Text style={styles.textError}>{errors[name2].message}</Text>}
          </View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese los segundos de latitud"
                  keyboardType="numeric"
                />
              )}
              name={name3}
              defaultValue="" 
              rules={rules} 
            />
            {errors && errors[name3] && <Text style={styles.textError}>{errors[name3].message}</Text>}
          </View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Dropdown
                  style={styles.dropdown}
                  iconColor='#FFF'
                  data={Hemisferio_latitud}
                  labelField="label"
                  valueField="value"
                  placeholder="Hemisferio de latitud"
                  selectedTextStyle={styles.selectedTextStyle}
                  value={value}
                  onChange={(selectedItem) => {
                    onChange(selectedItem.value);
                    onBlur();
                  }}
                />
              )}
              name={name4}
              defaultValue="Norte"
              rules={{ required: true }}
            />
          </View>
          <Text style={styles.textPCoordenadas}>Longitud:</Text>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese los grados de longitud"
                  keyboardType="numeric"
                />
              )}
              name={name5}
              defaultValue=""
              rules={rules}
            />
            {errors && errors[name5] && <Text style={styles.textError}>{errors[name5].message}</Text>}
          </View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese los minutos de longitud"
                  keyboardType="numeric"
                />
              )}
              name={name6}
              defaultValue="" 
              rules={rules} 
            />
            {errors && errors[name6] && <Text style={styles.textError}>{errors[name6].message}</Text>}
          </View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese los segundos de longitud"
                  keyboardType="numeric"
                />
              )}
              name={name7}
              defaultValue=""
              rules={rules}
            />
            {errors && errors[name7] && <Text style={styles.textError}>{errors[name7].message}</Text>}
          </View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
              <Dropdown
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.ContainerStyle}
                iconColor='#FFF'
                data={Hemisferio_longitud}
                labelField="label"
                valueField="value"
                placeholder="Hemisferio de longitud"
                value={value}
                onChange={(selectedItem) => {
                  onChange(selectedItem.value);
                  onBlur(); 
                }}
              />
              )}
              name={name8}
              defaultValue="Oeste"
              rules={{ required: true }}
            />
          </View>
          <Text style={styles.textPCoordenadasFinal}>
            Latitud: {watch(name1)}° {watch(name2)}' {watch(name3)}" {watch(name4)}
          </Text>
          <Text style={styles.textPCoordenadasFinal}>
            Longitud: {watch(name5)}° {watch(name6)}' {watch(name7)}" {watch(name8)}
          </Text>
        </View>
      )}

      {watchOption === 'metric' && (
        <View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese la coordenada X"
                  keyboardType="numeric"
                />
              )}
              name={name9}
              defaultValue="" 
              rules={rules} 
            />
            {errors && errors[name9] && <Text style={styles.textError}>{errors[name9].message}</Text>}
          </View>
          <View style={styles.container}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textInputCoordenadas}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese la coordenada Y"
                  keyboardType="numeric"
                />
              )}
              name={name10}
              defaultValue="" 
              rules={rules} 
            />
            {errors && errors[name10] && <Text style={styles.textError}>{errors[name10].message}</Text>}
          </View>
          <Text style={styles.textPCoordenadasFinal}>
            X: {watch(name9)}    Y: {watch(name10)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  textP: {
    color: principal,
    textAlign: 'left',
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 15
  },
  textPCoordenadas: {
    color: principal,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft:10,
    fontSize: 15
  },
  textPCoordenadasFinal: {
    color: principal,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15
  },
  textInputCoordenadas: {
    flex: 1,
    backgroundColor: 'rgb(128, 155, 174)',
    borderRadius: 5,
    borderColor: false,
    color: tercero,
    paddingLeft: 10,
    paddingRight: 10,
    // marginBottom: 10,
    marginHorizontal: 10,
    fontSize: 16,
  },
  textError: {
      color: 'red',
      marginLeft: 10,
  },
  dropdown:{
    marginHorizontal: 10,
    backgroundColor: 'rgb(128, 155, 174)',
    borderRadius: 5,
    paddingHorizontal: 10,

  },
  selectedTextStyle: {
    color: tercero,
    fontWeight: 'bold',
  },
  ContainerStyle: {
    borderRadius: 10,
  },
})

export default InputCoordenadas;
