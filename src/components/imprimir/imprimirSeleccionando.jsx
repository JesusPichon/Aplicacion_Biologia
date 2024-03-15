import Snackbar from 'react-native-snackbar';
import { tercero } from '../../styles/style-colors';
import { selectImg } from '../imprimir/seleccionarImagen';
import { Dimensions } from 'react-native';
import imprimir from "../imprimir/imprimir";


export const imprimirTomas = async (data) => {
    try {
        const SCREEN_HEIGHT = Dimensions.get('window').height;
        const TOP_MARGIN = SCREEN_HEIGHT * 0.1;

        Snackbar.show({
            text: 'El tamaño sugerido de la imagen es de 755x60 px',
            duration: Snackbar.LENGTH_LONG,
            marginBottom: SCREEN_HEIGHT - TOP_MARGIN,
            textColor: tercero,
        });
        const imageUri = await selectImg(); // Espera a que selectImg() se complete y obtiene la URI de la imagen
        console.log(imageUri)
        imprimir(data, imageUri); // Llama a imprimir() con los datos y la URI de la imagen
    } catch (error) {
        console.error('Error al seleccionar la imagen:', error);
    }
};