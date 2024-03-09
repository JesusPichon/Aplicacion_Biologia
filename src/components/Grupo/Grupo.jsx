import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useState } from "react";
import { principal } from "../../styles/style-colors";
import { CheckBox } from "@rneui/themed";


const Grupo = ({ navigation, informacion, nombre, deseleccionar, seleccionar }) => {


    const [isSelected, setSelected] = useState(false);
    const [eliminar, setEliminar] = useState(false);

    function handleSeleccionar() {
        (isSelected) ? deseleccionar(informacion) : seleccionar(informacion);
        setSelected(!isSelected);
    }

    return (
        <TouchableOpacity
            style={[stylesCanales.cardVertical, styles.fondoT, { width: '45%', marginBottom: 20, margin: 10 }]}
            onPress={() => { navigation.navigate('Tomas', { nombre }) }}
            onLongPress={() => handleSeleccionar()}>

            <View style={[stylesCanales.cardVImagen]}>

                <ImageBackground
                    source={require('../../assets/images/nature.jpg')}
                    resizeMode="cover"
                    style={styles.image}>
                </ImageBackground>

            </View>

            <View style={[styles.botongrupo, { backgroundColor: isSelected ? 'red' : principal }]}>
                <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>
                    {informacion}
                </Text>

                {() => {
                    if (eliminar)
                        return (
                            <CheckBox>
                                
                            </CheckBox>
                        );
                }}

            </View>

        </TouchableOpacity>
    );
}


export default Grupo;