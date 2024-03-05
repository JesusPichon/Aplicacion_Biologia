import { StyleSheet } from 'react-native';
import { principal, secundario, tercero } from '../../styles/style-colors';

const styles = StyleSheet.create({
    containerF: {
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
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
        marginBottom: 10
    },
    bGuardar: {
        width: '100%',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 40,
        alignSelf: 'center',
    },
    fondoP: {
        backgroundColor: principal,
    },
    textT: {
        color: tercero,
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18
    },
});



export default styles;