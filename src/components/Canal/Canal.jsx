import { View, Text, TouchableOpacity, Animated, ImageBackground } from "react-native";
import styles from "../../styles/style-app";

const Canal = ({ animacion, navigation }) => {


    return (
        <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32, transform: [{ scale: animacion }] }}>
            <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                <View style={[styles.cardVImagen]}>
                    <ImageBackground source={require('../../assets/images/Campo_flores.jpg')}
                        resizeMode="cover"
                        style={styles.image}>
                    </ImageBackground>
                </View>
                <TouchableOpacity style={[styles.botongrupo, styles.fondoP]}
                    onPress={() => { navigation.navigate('Tomas') }}>
                    <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>MIS TOMAS</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}


export default Canal;