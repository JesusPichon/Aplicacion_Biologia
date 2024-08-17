import { Modal, TextInput, TouchableWithoutFeedback, View, TouchableOpacity, Text } from "react-native";
import { principal } from "../../styles/style-colors";

function VentanaFlotante({openModal, handleCloseModal, handleTextChange, saveGroup, errorMessage, nombre}) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={openModal}
            onRequestClose={handleCloseModal}>

            <TouchableWithoutFeedback onPress={handleCloseModal}>
                
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                            <TextInput
                                placeholder="Ingrese el nombre del grupo"
                                placeholderTextColor="gray" // Cambia el color aquí
                                style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10, borderRadius: 5, color: 'black' }}
                                onChangeText={handleTextChange}
                                value={nombre ? nombre : ''}
                            />

                            {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

                            <TouchableOpacity
                                style={{ backgroundColor: principal, padding: 10, borderRadius: 5 }}
                                onPress={saveGroup}
                            >
                                <Text style={{ color: 'white', textAlign: 'center' }}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default VentanaFlotante;