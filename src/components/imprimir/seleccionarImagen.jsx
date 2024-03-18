import { Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

export const selectImg = async () => {   
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        });

        // Verificar si res es un array y tiene al menos un elemento
        if (Array.isArray(res) && res.length > 0 && res[0].uri) {
            // Obtener la dirección de la primera imagen seleccionada
            const imageUri = res[0].uri;
            //console.log('Dirección de la imagen:', imageUri);

            // Leer el contenido del archivo (no es necesario para imágenes)

            return imageUri; // Devolver la URI de la imagen
        }

    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            //console.log('Operación cancelada');
        } else {
            throw err;
        }
    }    
}
