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
import { useSelector } from 'react-redux';
import { color } from '@rneui/base';

const TextInputCustome = ({ label, control, name, rules, errors, multiline, maxLines, tooltip, keyboardType }) => {
    const {currentTheme, themes} = useSelector((state) => state.theme);

    const theme = themes[currentTheme] || themes.light;
    const {  
        tabItemSelectColor,
        colorPrimario,
        colorSecundario,
        colorTerciario,
        colorCuaternario,
        colorQuinario,
    } = theme;

    const textInputStyle = multiline ? 
    [styles.textInputMultiLine, {backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorQuinario}] : 
    [styles.textInput, {backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorQuinario}];  // Determinar el estilo de TextInput según la prop multilinea
    
    const [open, setOpen] = React.useState(false);

    return (
        <View style={ styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.textP, {color: colorCuaternario,}]}>{label}</Text>
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
                            height={75}
                            width={250}
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
                        keyboardType={keyboardType}
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
        marginTop: 10,
        marginBottom: 10
    },
    textP: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginRight: 5,
        marginBottom: 5,
        fontSize: 16
    },
    textInput: {
        borderRadius: 10,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 16,
        borderWidth: 2,
    },
    textInputMultiLine: {
        borderRadius: 10,
        paddingLeft: 10,
        fontWeight: 'bold',
        height: 150,
        fontSize: 16,
        borderWidth: 2,
    },
    textError: {
        color: 'red',
    }
})

export default TextInputCustome;
