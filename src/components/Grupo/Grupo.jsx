import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useEffect, useState } from "react";
import { principal } from "../../styles/style-colors";
import { CheckBox } from "@rneui/themed";



const Grupo = ({ navigation, nombre, deseleccionar, seleccionar, mostrarSeleccionar, exportando, seleccionarGrupoExportar }) => {

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(false);
    },[mostrarSeleccionar]);

    const handleSeleccionarGrupo = () => {
        if (mostrarSeleccionar == true && !exportando) {
            if (checked) {
                deseleccionar(nombre);
            } else {
                seleccionar(nombre);
            }
            setChecked(!checked);
        } else if (exportando) {
            seleccionarGrupoExportar(nombre);
            setChecked(false); // Ocultar las casillas de selección
        }

        if (!mostrarSeleccionar)
            navigation.navigate('Tomas', { nombre });
    };

    return (
        <TouchableOpacity
            style={[stylesCanales.cardVertical, styles.fondoT, { width: '45%', marginBottom: 20, margin: 10 }]}
            onPress={handleSeleccionarGrupo}>

            <View style={[stylesCanales.cardVImagen]}>

                {
                    mostrarSeleccionar && <CheckBox
                        title={exportando ? 'Exportar' : 'Eliminar'}
                        checkedColor="red"
                        checked={checked} />
                }

                <ImageBackground
                    source={require('../../assets/images/nature.jpg')}
                    resizeMode="cover"
                    style={styles.image}>
                </ImageBackground>

            </View>

            <View style={[styles.botongrupo, { backgroundColor: checked ? "red" : principal }]}>
                <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>
                    {nombre}
                </Text>
            </View>

        </TouchableOpacity>
    );
}


export default Grupo;