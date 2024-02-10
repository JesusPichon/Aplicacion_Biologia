import React, { useState } from "react";
import styles from "../../styles/style-app";
import TextInputCustom from "../../components/textInputCustome";
import { Dropdown } from "react-native-element-dropdown";
import { secundario } from "../../styles/style-colors";

import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
    KeyboardAvoidingView
} from "react-native";

import {
    useForm,
    Controller
} from "react-hook-form";

import ExclusiveCheckboxes from "../../components/coordenadas-select/coordselCustom";

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

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

    // const [value, setValue] = useState(null);
    // const [isFocus, setIsFocus] = useState(false);

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
                <ExclusiveCheckboxes 
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
                />
                <TextInputCustom
                    label="Información Ambiental:"
                    control={control}
                    name="Informacion_ambiental"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Suelo:"
                    control={control}
                    name="Suelo"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Asociada:"
                    control={control}
                    name="Asociada"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Abundancia:"
                    control={control}
                    name="Abundancia"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Forma Biológica:"
                    control={control}
                    name="Forma_biologica"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Tamaño:"
                    control={control}
                    name="Tamano"
                    errors={errors}
                />
                <TextInputCustom
                    label="Flor:"
                    control={control}
                    name="Flor"
                    errors={errors}
                />
                <TextInputCustom
                    label="Fruto:"
                    control={control}
                    name="Fruto"
                    errors={errors}
                />
                <TextInputCustom
                    label="Usos:"
                    control={control}
                    name="Usos"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Colector(es):"
                    control={control}
                    name="Colector_es"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="No. de colecta:"
                    control={control}
                    name="No_colecta"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Fecha:"
                    control={control}
                    name="Fecha"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                />
                <TextInputCustom
                    label="Determino:"
                    control={control}
                    name="Determino"
                    errors={errors}
                />
                <TextInputCustom
                    label="Otros Datos:"
                    control={control}
                    name="Otros_datos"
                    errors={errors}
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