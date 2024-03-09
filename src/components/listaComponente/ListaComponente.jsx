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

const CustomDropdown = ({ control, name, rules, errors, label, data, allowCustomOption, allowSearchOption, tooltip, placeholder }) => {
  const [isCustom, setIsCustom] = useState(false);
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.container}>
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
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.ContainerStyle}
                iconColor='#FFF'
                data={allowCustomOption ? data : data.filter(item => item.value !== 'otro')}
                ietm
                search={allowSearchOption}
                searchPlaceholder="Busqueda..."
                labelField="label"
                valueField="value"
                placeholder={placeholder}
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
                  style={styles.textInputOp}
                  value={value}
                  onChangeText={text => onChange(text)}
                  placeholder="Ingresa tu opción"
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
      color: principal,
      textAlign: 'left',
      fontWeight: 'bold',
      fontSize: 15
    },
    textInputOp: {
      flex: 1,
      backgroundColor: 'rgb(128, 155, 174)',
      borderRadius: 5,
      borderColor: false,
      color: tercero,
      paddingHorizontal: 10,
      marginTop: 10,
      fontSize: 16,
    },
    textError: {
        color: 'red',
    },
    dropdown:{
      backgroundColor: 'rgb(128, 155, 174)',
      borderRadius: 5,
      paddingHorizontal: 10,
  
    },
    selectedTextStyle: {
      color: tercero,
      fontWeight: 'bold'
    },
    itemTextStyle: {
      color: '#838383',
    },
    ContainerStyle: {
      borderRadius: 10,
    },
    tooltipText: {
        color:tercero,
        fontWeight: 'bold',
        textAlign: 'center',
    },
  })

export default CustomDropdown;
