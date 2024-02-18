import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ImageBackground, Animated } from "react-native";
import { SearchBar, SpeedDial } from '@rneui/themed';
import { principal, secundario, tercero } from "../../styles/style-colors";
import styles from "./style-canales";
import animaciones from '../../components/animaciones/animaciones';


const Canales = ({ navigation }) => {
    // animaciones
    const {
        unoAnim,
        translateAnimDOWN,
        translateAnimUP,
        startAnimations,
    } = animaciones();


    useEffect(() => {
        startAnimations();
    }, []);

    const [open, setOpen] = useState(false);
    
    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>

            <Animated.View style={{ opacity: unoAnim}}>
                <SearchBar
                    placeholder="Buscar el grupo"
                    searchIcon={null}
                    containerStyle={{ backgroundColor: secundario, borderColor: secundario }}
                    inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                    inputStyle={{ backgroundColor: 'white'}}
                />
            </Animated.View>

             {/* Nueva sección con los botones en fila */}
             <View style={styles.buttonContainer}>

             <TouchableOpacity style={[styles.fusionar, styles.fondoT]}>
                    <Text style={[styles.textP, {textAlign: 'center', fontWeight: 'bold'}]}>FUSIONAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.exportar, styles.fondoT]}>
                    <Text style={[styles.textP, {textAlign: 'center', fontWeight: 'bold'}]}>EXPORTAR/IMPORTAR</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.container, styles.fondoT, { alignItems: 'center' }]}>
                <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 32, transform: [{ scale: unoAnim}] }}>
                    <View style={[styles.cardVertical, styles.fondoT, { width: '48%' }]}>
                        <View style={[styles.cardVImagen]}>
                            <ImageBackground source={{ uri: 'https://seeklogo.com/images/B/benemerita-universidad-autonoma-de-puebla-logo-08A9E090F7-seeklogo.com.png' }}
                            resizeMode="cover" style={styles.image}> 
                            </ImageBackground>
                        </View>
                        <TouchableOpacity style={[styles.botongrupo, styles.fondoP]}
                            onPress={() => { navigation.navigate('Tomas') }}>
                            <Text style={[styles.textT, { textAlign: 'center', fontWeight: 'bold' }]}>MIS TOMAS</Text>
                        </TouchableOpacity>
                        </View>
                </Animated.View>
            </View>

            <SpeedDial
                isOpen={open}
                icon={{ name: 'add', color: 'white' }}
                openIcon={{ name: 'close', color: 'white' }}
                color={principal}
                onOpen={() => setOpen(!open)}
                onClose={() => setOpen(!open)}>

                    <SpeedDial.Action
                        icon={{ name: 'add', color: '#fff' }}
                        color={principal}
                        title="Crear"
                        onPress={() => console.log('Add Something')}
                        />

                    <SpeedDial.Action
                        icon={{ name: 'delete', color: '#fff' }}
                        color={principal}
                        title="Eliminar"
                        onPress={() => console.log('Delete Something')}
                        />
            </SpeedDial>

            
        </View>
    );
};

export default Canales;
