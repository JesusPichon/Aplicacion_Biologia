import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, SearchBar } from '@rneui/themed';
import styles from "../../styles/style-app";
import { principal, secundario } from "../../styles/style-colors";
import Toma from "../../components/Toma";

const Tomas = (props) => {

    const toma = {
        nombreCientifico: "",
        Familia: "Nyctaginaceae",
        nombreLocal: "Bugambilia",
        direccion: {
            localidad: "CU BUAP",
            municipio: "Puebla",
            estado: "Puebla"
        },
        coordenadas: "-98.20, 19.002'N",
        tipoVegetacion: "Bosque urbano"
    }

    const [listaTomas, setListaTomas] = useState([toma]);

    return (
        <View style={{ flex: 1, backgroundColor: secundario }}>

            <SearchBar
                placeholder="Fecha: 29/01/2024"
                searchIcon={null}
                containerStyle={{ backgroundColor: secundario, borderColor: secundario }}
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                inputStyle={{ backgroundColor: 'white' }}>
            </SearchBar>

            <View style={[styles.container, styles.fondoT]}>
                <ScrollView>
                    {listaTomas.map((toma, index) => {
                        return (
                            <Toma key={index} item={toma} />
                        );
                    })}
                </ScrollView>
                <View style={{flexDirection: "row", justifyContent: "flex-end", padding: 10}}>
                    <Button radius={'sm'} type="solid"  onPress={() => {props.navigation.navigate('Formulario')}}>Nuevo</Button>
                </View>
            </View>
        </View>
    );
}


export default Tomas;