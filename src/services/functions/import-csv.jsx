import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs';
import { readString, jsonToCSV } from 'react-native-csv';

export const selectCsv = async () => {   
    return new Promise(async (resolve, reject) => {
        try {
            const result = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles],
            });

            if (result.type && !result.type.endsWith('text/comma-separated-values')) {
                Alert.alert('Por favor, selecciona solo archivos .csv');
                reject('Tipo de archivo no válido');
                return;
            }

            // Leer el contenido del archivo
            const fileContent = await RNFS.readFile(result.uri);

            // Procesar el contenido del archivo CSV
            const data = readString(fileContent, { delimiter: ',', header: true, newline: ''});
            //console.log(data);

            // Resuelve la promesa con los datos leídos
            resolve(data.data);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                //console.log('Operación cancelada');
                reject('Importar CSV cancelado');
            } else {
                reject(err);
            }
        }    
    });
}
