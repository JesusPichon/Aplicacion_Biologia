import React from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { SearchBar, FAB } from '@rneui/themed';
import styles from "./style-canales";
import { secundario } from "../../styles/style-colors";


const Canales = ({ navigation }) => {
    return (
        <View style={{
            backgroundColor: secundario,
            flex: 1
            }}>

            <SearchBar  //Barra de busqueda 
            placeholder="Busqueda del Grupo"
            searchIcon={null}
            containerStyle={{ backgroundColor: secundario, borderColor: secundario }}
            inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
            inputStyle={{ backgroundColor: 'white' }}>
            </SearchBar>

      
            <View style={[styles.container, styles.fondoT, { alignItems: 'center' }]}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32 }}>

                    <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            <ImageBackground source={{ uri: 'https://seeklogo.com/images/B/benemerita-universidad-autonoma-de-puebla-logo-08A9E090F7-seeklogo.com.png' }}
                             resizeMode="cover" style={styles.image}> 
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={[styles.botongrupo, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>Canal 1</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            <ImageBackground source={{ uri: 'https://seeklogo.com/images/B/benemerita-universidad-autonoma-de-puebla-logo-08A9E090F7-seeklogo.com.png' }} 
                            resizeMode="cover" style={styles.image}>
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={[styles.botongrupo, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>Canal 2</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <FAB  //boton de crear un nuevo canal
                style={[styles.nuevo]}
                size="small"
                color="#01395E"
                overlayColor="#454545"
                title="Crear"
                icon={{ name: "edit", color: "#fff" }}
                />

            </View>
        </View>
    )
};


export default Canales;