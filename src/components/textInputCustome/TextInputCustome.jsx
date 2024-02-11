import React from 'react';
import { Controller } from "react-hook-form";
import { principal, secundario, tercero } from '../../styles/style-colors';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';

const TextInputCustome = ({ label, control, name, rules, errors, multiline, maxLines }) => {
    // Determinar el estilo de TextInput según la prop multilinea
    const textInputStyle = multiline ? styles.textInputMultiLine : styles.textInput;

    return (
        <View style={ styles.container}>
            <Text style={styles.textP}>{label}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={textInputStyle} // Combinar estilos
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        multiline={multiline} // Activar o desactivar multilinea
                        numberOfLines={multiline ? maxLines : 1} // Ajustar el número de líneas máximo si es multilinea
                        textAlignVertical={multiline ? "top" : "center"} // Mover el cursor y el texto hacia arriba si es multilinea
                    />
                )}
                name={name}
                rules={rules}
                defaultValue=""
            />
            {errors && errors[name] && <Text style={styles.textError}>{errors[name].message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    textP: {
        color: principal,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    // TextInput
    textInput: {
        backgroundColor: 'rgb(128, 155, 174)',
        borderRadius: 5,
        borderColor: false,
        color: tercero,
        paddingLeft: 10,
        fontWeight: 'bold'

    },
    textInputMultiLine: {
        backgroundColor: 'rgb(128, 155, 174)',
        borderRadius: 5,
        borderColor: false,
        color: tercero,
        paddingLeft: 10,
        fontWeight: 'bold',
        height: 150,
    },
    textError: {
        color: 'red',
    }
})

export default TextInputCustome;
