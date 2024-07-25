import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Icon, ListItem, CheckBox, Tab, TabView, Button } from '@rneui/themed';
import { Text, View, TextInput, FlatList, SafeAreaView, ActivityIndicator, ScrollView, Pressable } from "react-native";
import TomaController from "../../services/controllers/tomaController";
import { Dropdown } from "react-native-element-dropdown";
import { editarToma } from "../../services/database/SQLite";
import DateTimePicker from '@react-native-community/datetimepicker';
import {imprimirTomas} from "../../components/imprimir/imprimirSeleccionando";

const InfColecta = ({ navigation, route }) => {
    const { currentTheme, themes } = useSelector((state) => state.theme);
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState({});
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [coordTabIndex, setCoordTabIndex] = useState(0);
    const [textCoordenadas, setTextCoordenadas] = useState('');
    const [coordsChecked, setCoordsChecked] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [listPrint, setListPrint] = useState([]);



    const theme = themes[currentTheme] || themes.light;
    const {
        colorPrimario,
        colorSecundario,
        colorTerciario,
        colorCuaternario,
        colorQuinario,
    } = theme;

    const controller = new TomaController();

    useEffect(() => {
        cargarGrupos();
    }, []);

    useEffect(() => {
        if (data) {
            handleCoordenadas();
        }
    }, [data, coordTabIndex]);

    const cargarGrupos = async () => {
        try {
            const grupos = await controller.obtenerToma(route.params.id);
            if (grupos.length > 0) {
                const initialData = grupos[0];
                if (initialData.x != null && initialData.x != '') {
                    setCoordTabIndex(1);
                };
                setData(initialData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    
        const formattedDate = currentDate.toLocaleDateString('es-ES'); // Formato DD/MM/AAAA
        handleTextChange('fecha', formattedDate);
        console.log(formattedDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleCheckboxChange = useCallback((key) => {
        if (key === 'coordenadas') {
            setCoordsChecked(!coordsChecked);
        } else {
            setFilteredData((prevFilteredData) => ({
                ...prevFilteredData,
                [key]: !prevFilteredData[key],
            }));
        }
    }, [coordsChecked]);

    const handleTextChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const handleSubmitImprimir = () => {
        if (validateRequiredFields()) {
            const result = Object.keys(filteredData)
                .filter((key) => filteredData[key])
                .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
        
            if (coordsChecked) {
                result['coordenadas'] = textCoordenadas;
            }
            console.log('Data filtrada:', result);
            setListPrint([result]);
        }
    };

    // Efecto para imprimir después de que `listPrint` cambie
    useEffect(() => {
        if (listPrint.length > 0) {
            imprimirTomas(listPrint);
        }
    }, [listPrint]);

    const handleSubmitGuardar = () => {
        if (validateRequiredFields()) {
            if (coordTabIndex === 0) {
                data["x"] = '';
                data["y"] = '';
            }else {
                data["grados_Latitud"] = '';
                data["minutos_Latitud"] = '';
                data["segundos_Latitud"] = '';
                data["grados_Longitud"] = '';
                data["minutos_Longitud"] = '';
                data["segundos_Longitud"] = '';
            }
            let tomasData = {
                nombre_cientifico: data["nombre_cientifico"],
                familia: data["familia"],
                nombre_local: data["nombre_local"],
                estado: data["estado"],
                municipio: data["municipio"],
                localidad: data["localidad"],
                altitud: data["altitud"],
                grados_Latitud: data["grados_Latitud"],
                minutos_Latitud: data["minutos_Latitud"],
                segundos_Latitud: data["segundos_Latitud"],
                hemisferio_Latitud: data["hemisferio_Latitud"],
                grados_Longitud: data["grados_Longitud"],
                minutos_Longitud: data["minutos_Longitud"],
                segundos_Longitud: data["segundos_Longitud"],
                hemisferio_Longitud: data["hemisferio_Longitud"],
                x: data["x"],
                y: data["y"],
                tipo_vegetacion: data["tipo_vegetacion"],
                informacion_ambiental: data["informacion_ambiental"],
                suelo: data["suelo"],
                asociada: data["asociada"],
                abundancia: data["abundancia"],
                forma_biologica: data["forma_biologica"],
                tamano: data["tamano"],
                flor: data["flor"],
                fruto: data["fruto"],
                usos: data["usos"],
                colector_es: data["colector_es"],
                no_colecta: data["no_colecta"],
                fecha: data["fecha"],
                determino: data["determino"],
                otros_datos: data["otros_datos"],
            };
            console.log('Data a guardar:', tomasData);
            editarToma(tomasData,data["id"]);
        }
    };

    const toTitleCase = (str) => {
        switch (str) {
            case 'altitud':
                return 'Altitud (m.s.n.m)';
                break;

            case 'informacion_ambiental':
                return 'Información Ambiental';
                break;

            case 'tipo_vegetacion':
                return 'Tipo de vegetación';
                break;

            case 'forma_biologica':
                return 'Forma Biológica';
                break;
        
            case 'tamano':
                return 'Tamaño (m)';
                break;

            case 'colector_es':
                return 'Colector(es)';
                break;

            case 'no_colecta':
                return 'No. de colecta';
                break;

            default:
                return str
                    .toLowerCase()
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                break;
        }
    };

    const validateRequiredFields = () => {
        const requiredFields = [
            'estado', 'municipio', 'localidad', 'informacion_ambiental',
            'suelo', 'asociada', 'abundancia', 'forma_biologica', 'colector_es',
            'no_colecta', 'fecha', 'coordenadas'
        ];

        const coordenadasTemp = [
            ['grados_Latitud', 'minutos_Latitud', 'segundos_Latitud', 'hemisferio_Latitud', 
            'grados_Longitud', 'minutos_Longitud', 'segundos_Longitud', 'hemisferio_Longitud'],
            ['x', 'y']
        ]

        let isValid = true;
        let mensaje = '';
    
        requiredFields.forEach(field => {
            if (field === 'coordenadas'){
                coordenadasTemp[coordTabIndex].forEach(param => {
                    if (!data[param] || data[param] === '') {
                        isValid = false;
                        mensaje += `El campo ${toTitleCase(param)} es obligatorio. \n`;
                        //console.log(`El campo ${toTitleCase(param)} es obligatorio.`);
                    }
                })
            }else{
                if (!data[field] || data[field] === '') {
                    isValid = false;
                    mensaje += `El campo ${toTitleCase(field)} es obligatorio. \n`;
                    //console.log(`El campo ${toTitleCase(field)} es obligatorio.`);
                }
            }
        });
    
        if (isValid == false) {
            alert(mensaje);
        }

        return isValid;
    };
    
    const handleCoordenadas = () => {
        if (coordTabIndex === 0) {
            let temp = 'Latitud: ' + (data["grados_Latitud"] || '') + '° ' + (data["minutos_Latitud"] || '') + "' " + (data["segundos_Latitud"] || '') + '" ' + (data["hemisferio_Latitud"] || '') + ' - Longitud: ' + (data["grados_Longitud"] || '') + '° ' + (data["minutos_Longitud"] || '') + "' " + (data["segundos_Longitud"] || '') + '" ' + (data["hemisferio_Longitud"] || '');
            setTextCoordenadas(temp);
        } else {
            let temp = 'X:' + (data['x'] || '') + ' Y:' + (data['y'] || '');
            setTextCoordenadas(temp);
        }
    }

    const paramsNumeric = (param) => {
        let temp = false;
        if(param === 'tamano' || param === 'altitud' || param === 'no_colecta'){
            temp = true;
        }
        return temp;
    }

    const options = {
        estado: [
            { label: 'Aguascalientes', value: 'Aguascalientes' },
            { label: 'Baja California', value: 'Baja California' },
            { label: 'Baja California Sur', value: 'Baja California Sur' },
            { label: 'Campeche', value: 'Campeche' },
            { label: 'Chiapas', value: 'Chiapas' },
            { label: 'Chihuahua', value: 'Chihuahua' },
            { label: 'Ciudad de México', value: 'Ciudad de México' },
            { label: 'Coahuila', value: 'coahuila' },
            { label: 'Colima', value: 'Colima' },
            { label: 'Durango', value: 'Durango' },
            { label: 'Estado de México', value: 'Estado de México' },
            { label: 'Guanajuato', value: 'Guanajuato' },
            { label: 'Guerrero', value: 'Guerrero' },
            { label: 'Hidalgo', value: 'Hidalgo' },
            { label: 'Jalisco', value: 'Jalisco' },
            { label: 'Michoacán', value: 'Michoacan' },
            { label: 'Morelos', value: 'Morelos' },
            { label: 'Nayarit', value: 'Nayarit' },
            { label: 'Nuevo León', value: 'Nuevo León' },
            { label: 'Oaxaca', value: 'Oaxaca' },
            { label: 'Puebla', value: 'Puebla' },
            { label: 'Querétaro', value: 'Querétaro' },
            { label: 'Quintana Roo', value: 'Quintana Roo' },
            { label: 'San Luis Potosí', value: 'San Luis Potosí' },
            { label: 'Sinaloa', value: 'Sinaloa' },
            { label: 'Sonora', value: 'Sonora' },
            { label: 'Tabasco', value: 'Tabasco' },
            { label: 'Tamaulipas', value: 'Tamaulipas' },
            { label: 'Tlaxcala', value: 'Tlaxcala' },
            { label: 'Veracruz', value: 'Veracruz' },
            { label: 'Yucatán', value: 'Yucatán' },
            { label: 'Zacatecas', value: 'Zacatecas' },
            { label: 'Otro...', value: 'otro' },
        ],
        abundancia: [
            { label: 'Abundante', value: 'Abundante' },
            { label: 'Regular', value: 'Regular' },
            { label: 'Escasa', value: 'Escasa' },
            { label: 'Otro...', value: 'otro' },
        ],
        forma_biologica: [
            { label: 'Hierba', value: 'Hierba' },
            { label: 'Arbusto', value: 'Arbusto' },
            { label: 'Árbol', value: 'Árbol' },
            { label: 'Otro...', value: 'otro' },
        ],
        hemisferio_Latitud: [
            { label: 'Norte', value: 'Norte' },
            { label: 'Sur', value: 'Sur' },
        ],
        hemisferio_Longitud: [
            { label: 'Este', value: 'Este' },
            { label: 'Oeste', value: 'Oeste' },
        ]
    };

    const renderGeographicCoords = () => (
        <View style={{width:'100%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, gap:5}}>
                <Text style={{ fontWeight: 'bold', color: colorQuinario, fontSize: 15}}>Latitud:</Text>
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, padding:3}}
                    placeholder="Grados"
                    value={data?.grados_Latitud?.toString() || ''}
                    onChangeText={(text) => handleTextChange('grados_Latitud', text)}
                    keyboardType='numeric'
                />
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, padding:3 }}
                    placeholder="Minutos"
                    value={data?.minutos_Latitud?.toString() || ''}
                    onChangeText={(text) => handleTextChange('minutos_Latitud', text)}
                    keyboardType='numeric'
                />
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, padding:3 }}
                    placeholder="Segundos"
                    value={data?.segundos_Latitud?.toString() || ''}
                    onChangeText={(text) => handleTextChange('segundos_Latitud', text)}
                    keyboardType='numeric'
                />
                <Dropdown
                    data={options.hemisferio_Latitud}
                    labelField="label"
                    valueField="value"
                    placeholder={'Hemisferio'}
                    value={data?.hemisferio_Latitud}
                    onChange={(item) => handleTextChange('hemisferio_Latitud', item.value)}
                    style={{ flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, color: colorQuinario }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap:5 }}>
                <Text style={{ fontWeight: 'bold', color: colorQuinario, fontSize: 15 }}>Longitud:</Text>
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, padding:3 }}
                    placeholder="Grados"
                    value={data?.grados_Longitud?.toString() || ''}
                    onChangeText={(text) => handleTextChange('grados_Longitud', text)}
                    keyboardType='numeric'
                />
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, padding:3 }}
                    placeholder="Minutos"
                    value={data?.minutos_Longitud?.toString() || ''}
                    onChangeText={(text) => handleTextChange('minutos_Longitud', text)}
                    keyboardType='numeric'
                />
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, padding:3 }}
                    placeholder="Segundos"
                    value={data?.segundos_Longitud?.toString() || ''}
                    onChangeText={(text) => handleTextChange('segundos_Longitud', text)}
                    keyboardType='numeric'
                />
                <Dropdown
                    data={options.hemisferio_Longitud}
                    labelField="label"
                    valueField="value"
                    placeholder={'Hemisferio'}
                    value={data?.hemisferio_Longitud}
                    onChange={(item) => handleTextChange('hemisferio_Longitud', item.value)}
                    style={{ flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario, color: colorQuinario }}
                />
            </View>
            <CheckBox 
                containerStyle={{backgroundColor: colorSecundario}}
                title={textCoordenadas} 
                textStyle={{color: colorQuinario}}
                center={true}
                checkedColor={colorQuinario}
                checked={coordsChecked}
                onPress={() => handleCheckboxChange('coordenadas')}
            />
        </View>
    );

    const renderMetricCoords = () => (
        <>
            <Text style={{ fontWeight: 'bold', color: colorQuinario, fontSize: 20, marginTop: 10 }}>Coordenadas Métricas:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap:10 }}>
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario }}
                    placeholder="X"
                    value={data?.x?.toString() || ''}
                    onChangeText={(text) => handleTextChange('x', text)}
                    keyboardType='numeric'
                />
                <TextInput
                    style={{ color: colorQuinario, flex: 1, borderBottomWidth: 1, borderColor: colorCuaternario }}
                    placeholder="Y"
                    value={data?.y?.toString() || ''}
                    onChangeText={(text) => handleTextChange('y', text)}
                    keyboardType='numeric'
                />
            </View>
            <CheckBox 
                containerStyle={{backgroundColor: colorSecundario}}
                title={textCoordenadas} 
                textStyle={{color: colorQuinario}}
                center={true}
                checkedColor={colorQuinario}
                checked={coordsChecked}
                onPress={() => handleCheckboxChange('coordenadas')}
            />
        </>
    );

    const renderSection = (key) => {
        if (key === 'fecha') {
            return (
                <View key={key}>
                    <ListItem containerStyle={{ backgroundColor: colorSecundario, marginVertical: 5, marginHorizontal: 0, padding: 0 }}>
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: colorQuinario, fontSize: 20 }}>
                                {toTitleCase(key)}
                            </ListItem.Title>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    name='edit'
                                    size={18}
                                    color={colorQuinario}
                                    onPress={showDatepicker}
                                />
                                <Pressable onPress={showDatepicker} style={{flex:1}}>
                                    <TextInput
                                        style={{ color: colorQuinario, margin: 0, padding: 0, paddingBottom: 5, paddingLeft: 5, marginLeft: 5, fontSize: 18, borderBottomWidth: 1, flex: 1, borderColor: colorCuaternario }}
                                        value={data["fecha"]}
                                        editable={false}
                                    />
                                </Pressable>
                            </View>
                        </ListItem.Content>
                        <CheckBox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            containerStyle={{ backgroundColor: colorSecundario }}
                            checkedColor={colorQuinario}
                            size={30}
                            checked={filteredData[key]}
                            onPress={() => handleCheckboxChange(key)}
                        />
                    </ListItem>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
            );
        } else if (key === 'coordenadas') {
            return (
                <View key={key} style={{flex:1, height:'100%'}}>
                    <Tab
                        value={coordTabIndex}
                        onChange={setCoordTabIndex}
                        indicatorStyle={{ backgroundColor: colorQuinario }}
                        disableIndicator={true}
                        style={{ marginTop: 10 }}
                    >
                        <Tab.Item title="Geográficas" titleStyle={{ color: colorQuinario }} />
                        <Tab.Item title="Métricas" titleStyle={{ color: colorQuinario }} />
                    </Tab>
                    <TabView value={coordTabIndex} onChange={setCoordTabIndex} animationType="spring" containerStyle={{height:500}}>
                        <TabView.Item style={{ width: '100%' }}>
                            {renderGeographicCoords()}
                        </TabView.Item>
                        <TabView.Item style={{ width: '100%' }}>
                            {renderMetricCoords()}
                        </TabView.Item>
                    </TabView>
                </View>
            );
        } else {
            return (
                <View key={key}>
                    <ListItem containerStyle={{ backgroundColor: colorSecundario, marginVertical: 5, marginHorizontal: 0, padding: 0 }}>
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold', color: colorQuinario, fontSize: 20 }}>
                                {toTitleCase(key)}
                            </ListItem.Title>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon
                                    name='edit'
                                    size={18}
                                    color={colorQuinario}
                                />
                                {options[key] ? (
                                    <Dropdown
                                        data={options[key]}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'...'}
                                        value={data?.[key]}
                                        onChange={(item) => handleTextChange(key, item.value)}
                                        style={{ backgroundColor: 'transparent', color: colorPrimario, fontSize: 18, paddingLeft: 5, marginLeft: 5, borderBottomWidth: 1, flex: 1, borderColor: colorCuaternario }}
                                        itemContainerStyle={{ borderWidth: 0}}
                                        itemTextStyle={{ fontSize: 12, color: colorQuinario }}
                                        containerStyle={{ backgroundColor:colorPrimario, borderWidth:0, borderRadius:20, overflow:"hidden"}}
                                        activeColor={colorTerciario}
                                        autoScroll={false}
                                    />
                                ) : (
                                    <TextInput
                                        style={{ color: colorQuinario, margin: 0, padding: 0, paddingBottom: 5, paddingLeft: 5, marginLeft: 5, fontSize: 18, borderBottomWidth: 1, flex: 1, borderColor: colorCuaternario }}
                                        value={data?.[key]?.toString() || ''}
                                        onChangeText={(text) => handleTextChange(key, text)}
                                        keyboardType={paramsNumeric(key) ? 'numeric' : 'default'}
                                    />
                                )}
                            </View>
                        </ListItem.Content>
                        <CheckBox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            containerStyle={{ backgroundColor: colorSecundario }}
                            checkedColor={colorQuinario}
                            size={30}
                            checked={filteredData[key]}
                            onPress={() => handleCheckboxChange(key)}
                        />
                    </ListItem>
                </View>
            );
        }
    };

    const sections = useMemo(() => [
        ['nombre_cientifico', 'nombre_local', 'familia'],
        ['estado', 'municipio', 'localidad', 'altitud', 'coordenadas'],
        ['tipo_vegetacion', 'informacion_ambiental', 'suelo', 'asociada'],
        ['abundancia', 'forma_biologica', 'tamano', 'flor', 'fruto', 'usos'],
        ['colector_es', 'no_colecta', 'fecha', 'determino'],
        ['otros_datos']
    ], []);

    const titulos = useMemo(() => [
        'Datos generales', 'Ubicación', 'Ambiente', 'Información detallada', 'Datos del colector', 'Información extra'
    ],[]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colorPrimario }}>
            <View style={{ width: '100%', height: 50, flexDirection: "row", paddingHorizontal: 10, marginVertical: 10 }}>
                <View style={{ width: '10%', justifyContent: "center" }}>
                    <Icon
                        name='menu'
                        type='material'
                        color={colorQuinario}
                        size={30}
                        onPress={() => navigation.openDrawer()}
                    />
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: colorSecundario, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden' }}>
                <>
                    <Tab
                        value={index}
                        onChange={setIndex}
                        indicatorStyle={{ backgroundColor: colorQuinario }}
                        disableIndicator={true}
                        style={{marginTop: 20, marginHorizontal: 10}}
                        scrollable={true}
                    >
                        {titulos.map((title, idx) => (
                            <Tab.Item 
                                key={idx}
                                title={title} 
                                titleStyle={{fontSize: 15, fontWeight: index === idx ? 'bold' : 'normal', color: colorQuinario}}
                                containerStyle={{backgroundColor: index === idx ? colorTerciario : colorSecundario, borderRadius:20, marginHorizontal:5}}
                            />
                        ))}
                    </Tab>

                    {loading ? (
                        <ActivityIndicator size="large" color={colorQuinario} />
                    ) : (
                        <View style={{flex:1}}>
                            <TabView value={index} onChange={setIndex} animationType="spring">
                                {sections.map((section, idx) => (
                                    <TabView.Item key={idx} style={{ backgroundColor: colorSecundario, width: '100%', padding:20 }}>
                                        <ScrollView>
                                            <FlatList
                                                data={section}
                                                renderItem={({ item }) => renderSection(item)}
                                                keyExtractor={(item) => item}
                                                scrollEnabled={false}
                                            />
                                        </ScrollView>
                                    </TabView.Item>
                                ))}
                            </TabView>

                            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', marginBottom:20, gap:10}}>
                                <Button onPress={handleSubmitGuardar} radius={'md'} type="solid" color={colorCuaternario} containerStyle={{flex:1, paddingHorizontal: 5}}>
                                    <Icon name="save" color="white" />
                                </Button>
                                <Button onPress={handleSubmitImprimir} radius={"md"} type="solid" color={colorCuaternario} containerStyle={{flex:1, paddingHorizontal: 5} }>
                                    <Icon name="print" color="white" />
                                </Button>
                            </View>
                        </View>
                    )}
                </>
            </View>
        </SafeAreaView>
    );
};

export default InfColecta;
