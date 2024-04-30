import styles from "./style-camposPred";
import TextInputCustom from "../../components/textInputCustome";
import { secundario, tercero } from "../../styles/style-colors";
import { useForm } from "react-hook-form";
import InputCoordenadas from "../../components/coordenadas-select/coordenadasComponent";
import FechaComponente from "../../components/fecha-select/FechaComponente";
import CustomDropdown from "../../components/listaComponente/ListaComponente";
import { data_Estados, data_Abundancia, data_FormaBio } from "./../formulario/dataDropdowns";
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from "react-native";

const CamposPred = () => {

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
        Segundos_Latitud: '', //Nueva variable
        Hemisferio_Latitud: '',
        Grados_Longitud: '',
        Minutos_Longitud: '',
        Segundos_Longitud: '', //Nueva variable
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

    const reglasNoColecta = {
        required: 'Este campo es requerido.',
        pattern: {
            value: /^[0-9]+$/, // Permite solo números, punto decimal y signo negativo
            message: 'Solo se permiten números.'
        },
    }

    //agrega la nueva toma a la lista de tomas 
    const onSubmit = async () => {
        console.log("Valores predeterminados guardados");
        const [user, setUser] = useMMKVStorage('user', storage, 'robert');
    }

    return (
        <View style={{ flex: 1, backgroundColor: secundario }}>
            
            <ScrollView style={[styles.containerF, styles.fondoT]}>
                <Text style={styles.textTitle}>Valores Predeterminados</Text>
                {/* <TextInputCustom
                    label="Nombre Científico:"
                    control={control}
                    name="Nombre_cientifico"
                    errors={errors}
                /> */}
                {/* <TextInputCustom
                    label="Familia:"
                    control={control}
                    name="Familia"
                    errors={errors}
                /> */}
                {/* <TextInputCustom
                    label="Nombre Local:"
                    control={control}
                    name="Nombre_local"
                    tooltip={"Escribelos si te acompañó un guia de la zona y te dijo como le llaman"}
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
                {/* <InputCoordenadas
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
                /> */}
                {/* <TextInputCustom
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
                /> */}
                {/* <TextInputCustom
                    label="Asociada:"
                    control={control}
                    name="Asociada"
                    rules={{ required: 'Este campo es requerido.' }}
                    errors={errors}
                    tooltip={"Anota el nombre de las plantas que conoces que están alrededor de la que colectaste"}
                /> */}
                {/* <CustomDropdown
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
                /> */}
                {/* <CustomDropdown
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
                /> */}
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
                {/* <TextInputCustom
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
                    rules={reglasNoColecta}
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
                    errors={errors}
                    tooltip={"Nombre y apellido de la persona que te ayudo con el nombre de la app"}
                /> */}
                {/* <TextInputCustom
                    label="Otros Datos:"
                    control={control}
                    name="Otros_datos"
                    errors={errors}
                    multiline={true} // Pernmite multilinea en el textinput
                    maxLines={20} // Indica el numero de lineas maximo en el textinput (Solo si multiline = true)
                    tooltip={"Anota información que consideres importante sobre la planta (aroma, liquidos, sensación al tacto, etc. )"}
                /> */}
                
            </ScrollView>  
            <View style={styles.containerButton}>
                    <TouchableOpacity
                        style={[styles.bGuardar, styles.fondoP]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.textB}>Guardar Valores predeterminados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.bEliminar]}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.textB}>Eliminar Valores predeterminados</Text>
                    </TouchableOpacity>
                </View>           
        </View>       
    );
}


export default CamposPred;