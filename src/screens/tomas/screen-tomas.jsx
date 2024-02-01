import { Component } from "react";
import { Button, ScrollView, View } from "react-native";
import CardToma from "../../components/cardToma";
import style_screenTomas from "./style-tomas";
import styles from "../../styles/style-app";
import { SearchBar } from '@rneui/themed';
import { secundario } from "../../styles/style-colors";

class Tomas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listTomas: [{
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
            }]
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: secundario
            }}>
                <SearchBar
                    placeholder="Fecha: 29/01/2024"
                    searchIcon={null}
                    containerStyle={{backgroundColor: secundario, borderColor: secundario}}
                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20}}
                    inputStyle={{ backgroundColor: 'white' }}>
                </SearchBar>

                <View style={[styles.container, styles.fondoT]}>
                    <ScrollView>
                        {this.state.listTomas.map((item, index) => {
                            return (
                                <CardToma
                                    key={index}
                                    navigation={this.props.navigation}
                                    infoToma={item}>
                                </CardToma>
                            );
                        })}
                        <View style={style_screenTomas.view_buttons}>
                            <Button
                                title="nuevo"
                                style={style_screenTomas.button}
                                onPress={() => {
                                    this.props.navigation.navigate('Formulario');
                                }}></Button>
                        </View>
                    </ScrollView>
                </View>

            </View>
        );
    }
}

export default Tomas;