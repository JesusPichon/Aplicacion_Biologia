import {useSelector, useDispatch} from 'react-redux';
import Nosotros from '../../components/FAQ/Nosotros';
import {
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  Image,
  StyleSheet,
  useWindowDimensions
} from 'react-native';

const FAQ = ({navigation}) => {
  const systemTheme = useColorScheme();

  const {currentTheme, themes, modeTheme} = useSelector(state => state.theme);
  const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
  const {
    logoInicio,
    logoJardin,
    colorPrimario,
    colorSecundario,
    colorTerciario,
    colorCuaternario,
    colorQuinario,
  } = theme;

  const { width, height } = useWindowDimensions();

  const localStyles = StyleSheet.create({
    imagenBackground: {
      opacity: 0.1,
      height: height,
      width: width,
      position: 'absolute',
      top: 30,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorPrimario,
      }}>
      <StatusBar
        barStyle={currentTheme === 'light' ? 'dark-content' : 'light-content'}
        animated={true}
        backgroundColor={colorPrimario}
      />
      <Image style={localStyles.imagenBackground} source={logoJardin} />

      <SafeAreaView>
        <ScrollView>
          {/* quienes somos */}
          <View>
            <Nosotros navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default FAQ;
