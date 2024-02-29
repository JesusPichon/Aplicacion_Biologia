import { useState, useEffect } from "react";
import { ScrollView, View } from 'react-native';
import { SpeedDial } from "@rneui/themed";
import styles from "../../styles/style-app";
import { principal, secundario } from '../../styles/style-colors';
import Toma from "../../components/Toma";
import imprimir from "../../components/imprimir/imprimir";
import BarraBusqueda from "../../components/BarraBusqueda";
import { verTomas, consultarIdGrupo} from "../../services/database/SQLite";


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

    const mostrarTomas = () => {
        consultarIdGrupo(nombreCanal).then((id) => {
            console.log(id);

            verTomas(id).then(tomas => {
                //Agregar aqui la funcionalidad para utilizar el resultado obtenido
                console.log(tomas);
            }).catch(error => {
                // Maneja el error aquí
                console.error(error);
            });

        }).catch((error) => {
            console.log(error);
        });

        
    };

    useEffect(() => { 
        mostrarTomas();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: secundario }}>

            <BarraBusqueda titulo={'Fecha'} />

            <View style={[styles.container, styles.fondoT]}>

                {/* Para acceder a la variable nombre del canal => route.params.nombre */}

                {/* Ejemplo => <Text>{route.params.nombre}</Text>*/}

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
                        navigation.navigate('Formulario', { agregar, nombreCanal })
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