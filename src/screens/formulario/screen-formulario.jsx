import React, { useState } from "react";
import styles from "../../styles/style-app";
import TextInputCustom from "../../components/textInputCustome";
import { secundario, tercero } from "../../styles/style-colors";
import { useForm } from "react-hook-form";
import InputCoordenadas from "../../components/coordenadas-select/coordenadasComponent";
import FechaComponente from "../../components/fecha-select/FechaComponente";
import CustomDropdown from "../../components/listaComponente/ListaComponente";
import { insertarTomas, consultarIdGrupo } from "../../services/database/SQLite";
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

const Formulario = ({ route }) => {


    //funcion para agregar tomas 
    const nombreCanal = route.params.nombreCanal;
    //console.log(nombreCanal);

    //const {agregar} = route.params;

    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        Nombre_cientifico: '',
        Familia: '',
        Nombre_local: '',
        Estado: '',
        Municipio: '',
        Localidad: '',
        Altitud: '',
        Grados_Latitud: '',
        Minutos_Latitud: '',
        Hemisferio_Latitud: '',
        Grados_Longitud: '',
        Minutos_Longitud: '',
        Hemisferio_Longitud: '',
        X: '',
        Y: '',
        Tipo_vegetacion: '',
        Informacion_ambiental: '',
        Suelo: '',
        Asociada: '',
        Abundancia: '',
        Forma_biologica: '',
        Tamano: '',
        Flor: '',
        Fruto: '',
        Usos: '',
        Colector_es: '',
        No_colecta: '',
        Fecha: '',
        Determino: '',
        Otros_datos: '',
    });

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

    //agrega la nueva toma a la lista de tomas 
    const onSubmit = (data) => {

        //id para identificar el grupo de la toma 
        let grupoID;

        const tomaData = {
            nombre_cientifico: data.Nombre_cientifico,
            familia: data.Familia,
            nombre_local: data.Nombre_local,
            estado: data.Estado,
            municipio: data.Municipio,
            localidad: data.Localidad,
            altitud: data.Altitud,
            grados_Latitud: data.Grados_Latitud,
            minutos_Latitud: data.Minutos_Latitud,
            hemisferio_Latitud: data.Hemisferio_Latitud,
            grados_Longitud: data.Grados_Longitud,
            minutos_Longitud: data.Minutos_Longitud,
            hemisferio_Longitud: data.Hemisferio_Longitud,
            x: data.X,
            y: data.Y,
            tipo_vegetacion: data.Tipo_vegetacion,
            informacion_ambiental: data.Informacion_ambiental,
            suelo: data.Suelo,
            asociada: data.Asociada,
            abundancia: data.Abundancia,
            forma_biologica: data.Forma_biologica,
            tamano: data.Tamano,
            flor: data.Flor,
            fruto: data.Fruto,
            usos: data.Usos,
            colector_es: data.Colector_es,
            no_colecta: data.No_colecta,
            fecha: data.Fecha.toLocaleDateString("gregory"),
            determino: data.Determino,
            otros_datos: data.Otros_datos,
            grupo: grupoID,
        };

        consultarIdGrupo(nombreCanal)
            .then((id) => {
                tomaData.grupo = id; // Asignar el id del grupo a tomaData
                return insertarTomas(tomaData);
            })
            .then()
            .catch((error) => console.error("Error insertar toma: ", error));
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
                <TouchableOpacity
                    style={[styles.bGuardar, styles.fondoP]}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.textT}>Guardar</Text>
                </TouchableOpacity>
                <Text>   </Text>
            </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </View>
    )
}

export default Formulario;