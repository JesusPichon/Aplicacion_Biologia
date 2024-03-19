import { SearchBar } from "@rneui/themed";
import { cuarto, principal, secundario, tercero } from "../../styles/style-colors";
import React, { useState, useEffect } from "react";
import { verGruposFiltrado, verTomas, consultarIdGrupo, verTomasFiltrado } from "../../services/database/SQLite";
import { View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

// como implementar en canales

// funcion para actualizar los grupos a mostrar
//const updateGrupos = (nuevosGrupos) => {
//    setGrupos(nuevosGrupos); // Actualizamos los grupos con los resultados de la búsqueda
//};

// nueva forma de implementar la barra de busqueda
// <BarraBusqueda titulo={'Buscar grupo'} pantalla={'canales'} onResult={updateGrupos} />

// como implementar en tomas

// funcion para actualizar las tomas a mostrar
//const updateTomas = (nuevosTomas) => {
//    setListaTomas(nuevosTomas);
//};

// nueva forma de implementar la barra de busqueda
//<BarraBusqueda titulo={'Buscar en las tomas'} pantalla={nombreCanal} onResult={updateTomas} />




const BarraBusqueda = ({ titulo, pantalla, onResult }) => {
    const [value, setValue] = useState('nombre_cientifico');
    const [isFocus, setIsFocus] = useState(false);
    const data_filtro = [
        { label: 'Nombre científico', value: 'nombre_cientifico' },
        { label: 'Familia', value: 'familia' },
        { label: 'Nombre local', value: 'nombre_local' },
        { label: 'Estado', value: 'estado' },
        { label: 'Municipio', value: 'municipio' },
        { label: 'Localidad', value: 'localidad' },
        { label: 'Tipo de vegetación', value: 'tipo_vegetacion' },
        { label: 'Información ambiental', value: 'informacion_ambiental' },
        { label: 'Suelo', value: 'suelo' },
        { label: 'Asociada', value: 'asociada' },
        { label: 'Abundancia', value: 'abundancia' },
        { label: 'Forma biologica', value: 'forma_biologica' },
        { label: 'Tamaño', value: 'tamano' },
        { label: 'Flor', value: 'flor' },
        { label: 'Fruto', value: 'fruto' },
        { label: 'Usos', value: 'usos' },
        { label: 'Colector_es', value: 'colector_es' },
        { label: 'Fecha', value: 'fecha' },
        { label: 'Determino', value: 'determino' },
        { label: 'Otros datos', value: 'otros_datos' },
    ];
    const [search, setSearch] = useState("");
    const [buscando, setBuscando] = useState(false);

    useEffect(() => {
        let timerId;
        if (search.trim() !== "") {
            setBuscando(true);
            timerId = setTimeout(() => {
                peticion(search);
            }, 200);
        } else {
            peticion(search);
        }

        return () => clearTimeout(timerId);
    }, [search]);

    useEffect(() => {
        if (pantalla !== 'canales' && value) {
            peticion(search);
        }
    }, [value]);

    const updateSearch = (searchInput) => {
        setSearch(searchInput);
    };

    const peticion = (buscar) => {
        if (pantalla === "grupos") {
            //console.log("Buscando: " + buscar);
            verGruposFiltrado(buscar)
                .then(result => {
                    setBuscando(false);
                    onResult(result); // Pasamos los resultados a la función de devolución de llamada
                })
                .catch(error => {
                    setBuscando(false);
                    console.error('Ocurrió un error al obtener los grupos:', error);
                });
        } else {
            //console.log("Buscando: " + buscar);
            onResult([buscar, value]);
            setBuscando(false);
            /*
            consultarIdGrupo(pantalla).then((id) => {
                console.log("id del grupo: " + id);
                verTomasFiltrado(id, value, buscar).then(tomas => {
                    setBuscando(false);
                    onResult(tomas); // Pasamos los resultados a la función de devolución de llamada
                }).catch(error => {
                    console.error(error);
                });
            }).catch((error) => {
                console.log(error);
            });*/
        }
    };

    if (pantalla === 'grupos') {
        return (
            <SearchBar
                placeholder={titulo}
                containerStyle={{ backgroundColor: secundario, borderColor: secundario }}
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                inputStyle={{ backgroundColor: 'white' }}
                onChangeText={updateSearch}
                value={search}
                showLoading={buscando}
            />
        );
    } else {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '75%', backgroundColor: '#000', padding: 0 }}>
                    <SearchBar
                        placeholder={titulo}
                        containerStyle={{ backgroundColor: secundario, borderColor: secundario, paddingRight: 0 }}
                        inputContainerStyle={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                        inputStyle={{ backgroundColor: 'white' }}
                        onChangeText={updateSearch}
                        value={search}
                        showLoading={buscando}
                    />
                </View>
                <Dropdown
                    style={{ backgroundColor: principal, width: '25%', marginVertical: 8, marginLeft: -8, borderTopRightRadius: 20, borderBottomRightRadius: 20 }}
                    iconStyle={{ tintColor: 'white', width: 20, height: 20, marginRight: 5 }}
                    selectedTextStyle={{ marginLeft: 5, color: tercero, fontSize: 12 }}
                    itemTextStyle={{ fontSize: 12, color: tercero }}
                    itemContainerStyle={{ borderWidth: 0.2, borderColor: cuarto }}
                    containerStyle={{ backgroundColor: principal, borderWidth: 1, borderColor: tercero }} // Establece estilos para el contenedor                        label='Selecciona un valor'
                    activeColor={secundario}
                    maxHeight={200}
                    labelField="label"
                    valueField="value"
                    data={data_filtro}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                    }}

                />
            </View>
        );
    }
}

export default BarraBusqueda;
