import { useState, useEffect } from "react";
import { ScrollView, View } from 'react-native';
import { SpeedDial, Text } from "@rneui/themed";
import styles from "../../styles/style-app";
import { principal, secundario } from '../../styles/style-colors';
import Toma from "../../components/Toma";
import imprimir from "../../components/imprimir/imprimir";
import BarraBusqueda from "../../components/BarraBusqueda";
import { consultarIdGrupo, verTomas } from "../../services/database/SQLite";


const Tomas = ({ navigation, route }) => {

    //variable que obtine el nombre del canal 
    const nombreCanal = route.params.nombre;

    const [listaTomas, setListaTomas] = useState([]);
    const [listPrint, setListPrint] = useState([]);
    const [open, setOpen] = useState(false);

    const seleccionar = (toma) => {
        setListPrint([...listPrint, toma]);
    }

    const deseleccionar = (toma) => {
        setListPrint(listPrint.filter((item) => item !== toma));
    }

    const agregar = (item) => {
        setListaTomas([...listaTomas, item]);
    }


    //obtener tomas de la base de datos 
    const getTomas = () => {
        consultarIdGrupo(nombreCanal)
            .then((id) => {
                verTomas(id)
                    .then((tomas) => {
                        console.log(tomas)
                        setListaTomas(tomas); // Actualiza el estado con las tomas obtenidas
                    })
                    .catch((error) => {
                        console.error("Error obteniendo las tomas: ", error);
                    });
            })
            .catch((error) => console.error("ID error: ", error));
    };

    const updateTomas = (nuevosTomas) => {
        setListaTomas(nuevosTomas);
    };

    useEffect(() => {
        getTomas();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: secundario }}>

            <BarraBusqueda titulo={'Buscar en las tomas'} pantalla={nombreCanal} onResult={updateTomas} />


            <View style={[styles.container, styles.fondoT]}>

                <ScrollView>
                    {
                        listaTomas.map((item, index) => {
                            return (
                                <Toma
                                    key={index}
                                    data={item}
                                    navigation={navigation}
                                    seleccionar={seleccionar}
                                    deseleccionar={deseleccionar} />
                            );
                        })
                    }
                </ScrollView>
            </View>

            <SpeedDial
                isOpen={open}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={principal}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}>


                <SpeedDial.Action
                    icon={{ name: 'add', color: '#fff' }}
                    color={principal}
                    title={'agregar'}
                    onPress={() => {
                        setOpen(!open);
                        navigation.navigate('Formulario', { navigation, nombreCanal })
                    }} />

                <SpeedDial.Action
                    icon={{ name: 'print', color: '#fff' }}
                    color={principal}
                    title={'imprimir'}
                    onPress={() => {
                        setOpen(!open);
                        imprimir(listPrint);
                    }} />

            </SpeedDial>

        </View>
    );
}


export default Tomas;