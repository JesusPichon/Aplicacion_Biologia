import { View, Text, TouchableOpacity, ImageBackground, useColorScheme } from "react-native";
import styles from "../../styles/style-app";
import stylesCanales from "../../screens/grupos/style-canales";
import { useEffect, useState } from "react";
import { principal, principalFePro, quintoFePro, secundarioFePro, terceropFePro } from "../../styles/style-colors";
import { CheckBox, Chip } from "@rneui/themed";
import { useSelector } from "react-redux";

const Grupo = ({ navigation, nombre, deseleccionar, seleccionar, mostrarSeleccionar, exportando, seleccionarGrupoExportar }) => {
  const {currentTheme, themes} = useSelector((state) => state.theme);

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

  const theme = themes[currentTheme] || themes[systemTheme] || themes.light;
  const { nombreViewBackgroundColor, nombreViewTextColor, tomasViewBackgroundColor, tomasViewTextColor, } = theme;

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