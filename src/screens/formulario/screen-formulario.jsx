import React, { useState, useEffect, useMemo } from "react";
import styles from "./style-formulario";
import TextInputCustom from "../../components/textInputCustome";
import { principal, principalFePro, secundario, tercero } from "../../styles/style-colors";
import { useForm } from "react-hook-form";
import InputCoordenadas from "../../components/coordenadas-select/coordenadasComponent";
import FechaComponente from "../../components/fecha-select/FechaComponente";
import CustomDropdown from "../../components/listaComponente/ListaComponente";
import { insertarTomas, consultarIdGrupo } from "../../services/database/SQLite";
import { data_Estados, data_Abundancia, data_FormaBio } from "./dataDropdowns";
import { Button} from '@rneui/themed';
import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView
} from "react-native";
import seleccion from "../../components/Selecionar-Imagenes/selecion";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCache } from "../../services/storage/CacheContext";
import { Tab, TabView, Icon, } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { setUpdate } from "../../services/redux/slices/updateSlice";

const Formulario = ({navigation, route}) => {
    const [index, setIndex] = React.useState(0); // Ensure index is initialized
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

    const dispatch = useDispatch();

    // Estado para almacenar la URI de la imagen seleccionada
    const [imagenUri, setImagenUri] = useState(null); //El valor es null en caso de que el usuario no seleccione alguna imagen
    const [mensajeImagen, setMensajeImagen] = useState("No se ha seleccionado ninguna imagen"); // Estado para el mensaje de la imagen

    const AgregarImagen = async () => {
        try {
            const uri = await seleccion();
            //console.log('URI de la imagen seleccionada:', uri);
            if(uri != null) {
                setImagenUri(uri); // Actualiza el estado con la URI de la imagen seleccionada
                setMensajeImagen("Imagen seleccionada"); // Actualiza el estado del mensaje
            } else {
                setMensajeImagen("Selección cancelada, inténtelo de nuevo");
            }
        } catch (error) {
            setMensajeImagen('Error al seleccionar la imagen:', error);
        }
    };
    const { cacheData, setCacheData } = useCache();

    //nombre del canal donde se agregará la nueva toma 
    const nombreCanal = route.params.nombreGrupo;
   
    // Variables que almacenan los valores de los campos
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

    // Reglas que se aplican a los campos de coordenadas
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

    // Reglas que se aplican al campo No. Colecta
    const reglasNoColecta = {
        required: 'Este campo es requerido.',
        pattern: {
            value: /^[0-9]+$/, // Permite solo números, punto decimal y signo negativo
            message: 'Solo se permiten números.'
        },
    }

    // Funcion que agrega la nueva toma a la lista de tomas 
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
            segundos_Latitud: data.Segundos_Latitud, 
            hemisferio_Latitud: data.Hemisferio_Latitud,
            grados_Longitud: data.Grados_Longitud,
            minutos_Longitud: data.Minutos_Longitud,
            segundos_Longitud: data.Segundos_Longitud, 
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
            imagen: imagenUri, // Usa la URI almacenada en el estado
        };

        consultarIdGrupo(nombreCanal)
            .then((id) => {
                tomaData.grupo = id; // Asignar el id del grupo a tomaData
                console.log(tomaData.imagen);
                return insertarTomas(tomaData);
            })
            .catch((error) => console.error("Error insertar toma: ", error));
        
        dispatch(setUpdate());
        navigation.goBack();
    }

    useEffect(() => {
    if (cacheData) {
        Object.keys(cacheData).forEach(key => {
        setValue(key, cacheData[key]);
        });
    }
    }, [cacheData]);

    //const containerStyle = { borderRadius: 30, marginHorizontal: 10,}; // Estilo del título de la pestaña
    
    const titulos = useMemo(() => [
        'Datos generales', 'Ubicación', 'Ambiente', 'Información detallada', 'Datos del colector', 'Información extra'
    ],[]);

    const handleIndexChange = (e) => {
        if (e >= 0 && e < 6) { // Verifica si el nuevo índice está dentro de los límites
            setIndex(e);
        }
    };

    return (
        <View style={[styles.mainContainer, { backgroundColor: colorPrimario, }]}>
           <View style={{width: '10%', justifyContent: 'center'}}>
                <Icon
                name="menu"
                type="material"
                color={colorQuinario}
                size={30}
                onPress={() => navigation.openDrawer()}
                containerStyle={{marginVertical: 20, paddingLeft: 15}}
                />
            </View>
            <View style={[styles.secondaryContainer, { backgroundColor: colorSecundario, }]}>
                 <Text style={[styles.textTitle, { color: colorQuinario }]}>FICHA DE DATOS</Text>
                <Tab
                    value={index}
                    onChange={handleIndexChange}
                    disableIndicator={true}
                    style={{ marginTop: 5, marginHorizontal: 10 }}
                    scrollable={true}
                >
                    {titulos.map((title, idx) => (
                        <Tab.Item 
                            key={idx}
                            title={title} 
                            titleStyle={{fontSize: 15, fontWeight: index === idx ? 'bold' : 'normal', color: 'white'}}
                            containerStyle={{backgroundColor: colorTerciario, borderRadius:30, marginHorizontal:5, opacity:index === idx ? 1 : 0.3}}
                        />
                    ))}
                    
                </Tab>

                <TabView value={index} onChange={handleIndexChange} animationType="spring" >
                    <TabView.Item style={[styles.TabViewcontainer, { backgroundColor: colorPrimario }]}>
                        <ScrollView>
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
                        </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={[styles.TabViewcontainer, { backgroundColor: colorPrimario }]}>
                        <ScrollView>
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
                        </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={[styles.TabViewcontainer, { backgroundColor: colorPrimario }]}>
                        <ScrollView>
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
                        </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={[styles.TabViewcontainer, { backgroundColor: colorPrimario }]}>
                        <ScrollView>
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
                        </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={[styles.TabViewcontainer, { backgroundColor: colorPrimario }]}>
                        <ScrollView>
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
                            />
                        </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={[styles.TabViewcontainer, { backgroundColor: colorPrimario }]}>
                        <ScrollView>
                            <TextInputCustom
                                label="Otros Datos:"
                                control={control}
                                name="Otros_datos"
                                errors={errors}
                                multiline={true} // Permite multilinea en el textinput
                                maxLines={20} // Indica el numero de lineas maximo en el textinput (Solo si multiline = true)
                                tooltip={"Anota información que consideres importante sobre la planta (aroma, liquidos, sensación al tacto, etc. )"}
                            />
                        </ScrollView>
                    </TabView.Item>
                </TabView>
                <Button
                    radius={"sm"}
                    type="solid"
                    onPress={handleSubmit(onSubmit)}
                    title="GUARDAR"
                    containerStyle={{ marginHorizontal: 10, marginTop: 30, marginBottom: 20, }}
                    buttonStyle={{ backgroundColor: colorTerciario, height: 50, borderRadius: 30, }}
                    icon={{ name: 'save', color: 'white' }}
                    titleStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
                />
            </View>   
        </View>
    )
}

export default Formulario;