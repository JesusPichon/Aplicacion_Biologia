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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      inputModal: {
        width: '100%',
        fontWeight: 'bold',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 15,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      button: {
        flex: 1,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 18,
        alignItems: 'center',
        marginHorizontal: 5,
      },
      cancelButton: {
        backgroundColor: '#FF4136',
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },
});

export default styles;