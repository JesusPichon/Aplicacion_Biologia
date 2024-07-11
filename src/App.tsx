//Navegacion Original

// import React, { useEffect } from "react";
// import Prueba from "./screens/prueba";
// import Inicio from "./screens/inicio";
// import Formulario from "./screens/formulario";
// import InformacionToma from "./screens/info";
// import Grupos from "./screens/grupos";
// import Tomas from "./screens/tomas";
// import Editar from "./screens/editar";
// import FAQ from "./screens/FAQ/screen-FAQ";
// import CamposPred from "./screens/campos-predeterminados/screen-camposPred";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { CacheProvider } from "./services/storage/CacheContext";
// import { Provider } from "react-redux";
// import store from "./services/redux/store";


// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <Provider store={store}>
//       <CacheProvider>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             {/* <Stack.Screen name="Prueba" component={Prueba} /> */}
//             <Stack.Screen name="Inicio" component={Inicio} />
//             <Stack.Screen name="Formulario" component={Formulario} />
//             <Stack.Screen name="Tomas" component={Tomas} />
//             <Stack.Screen name="InformacionToma" component={InformacionToma} />
//             <Stack.Screen name="Grupos" component={Grupos} />
//             <Stack.Screen name="Editar" component={Editar} />
//             <Stack.Screen name="FAQ" component={FAQ} />
//             <Stack.Screen name="CamposPred" component={CamposPred}/>
//           </Stack.Navigator>
//         </NavigationContainer>
//       </CacheProvider>
//     </Provider>
//   );
// }

// export default App;

// Implementacion de Navegacion con componente Drawer

import React from 'react';

import Inicio from './screens/inicio';
import Formulario from './screens/formulario';
import InformacionToma from './screens/info';
import Grupos from './screens/grupos';
import Tomas from './screens/tomas';
import Editar from './screens/editar';
import FAQ from './screens/FAQ/screen-FAQ';
import CamposPred from './screens/campos-predeterminados/screen-camposPred';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CacheProvider } from './services/storage/CacheContext';
import { Provider } from 'react-redux';
import store from './services/redux/store';

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
  </Stack.Navigator>
);

// Drawer Navigation
const HomeDrawer = () => (
  <Drawer.Navigator initialRouteName="MisGrupos" screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="MisGrupos" component={MisGruposStack} />
    {/* <Drawer.Screen name="Explorar" component={ExplorarStack} /> */}
    {/* <Drawer.Screen name="Configuracion" component={Configuracion} /> */}
    <Drawer.Screen name="FAQ" component={FAQ} />
    {/* <Drawer.Screen name="AcercaDe" component={AcercaDe} /> */}
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
          </Stack.Navigator>
        </NavigationContainer>
      </CacheProvider>
    </Provider>
  );
};

export default App;
