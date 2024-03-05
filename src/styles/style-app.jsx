import { StyleSheet } from 'react-native';
import { principal, secundario, tercero } from './style-colors';

const styles = StyleSheet.create({
    // color de las letras
    textP: {
        color: principal,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    textS: {
        color: secundario,
    },
    textT: {
        color: tercero,
        textAlign: 'center', 
        fontWeight: 'bold'
    },
    textTitle:{
        color: principal,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
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
    // TextInput
    textInput: {
        backgroundColor: 'rgb(128, 155, 174)',
        borderRadius: 5,
        borderColor: false,
        color: tercero,
        paddingLeft: 10,
        marginBottom: 10,
        fontWeight: 'bold'
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
    // contenedor formulario
    containerF: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        margin: 20,
        flex: 1
    },
    containerList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
    picker: {
        flex: 1,
         
    },
    // botones --------------> el color se cambia con el atributo fondoP,S,T y el texto con textP,S,T
    boton: {
        padding: 10,
        maxWidth: 150,
        borderRadius: 5,
        margin: 10,
    },
    bGuardar: {
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 40,
        alignSelf: 'center',
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