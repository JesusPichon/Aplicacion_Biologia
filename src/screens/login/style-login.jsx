import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        fontWeight: 'bold',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 25,
        height: 40,
        width: '85%'
    },
    button: {
        borderRadius: 25,
        width: '35%',
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'center' 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelText: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        marginTop: -20,
        fontSize: 14,
    },
    loginRegisterButton: {
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
});

export default styles;