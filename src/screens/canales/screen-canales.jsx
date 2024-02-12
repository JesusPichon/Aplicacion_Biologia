import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, ImageBackground } from "react-native";
import { SearchBar, SpeedDial } from '@rneui/themed';
import { principal, secundario, tercero } from "../../styles/style-colors";
import styles from "./style-canales";

const Canales = ({ navigation }) => {
    const [open, setOpen] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [password, setPassword] = useState("");
    const correctPassword = "Soyeladmin"; // Reemplaza con tu contraseña

    const handleSpeedDialPress = () => {
        // Puedes cambiar la lógica aquí para requerir la contraseña
        if (password === correctPassword) {
            setOpen(!open);
            handleClosePasswordModal(); // Agrega esta línea para cerrar el cuadro de diálogo
        } else {
            setPassword("");
            setPasswordModalVisible(true);
        }
    };

    const handleClosePasswordModal = () => {
        setPassword("");
        setPasswordModalVisible(false);
    };

    return (
        <View style={{ backgroundColor: secundario, flex: 1 }}>

            <SearchBar
                placeholder="Busqueda del Grupo"
                searchIcon={null}
                containerStyle={{ backgroundColor: secundario, borderColor: secundario }}
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                inputStyle={{ backgroundColor: 'white' }}
            />

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
                </View>
            </View>

            <SpeedDial //boton especial para dos botones mas.
                isOpen={open}
                icon={{ name: 'edit', color: '#fff' }}
                openIcon={{ name: 'close', color: '#fff' }}
                color= '#01395E'
                onOpen={() => handleSpeedDialPress()}
                onClose={() => handleSpeedDialPress()}
            >
                <SpeedDial.Action
                    icon={{ name: 'add', color: tercero }}
                    color= '#01395E'
                    title="Crear"
                    onPress={() => console.log('Add Something')}
                />
                <SpeedDial.Action
                    icon={{ name: 'delete', color: tercero }}
                    color= '#01395E'
                    title="Eliminar"
                    onPress={() => console.log('Delete Something')}
                />
            </SpeedDial>

            <Modal  //la ventana para solicitar la contraseña
                animationType="slide"
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={handleClosePasswordModal}
            >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <View style={{ backgroundColor: principal, padding: 20, borderRadius: 10 }}>
                        <Text>Ingrese la contraseña:</Text>
                        <TextInput
                            secureTextEntry
                            style={{ borderBottomWidth: 1, marginBottom: 10 }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity onPress={handleSpeedDialPress}>
                            <Text style={{ color: tercero }}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Canales;
