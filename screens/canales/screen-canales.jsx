import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./style-canales";
import { secundario } from "../../styles/style-colors";


const Canales = ({ navigation }) => {
    return (
        <View style={{
            backgroundColor: secundario,
            flex: 1
        }}>
            <View style={[styles.container, styles.fondoT, { alignItems: 'center' }]}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32 }}>

                    <View
                        style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            {/* Imagen del cuadro */}
                            <ImageBackground source={{ uri: 'https://seeklogo.com/images/B/benemerita-universidad-autonoma-de-puebla-logo-08A9E090F7-seeklogo.com.png' }} resizeMode="cover" style={styles.image}>
                                {/* Contenido adicional dentro de ImageBackground si es necesario */}
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={[styles.botong, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>Canal 1</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Repite la estructura para el segundo cuadro */}
                    <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            <ImageBackground source={{ uri: 'https://seeklogo.com/images/B/benemerita-universidad-autonoma-de-puebla-logo-08A9E090F7-seeklogo.com.png' }} resizeMode="cover" style={styles.image}>
                                {/* Contenido adicional dentro de ImageBackground si es necesario */}
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={[styles.botong, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>Canal 2</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32 }}>
                    <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            {/* Imagen del cuadro */}
                            <ImageBackground source={{ uri: 'https://seeklogo.com/images/B/benemerita-universidad-autonoma-de-puebla-logo-08A9E090F7-seeklogo.com.png' }} resizeMode="cover" style={[styles.image, { flexDirection: 'row-reverse' }]}
                            />
                        </View>
                        <TouchableOpacity style={[styles.botong, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>Canal 3</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Repite la estructura para el segundo cuadro */}
                    <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            <ImageBackground source={{ uri: 'https://seeklogo.com/images/B/benemerita-universidad-autonoma-de-puebla-logo-08A9E090F7-seeklogo.com.png' }} resizeMode="cover" style={styles.image}>
                                {/* Contenido adicional dentro de ImageBackground si es necesario */}
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={[styles.botong, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>Canal 4</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}



export default Canales;