import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs';
import { readString, jsonToCSV } from 'react-native-csv';

export const selectCsv = async () => {   
    try {
        const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        });

        if (result.type && !result.type.endsWith('text/comma-separated-values')) {
            Alert.alert('Por favor, selecciona solo archivos .csv');
            return;
        }

        // Leer el contenido del archivo
        const fileContent = await RNFS.readFile(result.uri);
        console.log(fileContent);

        // Procesar el contenido del archivo CSV
        const data = readString(fileContent, { delimiter: ',', header: true });
        console.log(data);
        // console.log(data.data[0]);
        // console.log(data.data[0].flor);


    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        console.log('Operación cancelada');
        } else {
        throw err;
        }
    }    
}