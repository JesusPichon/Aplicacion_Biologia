import React from 'react';
import { Controller } from "react-hook-form";
import { principal, secundario, tercero } from '../../styles/style-colors';
import { Tooltip, Icon } from '@rneui/themed';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';

const TextInputCustome = ({ label, control, name, rules, errors, multiline, maxLines, tooltip }) => {
    const textInputStyle = multiline ? styles.textInputMultiLine : styles.textInput;  // Determinar el estilo de TextInput según la prop multilinea
    const [open, setOpen] = React.useState(false);

    return (
        <View style={ styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textP}>{label}</Text>
                {tooltip && (
                    <View >
                        <Tooltip 
                            popover={<Text style={styles.tooltipText}>{tooltip}</Text>}
                            visible={open}
                            onOpen={() => {
                                setOpen(true);
                            }}
                            onClose={() => {
                                setOpen(false);
                            }}
                            withPointer={true}
                            withOverlay={true}
                            skipAndroidStatusBar={true}
                            backgroundColor='#424242'
                        >
                                <Icon name="help-outline" size={20} color="#9E9E9E" />
                        </Tooltip>
                    </View>
                )}
            </View>
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
    tooltipText: {
        color:tercero,
        fontWeight: 'bold'
    },  
    container: {
        marginBottom: 10
    },
    textP: {
        color: principal,
        textAlign: 'left',
        fontWeight: 'bold',
        marginRight: 5
    },
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
