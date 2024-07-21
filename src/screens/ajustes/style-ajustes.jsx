import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

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
        paddingHorizontal: 20, 
        marginBottom: 10,
    },
    textInput: { 
        borderWidth: 1, 
        borderRadius: 10, 
        marginHorizontal: 20, 
        padding: 10, 
        marginBottom: 10,
    },
});

export default styles;