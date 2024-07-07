import { SearchBar } from "@rneui/themed";
import { cuarto, principal, secundario, tercero } from "../../styles/style-colors";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from '@rneui/themed';
import { verGruposFiltrado, verTomas, consultarIdGrupo, verTomasFiltrado } from "../../services/database/SQLite";
import { View, Animated, TouchableOpacity, Easing, Dimensions } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';


const Menu = ({ pantalla, navigation }) => {
    const { width: screenWidth } = Dimensions.get('window');

    const paginas = [
        { label: 'Perfil', value: '---' },
        { label: 'Configuracion', value: '---' },
        { label: 'Explorar', value: '---' },
    ];

    return (
        <View style={{ 
            flexDirection: 'row', 
            alignItems: 'flex-start', 
            flex:1, 
            height:'100%', 
            position:"absolute", 
            backgroundColor:'#648',
            top:0,
            left:0,
            right:0,
            bottom:0,
            //transform:[{translateX:screenWidth/2}]
        }}>
            <View style={{
                position:"absolute",
                top: 5,
                left: 5,
                zIndex:3
            }}>
                <TouchableOpacity>
                    <Icon name='menu' size={30} />
                </TouchableOpacity>
            </View>
            <View style={{
                flex:65,
                height:'100%',
                backgroundColor: '#9f5'
            }}>
                <View>

                </View>
            </View>
            <View style={{
                flex:35,
                height:'#469',
                opacity:0.35,
            }}>

            </View>
        </View>
    );
}

export default Menu;
