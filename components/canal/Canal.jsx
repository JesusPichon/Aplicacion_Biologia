import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Canal({navigation}){

    return(
        <View style={{backgroundColor: 'yellow', width: "50%", height: "30%"}}>
            <TouchableOpacity onPress={() =>{
                navigation.replace('Tomas');
            }}>
                <Text>Canal 1</Text>
            </TouchableOpacity>
        </View>
    );
    
}

export default Canal;