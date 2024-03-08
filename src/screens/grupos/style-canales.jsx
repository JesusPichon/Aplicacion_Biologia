import { StyleSheet, Dimensions } from 'react-native';
import { principal, secundario, tercero } from '../../styles/style-colors';

let screenWidth = Dimensions.get('window').width;

// Ajusta estos valores según tus necesidades
let paddingHorizontal = screenWidth * 0.6; // Esto será el 50% del ancho de la pantalla

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
        //paddingHorizontal: 20,
        paddingTop: 0,
        marginTop: 20,
        flex: 1,
        borderTopLeft: 30,  
        borderTopRight: 30, 
    },
    container1: {
        paddingHorizontal: paddingHorizontal, // Ajusta el relleno horizontal según tus necesidades
        paddingTop: 35, // Ajusta el relleno superior según tus necesidades
        marginTop: -25, // Ajusta el margen superior según tus necesidades
        overflow: 'hidden', // Esto ocultará cualquier contenido que se extienda fuera del contenedor
        transform: [{ skewY: '-3deg' }], // Ajusta el ángulo de inclinación según tus necesidades
      },
      container2: {
        paddingHorizontal: paddingHorizontal, // Ajusta el relleno horizontal según tus necesidades
        paddingTop: 10, // Ajusta el relleno superior según tus necesidades
        marginTop: 15, // Ajusta el margen superior según tus necesidades
        overflow: 'hidden', // Esto ocultará cualquier contenido que se extienda fuera del contenedor
        transform: [{ skewY: '-3deg' }], // Ajusta el ángulo de inclinación según tus necesidades
      },
    //contenerdor de los botones 
    buttonContainer: { 
        flexDirection: 'row', // Esto coloca los elementos en fila en lugar de columna
        justifyContent: 'space-around', // Esto distribuye el espacio entre los elementos de manera uniforme
        marginTop: -10, // Puedes ajustar esto según sea necesario
      },
    
    // botones --------------> el color se cambia con el atributo fondoP,S,T y el texto con textP,S,T
    botongrupo: {
        padding: 10,
        width: '100%', // Ocupar el 100% del ancho del card
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
      fusionar: {
        flex: 1,
        padding: 13,
        maxWidth: 200,  // Ajusta el valor según sea necesario para hacer el botón más largo
        borderRadius: 5,
        margin: 10,
      },
    
      exportar: {
        flex: 1,
        padding: 13,
        maxWidth: 200,  // Ajusta el valor según sea necesario para hacer el botón más largo
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
        overflow: 'hidden',
    },
    cardVImagen: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },



    
});

export default styles;
