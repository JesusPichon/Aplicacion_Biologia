import React, { useEffect, useState } from 'react';
import BarraBusqueda from "../../components/BarraBusqueda";
import Menu from "../../components/menu";
import styles from '../../styles/style-app';
import animaciones from '../../components/animaciones/animaciones';
import { tercero } from '../../styles/style-colors';
import { crearTablas } from '../../services/database/SQLite';
import { PermissionsAndroid,useColorScheme } from 'react-native';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    StatusBar,
    ImageBackground
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCache } from "../../services/storage/CacheContext";


const Prueba = ({ navigation }) => {
    function updateGrupos(x) {
        console.log(x);
    }

    return (
        <View style={{width:'100%', height:'100%', justifyContent:'center'}}>
            <Menu pantalla={'Perfil'}/>
            <View style={{width:'100%', height:43, backgroundColor:'#58f'}}>
                <BarraBusqueda titulo={'Buscar grupo'} pantalla={'grupos'} onResult={updateGrupos} />
            </View>
        </View>
    )
}

export default Prueba;