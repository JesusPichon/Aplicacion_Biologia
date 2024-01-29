import { StyleSheet } from 'react-native';
import { principal,secundario, tercero } from '../../components/styles/style-colors';

const styles = StyleSheet.create({
    // color de las letras
    textP: {
        color: principal,
    },
    textS: {
        color: secundario,
    },
    textT: {
        color: tercero,
    },
    // color de fondo
    fondoP: {
        backgroundColor: principal,
    },
    fondoS: {
        backgroundColor: secundario,
    },
    fondoT: {
        backgroundColor: tercero,
    },
    // contenedor principal
    container: {
        borderTopRightRadius: 75,
        borderTopLeftRadius: 75,
        paddingHorizontal: 20,
        paddingTop: 40,
        marginTop: 20,
        flex: 1
    },
    // boton --------------> el color se cambia con el atributo fondoP,S,T y el texto con textP,S,T
    boton: {
        padding: 10,
        maxWidth: 150,
        borderRadius: 5,
        margin: 10,
    },
    // cartas en vertical (utilizadas para buscar el canal)
    cardVertical: {
        borderRadius: 10,
        shadowColor: "#000",
        height: 185,
        width: 125,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    cardVcontenido: {
        backgroundColor: principal,
        height: 65,
        width: 125,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardVImagen: {
        width: 125,
        height: 'auto'
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default styles;
