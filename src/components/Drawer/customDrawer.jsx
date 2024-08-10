// CustomDrawer.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import { quintoFePro, principalFePro } from '../../styles/style-colors';
import { logoutUser } from '../../services/auth/AuthFunctions';

const CustomDrawer = (props) => {
  const {themes, currentTheme} = useSelector(state => state.theme);
  dispatch = useDispatch();

  const theme = themes[currentTheme] || themes.light;
  const { 
    colorPrimario,
    colorSecundario,
    colorTerciario,
    colorCuaternario,
    colorQuinario,
    logoInicio,
  } = theme;

  const { routeNames, index } = props.state;
  const focused = routeNames[index];

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      props.navigation.closeDrawer();
      props.navigation.popToTop('Inicio');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle the error here, e.g. show an error message to the user
    }
  };

  const { isAuthenticated, loading, error, token } = useSelector((state) => state.auth);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: colorPrimario,
        height: '100%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
      }}>
      {/* Imagen en la parte superior */}
      <View style={{marginHorizontal: 10, alignItems: 'left'}}>
        <Image source={logoInicio} style={{width: 90, height: 90}} />
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <DrawerItem
          label="Mis Grupos"
          onPress={() => {
            props.navigation.navigate('MisGrupos');
          }}
          focused={focused === 'MisGrupos'}
          icon={({focused, color, size}) => (
            <Icon name="home" type="material" color={color} size={40} />
          )}
          activeBackgroundColor={colorQuinario}
          activeTintColor={colorPrimario}
          inactiveTintColor={colorQuinario}
          style={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            marginHorizontal: 0,
          }}
        />
        <DrawerItem
          label="FAQ"
          onPress={() => {
            props.navigation.navigate('FAQ');
          }}
          focused={focused === 'FAQ'}
          icon={({focused, color, size}) => (
            <Icon name="explore" type="material" color={color} size={40} />
          )}
          activeBackgroundColor={colorQuinario}
          activeTintColor={colorPrimario}
          inactiveTintColor={colorQuinario}
          style={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            marginHorizontal: 0,
          }}
        />
        <DrawerItem
          label="Configuración"
          onPress={() => {
            props.navigation.navigate('Configuracion');
          }}
          focused={focused === 'Configuracion'}
          icon={({focused, color, size}) => (
            <Icon name="settings" type="material" color={color} size={40} />
          )}
          activeBackgroundColor={colorQuinario}
          activeTintColor={colorPrimario}
          inactiveTintColor={colorQuinario}
          style={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderTopLeftRadius: 0,
            marginHorizontal: 0,
          }}
        />
        {isAuthenticated && (
          <>
            <DrawerItem
              label="Explorar"
              onPress={() => {
                props.navigation.navigate('Explorar');
              }}
              focused={focused === 'Explorar'}
              icon={({focused, color, size}) => (
                <Icon name="search" type="material" color={color} size={40} />
              )}
              activeBackgroundColor={colorQuinario}
              activeTintColor={colorPrimario}
              inactiveTintColor={colorQuinario}
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                marginHorizontal: 0,
              }}
            />
            <DrawerItem
              label="Salir"
              onPress={() => {
                handleLogout();
              }}
              focused={focused === 'Salir'}
              icon={({focused, color, size}) => (
                <Icon name="logout" type="material" color={color} size={40} />
              )}
              activeBackgroundColor={colorQuinario}
              activeTintColor={colorPrimario}
              inactiveTintColor={colorQuinario}
              style={{
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                marginHorizontal: 0,
              }}
            />
          </>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
