import styles from '../../styles/style-app';
import { principal, tercero, cuarto } from '../../styles/style-colors';
import imagenEquipo from '../../assets/images/logoEquipo.jpg'
import imagenBiologia from '../../assets/images/buap.png'
import React, { useState } from 'react';

import {
    Text,
    View,
    TouchableWithoutFeedback,
    ImageBackground,
    Image,
} from "react-native";

const Nosotros = () => {
    const SobreNosotros = [
        { titulo: 'Interfaz Infinita', contenido: 'Un grupo de estudiantes apasionados por la tecnología, trabajando juntos para explorar nuevas ideas y crear experiencias digitales innovadoras que desafíen los límites de la creatividad y la tecnología'},
        { titulo: 'Facultad de Biologia', contenido: 'una descripcion'},
    ];

    const Preguntas = [
        { pregunta: '¿Cuál es el tamaño de la imagen para las impresiones?', respuesta: 'Puedes utilizar cualquier imagen, pero recomendamos 755px de ancho y 60px de alto o cualquier escala de estas medidas para evitar errores visuales. También puedes optar por no elegir ninguna imagen.' },
        { pregunta: '¿Puedo seleccionar qué campos imprimir de mi toma?', respuesta: 'Sí, solo selecciona la toma y te mandará a una nueva pantalla donde podrás seleccionar qué campos quieres imprimir y posteriormente selecciona imprimir.' },
        { pregunta: '¿Puede correr DOOM?', respuesta: 'Lamentablemente no ... Por el momento :)' },
    ];

    const renderImagen = (titulo) => {
        console.log(titulo);
        switch (titulo) {
            case 1:
                console.log(imagenEquipo)
                return (
                    <View>
                        <Image style={{marginBottom:10}} source={require('../../assets/images/res1.jpg')} />
                        <Image style={{marginBottom:10}} source={require('../../assets/images/res2.jpg')} />
                    </View>
                );
           
            default:
                return null; // Retornar null en lugar de una cadena vacía
        }
    };


    const [expandedIndex, setExpandedIndex] = useState(null);

    return (
        <View style={{ backgroundColor: tercero }}>
            <View style={{alignItems: 'center'}}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: principal, marginVertical: 20 }}>¿Quiénes somos?</Text>
            </View>
            {/* Mapeo de ¿quiénes somos? */}
            {
                SobreNosotros.map((item, index) => (
                    <View key={item.titulo} style={{ marginBottom: 20, backgroundColor: principal }}>
                        <ImageBackground source={(index % 2 === 0) ? imagenEquipo : imagenBiologia} resizeMode="cover" style={styles.image}>
                            <View style={{ marginVertical: 15, paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: tercero }}>{item.titulo}</Text>
                            </View>
                            <View style={{ marginVertical: 10, paddingHorizontal: 10, paddingVertical: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: tercero }}>{item.contenido}</Text>
                            </View>
                        </ImageBackground>
                    </View>
                ))
            }
            <View style={{alignItems: 'center'}}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: principal, marginVertical: 20 }}>Preguntas frecuentes</Text>
            </View>
            {/* Mapeo de preguntas frecuentes */}
            {Preguntas.map((pregunta, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                    <View style={{ backgroundColor: cuarto, marginVertical: 5, padding: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: tercero }}>{pregunta.pregunta}</Text>
                        {expandedIndex === index && (
                            <View style={{alignItems: 'center'}}>
                                <Text style={{ fontSize: 15, marginTop: 10, color: tercero }}>{pregunta.respuesta}</Text>
                                { 
                                renderImagen(index)
                                }
                            </View>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
    
}

export default Nosotros;