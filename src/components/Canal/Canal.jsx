import { View, Text, TouchableOpacity, Animated, ImageBackground } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/canales/style-canales";


const Canal = ({ animacion, navigation, informacion }) => {


    return (
        <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32, transform: [{ scale: animacion }] }}>
            <View style={[stylesCanales.cardVertical, styles.fondoT, { width: '48%' }]}>
                <View style={[stylesCanales.cardVImagen]}>
                    <ImageBackground source={require('../../assets/images/Campo_flores.jpg')}
                        resizeMode="cover"
                        style={styles.image}>
                    </ImageBackground>
                </View>
                <TouchableOpacity style={[stylesCanales.botongrupo, styles.fondoP]}
                    onPress={() => { navigation.navigate('Tomas') }}>
                    <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>
                        {informacion.nombre}
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}


export default Canal;