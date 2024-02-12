import React, { useState } from "react";
import styles from "../../styles/style-app";
import TextInputCustom from "../../components/textInputCustome";
import { secundario, tercero } from "../../styles/style-colors";
import { useForm } from "react-hook-form";
import InputCoordenadas from "../../components/coordenadas-select/coordenadasComponent";
import FechaComponente from "../../components/fecha-select/FechaComponente";

import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";

const Formulario = () => {
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
        X:'',
        Y:'',
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
      
    const onSubmit = (data) => {
        console.log(data);
    };

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
                <TextInputCustom
                    label="Estado:"
                    control={control}
                    name="Estado"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
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
                <TextInputCustom
                    label="Abundancia:"
                    control={control}
                    name="Abundancia"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
                />
                <TextInputCustom
                    label="Forma Biológica:"
                    control={control}
                    name="Forma_biologica"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Aqui va un mensaje de ayuda"}
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