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
} from "react-native";

const Nosotros = () => {
    const SobreNosotros = [
        { titulo: 'Nombre bien mamalon', contenido: 'una descripcion de quienes somos' },
        { titulo: 'Facultad de Biologia', contenido: 'una descripcion' },
    ];

    const Preguntas = [
        { pregunta: '¿Quién vive en una piña debajo del mar?', respuesta: 'Bob Esponja' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
        { pregunta: 'Naranja, ¿es un color o una fruta?', respuesta: 'La fruta naranja obtuvo su nombre del color, ya que la fruta es conocida por su característico tono anaranjado.' },
    ];

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
                            <Text style={{ fontSize: 15, marginTop: 10, color: tercero }}>{pregunta.respuesta}</Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    );
    
}

export default Nosotros;