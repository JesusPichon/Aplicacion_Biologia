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
});



export default styles;