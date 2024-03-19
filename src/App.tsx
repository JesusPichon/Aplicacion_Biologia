import React from "react";
import Inicio from "./screens/inicio";
import Formulario from "./screens/formulario";
import InformacionToma from "./screens/info";
import Grupos from "./screens/grupos";
import Tomas from "./screens/tomas";
import Editar from "./screens/editar";
import FAQ from "./screens/FAQ/screen-FAQ";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="Tomas" component={Tomas} />
        <Stack.Screen name="InformacionToma" component={InformacionToma} />
        <Stack.Screen name="Grupos" component={Grupos} />
        <Stack.Screen name="Editar" component={Editar} />
        <Stack.Screen name="FAQ" component={FAQ} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;