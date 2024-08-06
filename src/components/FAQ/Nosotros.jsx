import styles from '../../styles/style-app';
import { principal, tercero, cuarto } from '../../styles/style-colors';
import imagenEquipo from '../../assets/images/logoEquipo.jpg'
import imagenBiologia from '../../assets/images/buap.png'
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';

import {
    Text,
    View,
    TouchableWithoutFeedback,
    ImageBackground,
    useColorScheme,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking
} from "react-native";

const Nosotros = () => {
    const systemTheme = useColorScheme();

    const { currentTheme, themes, modeTheme } = useSelector((state) => state.theme);
    const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
    const { 
        logoInicio, 
        colorPrimario,
        colorSecundario,
        colorTerciario,
        colorCuaternario,
        colorQuinario,
    } = theme;

    const desarrolladores = [
        {
            nombre: 'Irvyn Xicale Cabrera',
            github: 'irvyn2703',
            url: 'https://irvyn2703.github.io/',
            posicion: true
        },
        {
            nombre: 'Desarrollador 2',
            github: 'JesusPichon',
            url: 'https://github.com/JesusPichon',
            posicion: false
        },
        {
            nombre: 'Desarrollador 3',
            github: 'EnriqueRV10',
            url: 'https://github.com/EnriqueRV10',
            posicion: true
        },
        {
            nombre: 'Desarrollador 4',
            github: 'Abnerpino',
            url: 'https://github.com/Abnerpino',
            posicion: false
        },
        {
            nombre: 'Desarrollador 5',
            github: 'Kreork',
            url: 'https://github.com/Kreork',
            posicion: true
        }
    ];

    const lodoMayor = Dimensions.get('screen').width > Dimensions.get('screen').height ? Dimensions.get('screen').width : Dimensions.get('screen').height;

    const localStyles = StyleSheet.create({
        imagenBackground: {
            opacity:0.1,
            minHeight: lodoMayor,
            minWidth: lodoMayor,
            position: 'absolute',
            top: 30,
            left: 50
        },
        Borde: {
            borderColor: colorQuinario,
            borderWidth: 3,
        },
        Titulo: {
            fontSize: 24,
            fontWeight: 'bold',
            color: colorQuinario,
            marginVertical: 20,
            paddingVertical: 5,
            paddingHorizontal: 20,
            margin: 0,
            textAlign: 'center',
            textAlignVertical: 'center',
            borderRadius: 20,
        },
        TextContenido: {
            textTransform:'lowercase',
            textAlign: 'justify',
            fontSize: 16,
            fontWeight: 'bold',
            color: colorQuinario,
            opacity: 0.6
        },
        DevContenedor: {
            backgroundColor:colorQuinario, 
            paddingVertical:15, 
            paddingHorizontal:20,
            borderRadius:20, 
            zIndex:1
        },
        DevText: {
            color:colorPrimario, 
            fontSize:16, 
            fontWeight:'bold',
            textTransform:'capitalize'
        }
    });

    return (
        <View style={{flex:1, marginTop:20}}>
            {/*logo*/}
            <View style={{width:'100%', alignItems:'center', position:'relative'}}>
                <View style={[{borderRadius:200, padding:10, width:115, height:115, zIndex:2, backgroundColor:colorPrimario},localStyles.Borde]}>
                    <Image
                        style={{height:85, width:85}}
                        source={logoInicio}
                    />
                </View>
                <View style={{width:'100%', height:5, backgroundColor:colorQuinario, position:'absolute', bottom:57, zIndex:1}}></View>
            </View>
            {/* Descripción */}
            <View style={{alignItems:'center', paddingHorizontal:20}}>
                <Text style={[localStyles.Titulo, localStyles.Borde]}>BIO COLLECTOR</Text>
                <Text style={[localStyles.TextContenido]}>UNA APLICACIÓN MOVIL DISEÑADA PARA LA RECOLECCIÓN DE DATOS BIOLOGICOS, OBTENIDOS EN PRUEBAS DE CAMPO. LA APLICACIÓN PERMITE A LOS USUARIOS COMPARTIR LOS DATOS DE FORMA PÚBLICA DENTRO DE LA MISMA APLICACIÓN. EL OBJETIVO ES CREAR REPOSITORIOS DE INFORMACIÓN PARA INVESTIGADORES Y ALUMNOS DENTRO DEL CAMPO DE LA BIOLOGIA.</Text>
            </View>
            {/* Desarrolladores */}
            <View style={{alignItems:'center', paddingHorizontal:20, gap:15}}>
                <Text style={[localStyles.Titulo, localStyles.Borde]}>Desarrolladores</Text>
                {/* Nosotros */}
                {desarrolladores.map((desarrollador, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => Linking.openURL(desarrollador.url)}>
                            <View style={{flexDirection:desarrollador.posicion ? 'row' : 'row-reverse', alignItems:'center', width:'100%', justifyContent:'center', paddingHorizontal:20}}>
                                    <Image
                                        style={[{height:85, width:85, borderRadius:200, zIndex:2}, localStyles.Borde]}
                                        source={{uri: `https://github.com/${desarrollador.github}.png`}}
                                    />
                                    <View style={[{marginLeft:desarrollador.posicion ? -10 : 0, marginRight:desarrollador.posicion ? 0 : -10},localStyles.DevContenedor]}>
                                        <Text style={[localStyles.DevText]}>{desarrollador.nombre}</Text>
                                    </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            {/* Primeros pasos */}
            <View style={{alignItems:'center', paddingHorizontal:20}}>
                <Text style={[localStyles.Titulo, localStyles.Borde]}>Primeros pasos</Text>
            </View>
        </View>
    );
}



export default Nosotros;