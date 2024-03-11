import React, { useState, useEffect } from "react";
import styles from "../../styles/style-app";
import TextInputCustom from "../../components/textInputCustome";
import { principal, secundario, tercero } from "../../styles/style-colors";
import { useForm } from "react-hook-form";
import { Button} from '@rneui/themed';
import InputCoordenadas from "../../components/coordenadas-select/coordenadasComponent";
import FechaComponente from "../../components/fecha-select/FechaComponente";
import  CustomDropdown  from "../../components/listaComponente/ListaComponente";
import { editarToma } from "../../services/database/SQLite";
import { data_Estados, data_Abundancia, data_FormaBio } from "../formulario/dataDropdowns";

import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";

const FormularioEdit = ({ navigation, route }) => {
    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [datosEditados, setDatosEditados] = useState({});

    useEffect(() => {
        const datosIniciales = route.params.data;
        console.log(datosIniciales)

        // Establecer los valores iniciales en el estado del formulario
        Object.keys(datosIniciales).forEach(key => {
            if (key === 'Fecha') {
                console.log(datosIniciales[key])
                // Separar la fecha en partes
                const partesFecha = datosIniciales[key].split('/');
                // Crear un objeto Date con el formato MM/DD/AA
                const fechaAcomodada = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

                setValue(key, fechaAcomodada);
                //setValue(key, datosIniciales[key]);

            }else if (key === 'Grados_Latitud' || key === 'Minutos_Latitud' || key === 'Segundos_Latitud' || key === 'Grados_Longitud' || key === 'Minutos_Longitud' || key === 'Segundos_Longitud' || key === 'X' || key === 'Y' || key === 'Altitud' || key === 'Tamano') {
                let contenido = '';
                
                // Separar la fecha en partes
                if (datosIniciales[key] === '' || datosIniciales[key] === null){
                    contenido = '';
                }else{
                    contenido = datosIniciales[key].toString();
                }

                setValue(key, contenido);
                //setValue(key, datosIniciales[key]);

            }else {
                setValue(key, datosIniciales[key]);
            }
        });
    }, []); // Se ejecuta solo una vez al cargar el componente



    const reglasCoordenadas = {
        required: 'Este campo es requerido.',
        pattern: {
            value: /^[0-9.-]+$/, // Permite solo números, punto decimal y signo negativo
            message: 'Solo se permiten números y signos especiales.'
        },
        maxLength: {
            value: 10, // Establece el límite máximo de caracteres a 10
            message: 'El número máximo de caracteres permitidos es 10.'
        }
    };
      
    const onSubmit = (data) => {
        console.log(data);
    };

    const handleEditar = () => {
        const datosEditados = watch(); // Obtener los datos editados del formulario
        setDatosEditados(datosEditados); // Actualizar el estado con los datos editados
        editar(datosEditados);
    };

    function editar(datosEditar) {
        tomasData = {
            nombre_cientifico: datosEditar.Nombre_cientifico,
            familia: datosEditar.Familia,
            nombre_local: datosEditar.Nombre_local,
            estado: datosEditar.Estado,
            municipio: datosEditar.Municipio,
            localidad: datosEditar.Localidad,
            altitud: datosEditar.Altitud,
            grados_Latitud: datosEditar.Grados_Latitud,
            minutos_Latitud: datosEditar.Minutos_Latitud,
            segundos_Latitud: datosEditar.Segundos_Latitud,
            hemisferio_Latitud: datosEditar.Hemisferio_Latitud,
            grados_Longitud: datosEditar.Grados_Longitud,
            minutos_Longitud: datosEditar.Minutos_Longitud,
            segundos_Longitud: datosEditar.Segundos_Longitud,
            hemisferio_Longitud: datosEditar.Hemisferio_Longitud,
            x: datosEditar.X,
            y: datosEditar.Y,
            tipo_vegetacion: datosEditar.Tipo_vegetacion,
            informacion_ambiental: datosEditar.Informacion_ambiental,
            suelo: datosEditar.Suelo,
            asociada: datosEditar.Asociada,
            abundancia: datosEditar.Abundancia,
            forma_biologica: datosEditar.Forma_biologica,
            tamano: datosEditar.Tamano,
            flor: datosEditar.Flor,
            fruto: datosEditar.Fruto,
            usos: datosEditar.Usos,
            colector_es: datosEditar.Colector_es,
            no_colecta: datosEditar.No_colecta,
            fecha: datosEditar.Fecha.toLocaleDateString("gregory"),
            determino: datosEditar.Determino,
            otros_datos: datosEditar.Otros_datos,
        };

        data = {
            nombre_cientifico: datosEditar.Nombre_cientifico,
            familia: datosEditar.Familia,
            nombre_local: datosEditar.Nombre_local,
            estado: datosEditar.Estado,
            municipio: datosEditar.Municipio,
            localidad: datosEditar.Localidad,
            altitud: datosEditar.Altitud,
            grados_Latitud: datosEditar.Grados_Latitud,
            minutos_Latitud: datosEditar.Minutos_Latitud,
            segundos_Latitud: datosEditar.Segundos_Latitud,
            hemisferio_Latitud: datosEditar.Hemisferio_Latitud,
            grados_Longitud: datosEditar.Grados_Longitud,
            minutos_Longitud: datosEditar.Minutos_Longitud,
            segundos_Longitud: datosEditar.Segundos_Longitud,
            hemisferio_Longitud: datosEditar.Hemisferio_Longitud,
            x: datosEditar.X,
            y: datosEditar.Y,
            tipo_vegetacion: datosEditar.Tipo_vegetacion,
            informacion_ambiental: datosEditar.Informacion_ambiental,
            suelo: datosEditar.Suelo,
            asociada: datosEditar.Asociada,
            abundancia: datosEditar.Abundancia,
            forma_biologica: datosEditar.Forma_biologica,
            tamano: datosEditar.Tamano,
            flor: datosEditar.Flor,
            fruto: datosEditar.Fruto,
            usos: datosEditar.Usos,
            colector_es: datosEditar.Colector_es,
            no_colecta: datosEditar.No_colecta,
            fecha: datosEditar.Fecha.toLocaleDateString("gregory"),
            determino: datosEditar.Determino,
            otros_datos: datosEditar.Otros_datos,
            id: datosEditar.id,
        };
    
        // Llamar a la función editarToma con los datos editados y el id correspondiente
        console.log("enviando: ")
        console.log(data);
        editarToma(tomasData, datosEditar.id);
        navigation.navigate('InformacionToma', {data});
        //console.log("Datos editados:", datos); // Mostrar los datos editados por consola
    }
    
    

    return (
        <View style={{
            backgroundColor: secundario,
            /*marginTop: Constants.statusBarHeight,*/
            flex: 1
        }}>
            {/*<StatusBar
                style="light"
                animated={true}
                backgroundColor={secundario}
            />
            {/* <KeyboardAvoidingView> */}
            <ScrollView style={[styles.containerF, styles.fondoT]}>
                <Text style={styles.textTitle}>Ficha de Datos</Text>
                <TextInputCustom
                    label="Nombre Científico:"
                    control={control}
                    name="Nombre_cientifico"
                    errors={errors}
                />
                <TextInputCustom
                    label="Familia:"
                    control={control}
                    name="Familia"
                    errors={errors}
                />
                <TextInputCustom
                    label="Nombre Local:"
                    control={control}
                    name="Nombre_local"
                    tooltip={"Escribelos si te acompañó un guia de la zona y te dijo como le llaman"}
                    errors={errors}
                />
                <CustomDropdown
                    label="Estado:"
                    data={data_Estados}
                    allowCustomOption={false}
                    allowSearchOption={false}
                    name={"Estado"}
                    control={control}
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    placeholder={"Selecciona un Estado"}
                />
                <TextInputCustom
                    label="Municipio:"
                    control={control}
                    name="Municipio"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Localidad:"
                    control={control}
                    name="Localidad"
                    rules={{ required: 'Este campo es requerido.' }}
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
                    tooltip={"Menciona el ecosistema en el que estás colectando (p.e. selva, bosque, pastizal)"}
                />
                <TextInputCustom
                    label="Información Ambiental:"
                    control={control}
                    name="Informacion_ambiental"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Anota el estado del tiempo cuando colectaste la planta"}
                />
                <TextInputCustom
                    label="Suelo:"
                    control={control}
                    name="Suelo"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Anota el color, si está mojado o seco y sensación al tacto"}
                />
                <TextInputCustom
                    label="Asociada:"
                    control={control}
                    name="Asociada"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Anota el nombre de las plantas que conoces que están alrededor de la que colectaste"}
                />
                <CustomDropdown
                    label="Abundancia:"
                    data={data_Abundancia}
                    allowCustomOption={false}
                    allowSearchOption={false}
                    name={"Abundancia"}
                    control={control}
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Selecciona la cantidad de plantas que observas"}
                    placeholder={"Selecciona un item"}
                />
                <CustomDropdown
                    label="Forma Biológica:"
                    data={data_FormaBio}
                    allowCustomOption={true}
                    allowSearchOption={false}
                    name={"Forma_biologica"}
                    control={control}
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Elige o anota la forma de tu planta"}
                    placeholder={"Selecciona un item"}
                />
                <TextInputCustom
                    label="Tamaño (m):"
                    control={control}
                    name="Tamano"
                    errors={errors}
                    tooltip={"Estima o mide el tamaño "}
                    keyboardType={'numeric'}
                />
                <TextInputCustom
                    label="Flor:"
                    control={control}
                    name="Flor"
                    errors={errors}
                    tooltip={"Escribe el color o si conoces información detallada, ponla aquí"}
                />
                <TextInputCustom
                    label="Fruto:"
                    control={control}
                    name="Fruto"
                    errors={errors}
                    tooltip={"Escribe el color, tipo, si conoces información detallada, ponla aquí "}
                />
                <TextInputCustom
                    label="Usos:"
                    control={control}
                    name="Usos"
                    errors={errors}
                    tooltip={"Escribelos si te acompaño un guia de la zona y te dijo como se utiliza "}
                />
                <TextInputCustom
                    label="Colector(es):"
                    control={control}
                    name="Colector_es"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Escribe el nombre y apellido de el colector o los colectores"}
                />
                <TextInputCustom
                    label="No. de colecta:"
                    control={control}
                    name="No_colecta"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Escribe el número de colecta del colector principal"}
                    keyboardType={'numeric'}
                />
                <FechaComponente
                    control={control}
                    name="Fecha"
                    errors={errors}
                    rules={{ required: 'Este campo es requerido.' }}
                    tooltip={"Selecciona la fecha del día de la colecta (comentario)"}
                />
                <TextInputCustom
                    label="Determino:"
                    control={control}
                    name="Determino"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Nombre y apellido de la persona que te ayudo con el nombre de la app"}
                />
                <TextInputCustom
                    label="Otros Datos:"
                    control={control}
                    name="Otros_datos"
                    errors={errors}
                    multiline={true} // Pernmite multilinea en el textinput
                    maxLines={20} // Indica el numero de lineas maximo en el textinput (Solo si multiline = true)
                    tooltip={"Anota información que consideres importante sobre la planta (aroma, liquidos, sensación al tacto, etc. )"}
                />
                <Button 
                    type="solid"
                    onPress={handleEditar}
                    title="  Editar" 
                    buttonStyle={{ backgroundColor: principal}}
                    icon={{name: 'edit', color: tercero}}
                    titleStyle={{ color: tercero }}
                />
                <Text>   </Text>
            </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}

export default FormularioEdit;