import React from 'react';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';

const NoConexion = ({navigation}) => {
  const {currentTheme, themes} = useSelector(state => state.theme);

  const theme = themes[currentTheme] || themes.light;
  const {
    tabItemSelectColor,
    colorPrimario,
    colorSecundario,
    colorTerciario,
    colorCuaternario,
    colorQuinario,
  } = theme;
  return (
    <>
      <View style={{width: '100%', height: 50, flexDirection: 'row'}}>
        <View style={{width: '10%', justifyContent: 'center'}}>
          <Icon
            name="menu"
            type="material"
            color={colorQuinario}
            size={30}
            onPress={() => navigation.openDrawer()}
          />
        </View>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Icon name="wifi-off" size={100} color={colorQuinario} />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            color: colorQuinario,
          }}>
          Error en la conexión
        </Text>
      </View>
    </>
  );
};

export default NoConexion;
