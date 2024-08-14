import { StyleSheet } from "react-native";
import { ButtonGroup } from "react-native-elements";

const styles = StyleSheet.create({ 
    mainContainer: {  
        flex: 1, 
    },
    secondaryContainer: { 
        flex: 1,  
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20,
        
    },
    titleContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginVertical: 10, 
        marginBottom: 10,
        marginHorizontal: 10,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    itemContainer: {
        marginHorizontal: 10,
    },
    button: {
        borderRadius: 25,
        width: '35%',
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 5,
    },
    ButtonGroupContainer: {
        marginBottom: 20,
        borderRadius: 25,
        height: 50,
    },
    ButtonGroupText: {
        fontSize: 16, 
        textAlign: 'center'
    },
    input: {
        fontWeight: 'bold',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 25,
        height: 40,
    },
});

export default styles;