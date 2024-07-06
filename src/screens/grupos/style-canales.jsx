import { StyleSheet, Dimensions } from 'react-native';
import { principal, secundario, tercero } from '../../styles/style-colors';
import { fonts } from '@rneui/base';

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
        width: '90%', // Ajustado para ocupar más espacio
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.63,
        shadowRadius: 2.62,
        elevation: 4,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        alignSelf: 'center', // Centrar en el contenedor
        marginBottom: 20, // Espaciado entre elementos
    },
    cardVImagen: {
        flex: 1
    },
    nombreView: {
        position: 'absolute',
        top: '66.66%',
        left: 0,
        width: '100%', // Ocupa todo el ancho
        height: '33.33%', // Una tercera parte del alto
        justifyContent: 'left', // Centra el contenido (por ejemplo, texto) verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
        paddingHorizontal: 20, // Ajusta el relleno horizontal según sea necesario		
        backgroundColor: '#306060', // Fondo semitransparent
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    otroView: {
        position: 'absolute',
        top: 0,
        left: '66.66%',
        width: '33.33%', // Una tercera parte del ancho
        height: '66.66%', // Ocupa todo el alto
        justifyContent: 'center', // Centra el contenido verticalmente
        alignItems: 'center', // Centra el contenido horizontalmente
        backgroundColor: '#eff3f4',
    },
    image: {
        position: 'absolute',
        top: 0, // Comienza donde termina el View del nombre
        left: 0, // Comienza donde termina el otro View
        width: '81.7%', // Resto del ancho
        height: '81.7%', // Resto del alto
        justifyContent: 'center',
    },


    
});

export default styles;
