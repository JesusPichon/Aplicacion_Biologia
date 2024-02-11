import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { principal, tercero } from '../../styles/style-colors';

const FechaComponente = ({ control, name, errors, rules }) => {
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${day}/${month}/${year}`;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textP}>Fecha:</Text>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        {!showPicker && (
                            <Pressable onPress={toggleDatePicker}>
                                <TextInput
                                    style={styles.textInput}
                                    editable={false}
                                    value={value ? formatDate(value) : ''}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                />
                            </Pressable>
                        )}
                        {showPicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={value || new Date()}
                                onChange={(event, selectedDate) => {
                                    onChange(selectedDate);
                                    toggleDatePicker();
                                }}
                            />
                        )}
                    </View>
                )}
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
});

export default FechaComponente;
