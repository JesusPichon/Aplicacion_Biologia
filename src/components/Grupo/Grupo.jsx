import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useState } from "react";
import { principal } from "../../styles/style-colors";
import { CheckBox } from "@rneui/themed";



const Grupo = ({ navigation, nombre, deseleccionar, seleccionar, mostrarSeleccionar }) => {

    const [checked, setChecked] = useState(false);


    return (
        <TouchableOpacity
            style={[stylesCanales.cardVertical, styles.fondoT, { width: '45%', marginBottom: 20, margin: 10 }]}
            onPress={() => {
                if (mostrarSeleccionar == false)
                    navigation.navigate('Tomas', { nombre })
                else
                    setChecked(!checked); // cambiar el valor del checkbox si se preciona el grupo 
            }} >

            <View style={[stylesCanales.cardVImagen]}>

                {
                    mostrarSeleccionar && <CheckBox
                        title={'eliminar'}
                        checkedColor="red"
                        checked={checked}
                        onPress={() => {setChecked(!checked)}} />
                }

                <ImageBackground
                    source={require('../../assets/images/nature.jpg')}
                    resizeMode="cover"
                    style={styles.image}>
                </ImageBackground>

            </View>

            <View style={[styles.botongrupo, { backgroundColor: checked ? "red": principal}]}>
                <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>
                    {nombre}
                </Text>
            </View>

        </TouchableOpacity>
    );
}


export default Grupo;