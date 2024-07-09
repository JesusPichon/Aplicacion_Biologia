import { principalFePro, secundarioFePro, terceropFePro, cuartoFePro, quintoFePro } from "../../styles/style-colors";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Icon, Switch } from '@rneui/themed';
import { View, Animated, TouchableOpacity, Easing, Dimensions, ImageBackground } from "react-native";
import { Text } from "react-native-elements";


const Menu = ({ pantalla, navigation }) => {
    const logoClaro = require('../../assets/images/logoClaro.png');
    const { width: screenWidth } = Dimensions.get('window');
    const [modoSwitch, setModoSwitch] = useState(false);
    const [verMenu, setVerMenu] = useState(false);
    const animatedValue = useRef(new Animated.Value(screenWidth)).current;

    const paginas = useMemo(() => [
        { label: 'Perfil', value: 'person' },
        { label: 'Mis grupos', value: 'home' },
        { label: 'Explorar', value: 'visibility' },
    ], []);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: verMenu ? 0 : -screenWidth,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, [verMenu]);

    const iconMenu = animatedValue.interpolate({
        inputRange: [0, screenWidth],
        outputRange: [0, -screenWidth],
    });

    return (
        <Animated.View style={{ 
            flexDirection: 'row', 
            alignItems: 'flex-start', 
            flex:1, 
            height:'100%', 
            position:"absolute", 
            top:0,
            left:0,
            right:0,
            bottom:0,
            zIndex:1,
            transform:[{translateX: animatedValue}]
        }}>
            <Animated.View style={{
                position:"absolute",
                top: 8,
                left: 5,
                zIndex:1,
                transform:[{translateX: iconMenu}]
            }}>
                <TouchableOpacity onPress={() => setVerMenu(!verMenu)}>
                    <Icon name={verMenu ? 'clear' : 'menu'} color={principalFePro} size={30} />
                </TouchableOpacity>
            </Animated.View>
            <View style={{
                width:'65%',
                height:'100%',
                backgroundColor: quintoFePro,
                borderBottomRightRadius:20,
                borderTopRightRadius:20,
            }}>
                <View style={{
                    flex: 1, 
                    alignItems:"flex-end", 
                }}>
                    <View style={{
                        width:40, 
                        height:40,
                        marginRight:8,
                        marginTop:5,
                    }}>
                        <ImageBackground source={logoClaro} resizeMode="center" style={{width:'100%', height:'100%'}}/>
                    </View>
                </View>
                <View style={{flex: 8, justifyContent:"center"}}>
                    {paginas.map((pagina, index) => (
                        <TouchableOpacity key={index} style={{
                            backgroundColor: pantalla === pagina.label ? principalFePro : quintoFePro,
                            padding: 10,
                            marginVertical: 5,
                            paddingLeft: pantalla === pagina.label ? 30 : 10,
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            flexDirection: "row",
                            gap: 8,
                        }}>
                            <Icon name={pagina.value} size={25} color={pantalla === pagina.label ? quintoFePro : principalFePro}/>
                            <Text style={{fontSize: 20, fontWeight:"500", color: pantalla === pagina.label ? quintoFePro : principalFePro}}>{pagina.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{
                    flex: 1, 
                    justifyContent:"center", 
                    alignItems:"center", 
                    flexDirection:"row", 
                    gap:10
                }}>
                    <Text style={{fontWeight:"bold", color:principalFePro}}>
                        {modoSwitch ? 'Activar modo claro' : 'Activar modo oscuro'}
                    </Text>
                    <Switch
                        color={principalFePro}
                        value={modoSwitch}
                        onValueChange={(value) => setModoSwitch(value)}
                    />
                </View>
            </View>
        </Animated.View>
    );
}

export default Menu;
