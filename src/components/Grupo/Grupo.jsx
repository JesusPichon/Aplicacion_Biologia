import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useState } from "react";
import { principal } from "../../styles/style-colors";
import Casilla from "../Casilla";


const Grupo = ({ navigation, nombre, deseleccionar, seleccionar, mostrarSeleccionar }) => {

    const [checked, setChecked] = useState(false);

    function toggleCheckbox(data) { // las casillas que esten marcadas se marcaran como grupos seleccionados 
        setChecked(!checked);

        if(!checked){
            seleccionar(data);
        }else{
            deseleccionar(data);
        }
    }

    return (
        <TouchableOpacity
            style={[stylesCanales.cardVertical, styles.fondoT, { width: '45%', marginBottom: 20, margin: 10 }]}
            onPress={() => { navigation.navigate('Tomas', { nombre }) }} >

            <View style={[stylesCanales.cardVImagen]}>

                {
                    mostrarSeleccionar && <Casilla
                        checked={checked}
                        toggleCheckbox={() => toggleCheckbox(nombre)}
                        color={'red'} />
                }

                <ImageBackground
                    source={require('../../assets/images/nature.jpg')}
                    resizeMode="cover"
                    style={styles.image}>
                </ImageBackground>

            </View>

            <View style={[styles.botongrupo, {backgroundColor: principal}]}>
                <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>
                    {nombre}
                </Text>
            </View>

        </TouchableOpacity>
    );
}


export default Grupo;