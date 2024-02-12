import { StyleSheet } from 'react-native';
import { principal, secundario, tercero } from '../../styles/style-colors';

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
    botongrupo: {
        padding: 10,
        width: '100%', // Ocupar el 100% del ancho del card
        height: 65,
        backgroundColor: 'tu_color_de_fondo_del_boton', // Puedes agregar un color de fondo aquí
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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
    cardVImagen: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

    nuevo: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 125,
        borderRadius: 5,
        
    }
});

export default styles;
