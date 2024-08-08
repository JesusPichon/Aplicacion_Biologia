import { StyleSheet } from "react-native";

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
    itemContainer: {
        marginHorizontal: 10,
    },
    button: {
        borderRadius: 25,
        width: '35%',
        paddingVertical: 10,
        alignItems: 'center',
      },
});

export default styles;