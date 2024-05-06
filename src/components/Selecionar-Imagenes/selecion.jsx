import React from 'react';
import { launchImageLibrary } from 'react-native-image-picker';

const seleccion = async () => {
    const options = {
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
        selectionLimit: 1,
    };
    
    try {
        const response = await launchImageLibrary(options);
        if (response.assets && response.assets.length > 0) {
            // Asegúrate de acceder a la propiedad 'assets' de la respuesta
            const asset = response.assets[0];
            console.log('La URI de la imagen seleccionada es:', asset.uri);
            return asset.uri;
        } else {
            console.log('Selección cancelada o no se seleccionó ninguna imagen.');
            return null;
        }
    } catch (error) {
        console.error('Error al seleccionar la imagen:', error);
        throw error;
    }
};

export default seleccion;
