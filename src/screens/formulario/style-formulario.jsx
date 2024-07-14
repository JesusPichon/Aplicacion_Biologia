import { StyleSheet } from 'react-native';
import { principal, secundario, tercero } from '../../styles/style-colors';

const styles = StyleSheet.create({
    containerF: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 10,
        //paddingBottom: 10,
        margin: 20,
        flex: 1
    },
    fondoT: {
        backgroundColor: tercero,
    },
    textTitle:{
        color: principal,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10
    },
    fondoP: {
        backgroundColor: principal,
    },
    text: {
        color: 'black', // Cambia el color de la letra a negro
        
    },

    mainContainer: {
        flex: 1,
    },
    secondaryContainer: { 
        flex: 1,
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30, 
    },
    // contenedor de los TabView
    TabViewcontainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderTopLeft: 30,  
        borderTopRight: 30,
        borderRadius: 30,
        margin: 15,
        padding: 15,

    },
});



export default styles;