import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useState } from "react";
import { principal, secundario } from "../../styles/style-colors";


const Grupo = ({ navigation, informacion, nombre, deseleccionar, seleccionar }) => {


    const [isSelected, setSelected] = useState(false);

    return (
        //<Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32, transform: [{ scale: animacion }] }}>
        <TouchableOpacity
            style={[stylesCanales.cardVertical, styles.fondoT, { width: '45%', marginBottom: 20, margin: 10 }]}
            onPress={() => { navigation.navigate('Tomas', { nombre }) }}
            onLongPress={() => {
                if (isSelected) {
                    deseleccionar(informacion);
                } else {
                    seleccionar(informacion);
                }
                setSelected(!isSelected);
            }}>

            <View style={[stylesCanales.cardVImagen]}>
                <ImageBackground
                    source={require('../../assets/images/nature.jpg')}
                    resizeMode="cover"
                    style={styles.image}>
                </ImageBackground>
            </View>
            <View style={[styles.botongrupo, {backgroundColor: isSelected ? 'red' : principal}]}>
                <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>
                    {informacion}
                </Text>
            </View>
        </TouchableOpacity>
        //</Animated.View>
    );
}


export default Grupo;