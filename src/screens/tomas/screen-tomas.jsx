import { SearchBar, SpeedDial } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, View } from 'react-native';
import styles from "../../styles/style-app";
import { secundario } from '../../styles/style-colors';
import Toma from "../../components/Toma";


const toma = {
    nombreCientifico: "",
    Familia: "America",
    nombreLocal: "Bugambilia",
    direccion: {
        localidad: "CU BUAP",
        municipio: "Puebla",
        estado: "Puebla"
    },
    coordenadas: "-98.20, 19.002'N",
    tipoVegetacion: "Bosque urbano"
}


const Tomas = ({ navigation }) => {


    const [listaTomas, setListaTomas] = useState([toma]);
    const [listPrint, setListPrint] = useState([]);
    const [open, setOpen] = useState(false);


    const seleccionar = (item) => {
        setListPrint([...listPrint, item]);
    }

    const agregar = (item) => {
        setListaTomas([...listaTomas, item]);
    }


    return (
        <View style={{ flex: 1, backgroundColor: secundario }}>

            <SearchBar
                placeholder="Date"
                containerStyle={{ backgroundColor: secundario, borderColor: secundario }}
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                inputStyle={{ backgroundColor: 'white' }} />

            <View style={[styles.container, styles.fondoT]}>
                <ScrollView>
                    {
                        listaTomas.map((item, index) => {
                            return (
                                <Toma key={index} item={item} navigation={navigation} seleccionar={seleccionar} />
                            );
                        })
                    }
                </ScrollView>
            </View>


            <SpeedDial
                isOpen={open}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color='#00B5DF'
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}>

                <SpeedDial.Action
                    title='add'
                    color='#00B5DF'
                    icon={{ name: 'add', color: 'white' }}
                    onPress={() => { navigation.navigate('Formulario') }}
                />

                <SpeedDial.Action
                    title='print'
                    color='#00B5DF'
                    icon={{ name: 'print', color: 'white' }}
                    onPress={() => {
                        setOpen(!open);
                    }}
                />

                <SpeedDial.Action
                    title='listar'
                    color='#00B5DF'
                    icon={{ name: 'edit', color: 'white' }}
                    onPress={() => {
                        console.log(listPrint)
                    }}
                />

            </SpeedDial>
        </View>
    );
}


export default Tomas;