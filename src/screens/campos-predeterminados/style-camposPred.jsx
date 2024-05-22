import { StyleSheet } from 'react-native';
import { principal, secundario, tercero } from '../../styles/style-colors';

const styles = StyleSheet.create({
    containerF: {
        borderRadius: 15,
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
        width: '48%',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
    },
    bEliminar: {
        width: '48%',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
        backgroundColor: 'red',
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
    textB: {
        color: tercero,
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 15,
    },
    containerButton:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        positon: 'absolute',
        bottom: 0,
        marginHorizontal: 20,
    },
});

export default styles;