import React, {useState, useEffect} from 'react';
import styles from './style-camposPred';
import TextInputCustom from '../../components/textInputCustome';
import {secundario, tercero} from '../../styles/style-colors';
import {useForm} from 'react-hook-form';
import InputCoordenadas from '../../components/coordenadas-select/coordenadasComponent';
import CustomDropdown from '../../components/listaComponente/ListaComponente';
import {data_Estados} from './../formulario/dataDropdowns';
import {ScrollView, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCache } from '../../services/storage/CacheContext';
import { useSelector } from 'react-redux';

const CamposPred = ({navigation, route}) => {
  const {currentTheme, themes} = useSelector((state) => state.theme);

    const theme = themes[currentTheme] || themes.light;
    const {  
        tabItemSelectColor,
        colorPrimario,
        colorSecundario,
        colorTerciario,
        colorCuaternario,
        colorQuinario,
    } = theme;

  const { cacheData, setCacheData } = useCache();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    Estado: '',
    Municipio: '',
    Localidad: '',
    Altitud: '',
    Grados_Latitud: '',
    Minutos_Latitud: '',
    Segundos_Latitud: '',
    Hemisferio_Latitud: '',
    Grados_Longitud: '',
    Minutos_Longitud: '',
    Segundos_Longitud: '',
    Hemisferio_Longitud: '',
    X: '',
    Y: '',
    Tipo_vegetacion: '',
    Informacion_ambiental: '',
    Suelo: '',
  });

  const reglasCoordenadas = {
    pattern: {
      value: /^[0-9.-]+$/, // Permite solo números, punto decimal y signo negativo
      message: 'Solo se permiten números y signos especiales.',
    },
    maxLength: {
      value: 10, // Establece el límite máximo de caracteres a 10
      message: 'El número máximo de caracteres permitidos es 10.',
    },
  };

  const reglasNoColecta = {
    required: 'Este campo es requerido.',
    pattern: {
      value: /^[0-9]+$/, // Permite solo números, punto decimal y signo negativo
      message: 'Solo se permiten números.',
    },
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@form_default', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // Función para eliminar datos
  const removeData = async () => {
    try {
      //console.log('Valores eliminados');
      // Eliminar datos de la caché
      setCacheData(null);
      await AsyncStorage.removeItem('@form_default');
      navigation.goBack();
    } catch (e) {
      // error removing value
    }
  };

  //agrega la nueva toma a la lista de tomas
  const onSubmit = data => {
    //console.log('Valores predeterminados guardados');
    //console.log(data);
    // Validar si todos los campos están vacíos
    const areAllEmpty = Object.values(data).every(value => value === '' || value === undefined);

    const tomaData = areAllEmpty
      ? null
      : {
          Estado: data.Estado,
          Municipio: data.Municipio,
          Localidad: data.Localidad,
          Altitud: data.Altitud,
          Grados_Latitud: data.Grados_Latitud,
          Minutos_Latitud: data.Minutos_Latitud,
          Segundos_Latitud: data.Segundos_Latitud, 
          Hemisferio_Latitud: data.Hemisferio_Latitud,
          Grados_Longitud: data.Grados_Longitud,
          Minutos_Longitud: data.Minutos_Longitud,
          Segundos_Longitud: data.Segundos_Longitud, 
          Hemisferio_Longitud: data.Hemisferio_Longitud,
          X: data.X,
          Y: data.Y,
          Tipo_vegetacion: data.Tipo_vegetacion,
          Informacion_ambiental: data.Informacion_ambiental,
          Suelo: data.Suelo,
        };
    //setDatosPred(tomaData);
    //console.log(datosPred);
    storeData(tomaData);
    setCacheData(data);
    navigation.goBack();
  };

  useEffect(() => {
    if (cacheData) {
      //console.log(cacheData);
      Object.keys(cacheData).forEach(key => {
        setValue(key, cacheData[key]);
      });
    }
  }, [cacheData]);

  return (
    <View style={{flex: 1, backgroundColor: colorSecundario}}>
      <ScrollView style={[styles.containerF, {backgroundColor: colorPrimario}]}>
        <Text style={[styles.textTitle, { color: colorQuinario }]}>Campos Predeterminados</Text>
        <CustomDropdown
          label="Estado:"
          data={data_Estados}
          allowCustomOption={false}
          allowSearchOption={false}
          name={'Estado'}
          control={control}
          errors={errors}
          placeholder={'Selecciona un Estado'}
        />
        <TextInputCustom
          label="Municipio:"
          control={control}
          name="Municipio"
          errors={errors}
        />
        <TextInputCustom
          label="Localidad:"
          control={control}
          name="Localidad"
          errors={errors}
        />
        <TextInputCustom
          label="Altitud (m.s.n.m):"
          control={control}
          name="Altitud"
          errors={errors}
          keyboardType={'numeric'}
        />
        <InputCoordenadas
          control={control}
          rules={reglasCoordenadas}
          errors={errors}
          name1="Grados_Latitud"
          name2="Minutos_Latitud"
          name3="Segundos_Latitud"
          name4="Hemisferio_Latitud"
          name5="Grados_Longitud"
          name6="Minutos_Longitud"
          name7="Segundos_Longitud"
          name8="Hemisferio_Longitud"
          name9="X"
          name10="Y"
          setValue={setValue}
          watch={watch}
        />
        <TextInputCustom
          label="Tipo de vegetación:"
          control={control}
          name="Tipo_vegetacion"
          errors={errors}
          tooltip={
            'Menciona el ecosistema en el que estás colectando (p.e. selva, bosque, pastizal)'
          }
        />
        <TextInputCustom
          label="Información Ambiental:"
          control={control}
          name="Informacion_ambiental"
          errors={errors}
          tooltip={'Anota el estado del tiempo cuando colectaste la planta'}
        />
        <TextInputCustom
          label="Suelo:"
          control={control}
          name="Suelo"
          errors={errors}
          tooltip={'Anota el color, si está mojado o seco y sensación al tacto'}
        />
        <Text></Text>
        <Text></Text>
      </ScrollView>
      <View style={styles.containerButton}>
        <TouchableOpacity
          style={[styles.bGuardar, styles.fondoP]}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.textB}>Guardar Valores predeterminados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bEliminar]} onPress={removeData}>
          <Text style={styles.textB}>Eliminar Valores predeterminados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CamposPred;
