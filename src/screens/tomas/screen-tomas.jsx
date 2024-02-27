import { useState } from "react";
import { ScrollView, View } from 'react-native';
import { SpeedDial} from "@rneui/themed";
import styles from "../../styles/style-app";
import { principal, secundario } from '../../styles/style-colors';
import Toma from "../../components/Toma";
import imprimir from "../../components/imprimir/imprimir";
import BarraBusqueda from "../../components/BarraBusqueda";
import { Text } from "react-native-elements";

//Cambiar el componente boton flotante al speed dial

//la varible nombreCanal obtiene el nombre de la pantalla canales 
const Tomas = ({ navigation, route}) => {

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
                    onPress={() => navigation.navigate('Formulario', { agregar })} />

                <SpeedDial.Action
                    icon={{ name: 'print', color: '#fff' }}
                    color={principal}
                    title={'imprimir'}
                    onPress={() => {
                        setOpen(!open);
                        imprimir(listPrint);
                    }} />

                <SpeedDial.Action
                    icon={{ name: 'list', color: '#fff' }}
                    color={principal}
                    title={'listar'}
                    onPress={() => {
                        setOpen(!open);
                        console.log(listPrint);
                    }} />

            </SpeedDial>

        </View>
    );
}


export default Tomas;