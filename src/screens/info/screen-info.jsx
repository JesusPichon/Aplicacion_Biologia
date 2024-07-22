import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Icon, ListItem, CheckBox, Tab, TabView, Button } from '@rneui/themed';
import { Text, View, TextInput, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import TomaController from "../../services/controllers/tomaController";
import { Dropdown } from "react-native-element-dropdown";

const InfColecta = ({ navigation, route }) => {
    const { currentTheme, themes } = useSelector((state) => state.theme);
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState({});
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);

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

    const cargarGrupos = async () => {
        try {
            const grupos = await controller.obtenerToma(route.params.id);
            if (grupos.length > 0) {
                const initialData = grupos[0];
                setData(initialData);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = useCallback((key) => {
        setFilteredData((prevFilteredData) => ({
            ...prevFilteredData,
            [key]: !prevFilteredData[key],
        }));
    }, []);

    const handleTextChange = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }

    const handleSubmit = () => {
        const result = Object.keys(filteredData)
        .filter((key) => filteredData[key])
        .reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});
        console.log('Filtered Data:', result);
    };

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
        ]
    };

    const renderSection = (key) => (
        
        <View key={key}>
            <ListItem containerStyle={{ backgroundColor: colorSecundario, marginVertical: 5, marginHorizontal: 0, padding: 0 }}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold', color: colorQuinario, fontSize: 20 }}>
                        {key.replace('_', ' ')}:
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
                                        <FlatList
                                            data={section}
                                            renderItem={({ item }) => renderSection(item)}
                                            keyExtractor={(item) => item}
                                            scrollEnabled={false}
                                        />
                                    </TabView.Item>
                                ))}
                            </TabView>

                            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-around', marginBottom:20, gap:10}}>
                                <Button radius={'md'} type="solid" color={colorCuaternario} containerStyle={{flex:1, paddingHorizontal: 5}}>
                                    <Icon name="save" color="white" />
                                </Button>
                                <Button onPress={handleSubmit} radius={"md"} type="solid" color={colorCuaternario} containerStyle={{flex:1, paddingHorizontal: 5} }>
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
