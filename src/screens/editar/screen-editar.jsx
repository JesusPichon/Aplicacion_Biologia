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


import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";

const data_Estados = [
    { label: 'Aguascalientes', value: 'aguascalientes' },
    { label: 'Baja California', value: 'baja_california' },
    { label: 'Baja California Sur', value: 'baja_california_sur' },
    { label: 'Campeche', value: 'campeche' },
    { label: 'Chiapas', value: 'chiapas' },
    { label: 'Chihuahua', value: 'chihuahua' },
    { label: 'Ciudad de México', value: 'ciudad_de_mexico' },
    { label: 'Coahuila', value: 'coahuila' },
    { label: 'Colima', value: 'colima' },
    { label: 'Durango', value: 'durango' },
    { label: 'Estado de México', value: 'estado_de_mexico' },
    { label: 'Guanajuato', value: 'guanajuato' },
    { label: 'Guerrero', value: 'guerrero' },
    { label: 'Hidalgo', value: 'hidalgo' },
    { label: 'Jalisco', value: 'jalisco' },
    { label: 'Michoacán', value: 'michoacan' },
    { label: 'Morelos', value: 'morelos' },
    { label: 'Nayarit', value: 'nayarit' },
    { label: 'Nuevo León', value: 'nuevo_leon' },
    { label: 'Oaxaca', value: 'oaxaca' },
    { label: 'Puebla', value: 'puebla' },
    { label: 'Querétaro', value: 'queretaro' },
    { label: 'Quintana Roo', value: 'quintana_roo' },
    { label: 'San Luis Potosí', value: 'san_luis_potosi' },
    { label: 'Sinaloa', value: 'sinaloa' },
    { label: 'Sonora', value: 'sonora' },
    { label: 'Tabasco', value: 'tabasco' },
    { label: 'Tamaulipas', value: 'tamaulipas' },
    { label: 'Tlaxcala', value: 'tlaxcala' },
    { label: 'Veracruz', value: 'veracruz' },
    { label: 'Yucatán', value: 'yucatan' },
    { label: 'Zacatecas', value: 'zacatecas' },
    { label: 'Otro...', value: 'otro' },
];
  

const data_Abundancia = [
    { label: 'Abundante', value: 'Abundante' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Escasa', value: 'Escasa' },
    { label: 'Otro...', value: 'otro' },
];

const data_FormaBio = [
    { label: 'Hierba', value: 'Hierba' },
    { label: 'Arbusto', value: 'Arbusto' },
    { label: 'Árbol', value: 'Árbol' },
    { label: 'Otro...', value: 'otro' },
];

const FormularioEdit = ({ navigation, route }) => {
    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [datosEditados, setDatosEditados] = useState({});
    useEffect(() => {
        // Valores de ejemplo, puedes cambiarlos por los valores reales
        const datosIniciales = route.params.data;
        console.log(datosIniciales)

        // Establecer los valores iniciales en el estado del formulario
        Object.keys(datosIniciales).forEach(key => {
            if (key === 'Fecha') {
                // Separar la fecha en partes
                const partesFecha = datosIniciales[key].split('/');
                // Crear un objeto Date con el formato MM/DD/AA
                const fechaAcomodada = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

                setValue(key, fechaAcomodada);
                //setValue(key, datosIniciales[key]);

            }else if (key === 'Grados_Latitud' || key === 'Minutos_Latitud' || key === 'Grados_Longitud' || key === 'Minutos_Longitud' || key === 'X' || key === 'Y') {
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
            hemisferio_Latitud: datosEditar.Hemisferio_Latitud,
            grados_Longitud: datosEditar.Grados_Longitud,
            minutos_Longitud: datosEditar.Minutos_Longitud,
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
            hemisferio_Latitud: datosEditar.Hemisferio_Latitud,
            grados_Longitud: datosEditar.Grados_Longitud,
            minutos_Longitud: datosEditar.Minutos_Longitud,
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
                    errors={errors}
                />
                {/* <TextInputCustom
                    label="Estado:"
                    control={control}
                    name="Estado"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                /> */}
                <CustomDropdown
                    label="Estado:"
                    data={data_Estados}
                    allowCustomOption={false}
                    allowSearchOption={false}
                    name={"Estado"}
                    control={control}
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
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
                    label="Altitud:"
                    control={control}
                    name="Altitud"
                    errors={errors}
                />
                <Text style={styles.textP}>Coordenadas:</Text>
                <InputCoordenadas 
                    control={control}
                    rules={reglasCoordenadas}
                    errors={errors}
                    name1="Grados_Latitud" 
                    name2="Minutos_Latitud"
                    name3="Hemisferio_Latitud"
                    name4="Grados_Longitud"
                    name5="Minutos_Longitud"
                    name6="Hemisferio_Longitud"
                    name7="X"
                    name8="Y"
                    setValue={setValue}
                    watch={watch}
                />
                <TextInputCustom
                    label="Tipo de vegetación:"
                    control={control}
                    name="Tipo_vegetacion"
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Información Ambiental:"
                    control={control}
                    name="Informacion_ambiental"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Suelo:"
                    control={control}
                    name="Suelo"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Asociada:"
                    control={control}
                    name="Asociada"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
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
                    tooltip={"Aqui va un mensaje de ayuda"}
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
                    tooltip={"Aqui va un mensaje de ayuda"}
                    placeholder={"Selecciona un item"}
                />
                <TextInputCustom
                    label="Tamaño:"
                    control={control}
                    name="Tamano"
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Flor:"
                    control={control}
                    name="Flor"
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Fruto:"
                    control={control}
                    name="Fruto"
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Usos:"
                    control={control}
                    name="Usos"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Colector(es):"
                    control={control}
                    name="Colector_es"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="No. de colecta:"
                    control={control}
                    name="No_colecta"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <FechaComponente
                    control={control}
                    name="Fecha"
                    errors={errors}
                    rules={{ required: 'Este campo es requerido.' }}
                />
                <TextInputCustom
                    label="Determino:"
                    control={control}
                    name="Determino"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Otros Datos:"
                    control={control}
                    name="Otros_datos"
                    errors={errors}
                    multiline={true} // Pernmite multilinea en el textinput
                    maxLines={20} // Indica el numero de lineas maximo en el textinput (Solo si multiline = true)
                    tooltip={"Aqui va un mensaje de ayuda"}
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