import React from 'react';
import { Controller } from "react-hook-form";
import { principal, secundario, tercero } from '../../styles/style-colors';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';

const TextInputCustome = ({ label, control, name, rules, errors }) => {
    return (
        <View style={ styles.container}>
            <Text style={styles.textP}>{label}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.textInput}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
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
    textError: {
        color: 'red',
    }
})

export default TextInputCustome;
