import { View, Text, TouchableOpacity, ImageBackground, useColorScheme } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useEffect, useState } from "react";
import { principal, principalFePro, quintoFePro, secundarioFePro, terceropFePro } from "../../styles/style-colors";
import { CheckBox, Chip } from "@rneui/themed";

const Grupo = ({ navigation, nombre, deseleccionar, seleccionar, mostrarSeleccionar, exportando, seleccionarGrupoExportar }) => {
  const systemTheme = useColorScheme(); // Obtiene el tema actual del sistema ('light' o 'dark')
  const [theme, setTheme] = useState(systemTheme); // Estado para manejar el tema de la app

  useEffect(() => {
    // Este efecto se ejecuta cuando cambia la preferencia de tema del sistema.
    setTheme(systemTheme);
  }, [systemTheme]); // Dependencias: se vuelve a ejecutar el efecto si systemTheme cambia.

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
  }, [mostrarSeleccionar]);

  const handleSeleccionarGrupo = () => {
    if (mostrarSeleccionar == true && !exportando) {
      if (checked) {
        deseleccionar(nombre);
      } else {
        seleccionar(nombre);
      }
      setChecked(!checked);
    } else if (exportando) {
      seleccionarGrupoExportar(nombre);
      setChecked(false); // Ocultar las casillas de selección
    }

    if (!mostrarSeleccionar) navigation.navigate('Tomas', {nombre});
  };

  const nombreViewBackgroundColor = theme === 'dark' ? principalFePro : terceropFePro;
  const nombreViewTextColor = theme === 'dark' ? quintoFePro : principalFePro;

  const tomasViewBackgroundColor = theme === 'dark' ? terceropFePro : principalFePro;
  const tomasViewTextColor = theme === 'dark' ? secundarioFePro : quintoFePro;

  return (
    <TouchableOpacity style={stylesCanales.cardVertical} onPress={handleSeleccionarGrupo}>
      <ImageBackground
        source={require('../../assets/images/nature.jpg')}
        resizeMode="cover"
        style={stylesCanales.image}
      />
      <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
        <View style={[stylesCanales.nombreView, {backgroundColor: nombreViewBackgroundColor}]}>
          <Text style={[stylesCanales.nombreViewText, {color: nombreViewTextColor} ]}>
            {nombre}
          </Text>
          <Chip
            icon={{
              name: 'file-upload',
              type: 'material',
              size: 25,
              color: 'white',
            }}
            onPress={() => console.log('Icon chip was pressed!')}
            buttonStyle={{backgroundColor: principal}}
          />
        </View>
        <View style={[stylesCanales.tomasView, {backgroundColor: tomasViewBackgroundColor}]}>
          <Text style={[stylesCanales.tomasViewText, {color: tomasViewTextColor}]}>Tomas: 300</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Grupo;