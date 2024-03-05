import { SearchBar } from "@rneui/themed";
import { secundario } from "../../styles/style-colors";
import React, { useState, useEffect } from "react";
import { verGruposFiltrado, verTomas, consultarIdGrupo, verTomasFiltrado } from "../../services/database/SQLite";

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
    const [search, setSearch] = useState("");
    const [buscando, setBuscando] = useState(false);

    useEffect(() => {
        let timerId;
        if (search.trim() !== "") {
            setBuscando(true);
            timerId = setTimeout(() => {
                peticion(search);
            }, 500);
        } else {
            console.log("vacio")
            peticion("");
        }

        return () => clearTimeout(timerId);
    }, [search]);

    const updateSearch = (searchInput) => {
        setSearch(searchInput);
    };

    const peticion = (buscar) => {
        if (pantalla === "canales") {
            console.log("Buscando: " + buscar);
            verGruposFiltrado(buscar)
            .then(result => {
                console.log('Grupos obtenidos: ', result);
                setBuscando(false);
                onResult(result); // Pasamos los resultados a la función de devolución de llamada
            })
            .catch(error => {
                setBuscando(false);
                console.error('Ocurrió un error al obtener los grupos:', error);
            });
        } else {
            console.log("Buscando: " + buscar);
            consultarIdGrupo(pantalla).then((id) => {
                console.log("id del grupo: " + id);
                verTomasFiltrado(id,buscar).then(tomas => {
                    console.log('Tomas obtenidos: ', tomas);
                    setBuscando(false);
                    onResult(tomas); // Pasamos los resultados a la función de devolución de llamada
                }).catch(error => {
                    console.error(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    };

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
}

export default BarraBusqueda;
