import React, { useState }from 'react';
import { Dropdown } from "react-native-element-dropdown";
import { principal, secundario, tercero } from '../../styles/style-colors';
import { Tooltip, Icon } from '@rneui/themed';
import {
    Text,
    TextInput,
    View,
    StyleSheet
} from 'react-native';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';

const CustomDropdown = ({ control, name, rules, errors, label, data, allowCustomOption, allowSearchOption, tooltip, placeholder }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [open, setOpen] = React.useState(false);

  const {currentTheme, themes} = useSelector((state) => state.theme);

  const theme = themes[currentTheme] || themes.light;
  const {  
      colorPrimario,
      colorSecundario,
      colorTerciario,
      colorCuaternario,
      colorQuinario,
  } = theme;

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.textP, {color: colorCuaternario}]}>{label}</Text>
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
                        height={55}
                        width={250}
                    >
                            <Icon name="help-outline" size={20} color="#9E9E9E" />
                    </Tooltip>
                </View>
            )}
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <Dropdown
                style={[styles.dropdown, {backgroundColor: colorPrimario, borderColor: colorTerciario}]}
                selectedTextStyle={[styles.selectedTextStyle, {color: colorQuinario}]}
                itemTextStyle={{color: '#FFF'}}
                containerStyle={[styles.ContainerStyle, {backgroundColor: colorTerciario}]}
                activeColor={colorSecundario}
                iconColor={currentTheme === 'dark' ? '#FFF' : 'gray'}
                data={allowCustomOption ? data : data.filter(item => item.value !== 'otro')}
                ietm
                search={allowSearchOption}
                searchPlaceholder="Busqueda..."
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                placeholderStyle={{color: currentTheme === 'dark' ? '#FFF' : 'gray'}}
                value={isCustom ? 'otro' : value}
                onChange={item => {
                  if (item.value === 'otro') {
                    setIsCustom(true);
                    onChange('');
                  } else {
                    setIsCustom(false);
                    onChange(item.value);
                  }
                }}
              />
              {isCustom && (
                <TextInput
                  style={[styles.textInputOp, {backgroundColor: colorPrimario, borderColor: colorTerciario, color: colorQuinario}]}
                  value={value}
                  onChangeText={text => onChange(text)}
                  placeholder="Ingresa tu opción"
                  placeholderTextColor={currentTheme === 'dark' ? '#FFF' : 'gray'}
                />
              )}
            </View>
          )}
          name={name}
          rules={rules}
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
      textAlign: 'left',
      fontWeight: 'bold',
      marginRight: 5,
      marginBottom: 5,
      fontSize: 16
    },
    textInputOp: {
      flex: 1,
      borderRadius: 10,
      borderWidth: 2,
      paddingHorizontal: 10,
      marginTop: 10,
      fontSize: 16,
    },
    textError: {
        color: 'red',
    },
    dropdown:{
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 10,
      
    },
    selectedTextStyle: {
      fontWeight: 'bold'
    },
    itemTextStyle: {
      color: '#838383',
    },
    ContainerStyle: {
      borderRadius: 10,
      borderWidth: 0,
    },
    tooltipText: {
        color:tercero,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  })

export default CustomDropdown;
