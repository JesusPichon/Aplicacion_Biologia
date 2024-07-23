import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './style-ajustes'
import { useSelector } from 'react-redux'
import { Icon, ButtonGroup, } from 'react-native-elements'
import { setModeTheme } from '../../services/redux/slices/themeSlice'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Ajustes = ({ navigation }) => {
  const {currentTheme, themes, modeTheme} = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const theme = themes[currentTheme] || themes.light;
  const {  
    colorPrimario,
    colorSecundario,
    colorTerciario,
    colorCuaternario,
    colorQuinario,
  } = theme;

  const themeOptions = ['light', 'dark', 'system'];
  const [selectedIndex, setSelectedIndex] = useState(themeOptions.indexOf(currentTheme));

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        dispatch(setModeTheme(storedTheme));
        setSelectedIndex(themeOptions.indexOf(storedTheme));
      }
    };

    loadTheme();
  }, [dispatch]);

  const handleThemeChange = async (value) => {
    const selectedTheme = themeOptions[value];
    await AsyncStorage.setItem('theme', selectedTheme);
    dispatch(setModeTheme(selectedTheme));
    setSelectedIndex(value);
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: colorPrimario}]}>
      <View style={{width: '10%', justifyContent: 'center'}}>
        <Icon
          name="menu"
          type="material"
          color={colorQuinario}
          size={30}
          onPress={() => navigation.openDrawer()}
          containerStyle={{marginVertical: 20, paddingLeft: 15}}
        />
      </View>
      <View
        style={[styles.secondaryContainer, {backgroundColor: colorSecundario}]}>
        <View style={styles.titleContainer}>
          <Text
            style={{fontSize: 30, fontWeight: 'bold', color: colorQuinario}}>
            Ajustes
          </Text>
        </View>
        <View>
          <Text style={{color: colorQuinario, paddingLeft: 25, fontSize: 20}}>
            Tema de la Aplicación
          </Text>
          <ButtonGroup
            buttons={['Claro', 'Oscuro', 'Tema del Sistema']}
            selectedIndex={selectedIndex}
            onPress={handleThemeChange}
            containerStyle={{marginBottom: 20, borderRadius: 25, marginHorizontal: 25, height: 50}}
            textStyle={{fontSize: 16, textAlign: 'center'}}
          />
        </View>
      </View>
    </View>
  );
}

export default Ajustes