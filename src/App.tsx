import React from 'react';

import Inicio from './screens/inicio';
import Formulario from './screens/formulario';
import InformacionToma from './screens/info';
import Grupos from './screens/grupos';
import Tomas from './screens/tomas';
import TomasExplorar from './screens/tomasExplorar';
import Editar from './screens/editar';
import FAQ from './screens/FAQ/screen-FAQ';
import CamposPred from './screens/campos-predeterminados/screen-camposPred';
import Ajustes from './screens/ajustes';
import Explorar from './screens/explorar';
import Login from './screens/login';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { CacheProvider } from './services/storage/CacheContext';
import { Provider } from 'react-redux';
import store from './services/redux/store';
import   CustomDrawer  from './components/Drawer/customDrawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MisGruposStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Grupos" component={Grupos} />
    <Stack.Screen name="Formulario" component={Formulario} />
    <Stack.Screen name="InformacionToma" component={InformacionToma} />
    <Stack.Screen name="Tomas" component={Tomas} />
    <Stack.Screen name="Editar" component={Editar} />
    <Stack.Screen name="CamposPred" component={CamposPred}/>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const ExplorarStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="ExplorarScreen" component={Explorar} />
    <Drawer.Screen name="TomasExplorar" component={TomasExplorar} />
    {/* Aqui van el resto de pantallas para ver contenido del servidor */}
  </Stack.Navigator>
);

// Drawer Navigation
const HomeDrawer = () => (
  <Drawer.Navigator 
    initialRouteName="MisGrupos" 
    screenOptions={{ headerShown: false, drawerStyle: {borderBottomRightRadius: 20, borderTopRightRadius: 20,}}}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="MisGrupos" component={MisGruposStack} />
    <Drawer.Screen name="Explorar" component={ExplorarStack} />
    <Drawer.Screen name="Configuracion" component={Ajustes} />
    <Drawer.Screen name="FAQ" component={FAQ} />
  </Drawer.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <CacheProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Home" component={HomeDrawer} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </CacheProvider>
    </Provider>
  );
};

export default App;
