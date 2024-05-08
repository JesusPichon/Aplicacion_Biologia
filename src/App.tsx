import React, { useEffect } from "react";
import Inicio from "./screens/inicio";
import Formulario from "./screens/formulario";
import InformacionToma from "./screens/info";
import Grupos from "./screens/grupos";
import Tomas from "./screens/tomas";
import Editar from "./screens/editar";
import FAQ from "./screens/FAQ/screen-FAQ";
import CamposPred from "./screens/campos-predeterminados/screen-camposPred";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CacheProvider } from "./services/storage/CacheContext";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CacheProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="Formulario" component={Formulario} />
          <Stack.Screen name="Tomas" component={Tomas} />
          <Stack.Screen name="InformacionToma" component={InformacionToma} />
          <Stack.Screen name="Grupos" component={Grupos} />
          <Stack.Screen name="Editar" component={Editar} />
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="CamposPred" component={CamposPred}/>
        </Stack.Navigator>
      </NavigationContainer>
    </CacheProvider>
    
  );
}


export default App;