import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs';
import { readString, jsonToCSV } from 'react-native-csv';

export const selectCsv = async () => {   
    try {
        const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true
        });

        for (let res of results) {
        if (res.type && !res.type.endsWith('text/comma-separated-values')) {
            Alert.alert('Por favor, selecciona solo archivos .csv');
            return;
        }

        // Leer el contenido del archivo
        const fileContent = await RNFS.readFile(res.uri);
        console.log(fileContent);

        // Procesar el contenido del archivo CSV
        const data = readString(fileContent, { delimiter: ',', header: false });
        console.log(data);

        // const csv = jsonToCSV(data.data);

        // console.log(csv);

        //console.log(data.data[0]);
        }

    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        console.log('Operación cancelada');
        } else {
        throw err;
        }
    }    
}