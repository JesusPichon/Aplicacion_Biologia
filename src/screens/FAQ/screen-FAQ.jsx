import { useSelector, useDispatch } from 'react-redux';
import Nosotros from '../../components/FAQ/Nosotros';
import {
    View,
    StatusBar,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    Image,
    StyleSheet,
    Dimensions
} from "react-native";



const FAQ = () => {
    const systemTheme = useColorScheme();

    const { currentTheme, themes, modeTheme } = useSelector((state) => state.theme);
    const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
    const { 
        logoInicio, 
        colorPrimario,
        colorSecundario,
        colorTerciario,
        colorCuaternario,
        colorQuinario,
    } = theme;
    
    const lodoMayor = Dimensions.get('screen').width > Dimensions.get('screen').height ? Dimensions.get('screen').width : Dimensions.get('screen').height;
    const localStyles = StyleSheet.create({
        imagenBackground: {
            opacity:0.1,
            minHeight: lodoMayor,
            minWidth: lodoMayor,
            position: 'absolute',
            top: 30,
            left: 50
        },
    });

    return (
        <View style={
            {
                flex: 1,
                backgroundColor: colorPrimario
            }}>
            <StatusBar
                barStyle={currentTheme === 'light' ? 'dark-content' : 'light-content'}
                animated={true}
                backgroundColor={colorPrimario}
            />
            <Image
                style={localStyles.imagenBackground}
                source={logoInicio}
            />

            <SafeAreaView>
                <ScrollView>
                    {/* quienes somos */}
                    <View>
                        <Nosotros></Nosotros>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default FAQ;