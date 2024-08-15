import React from 'react';
import { View, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import styles from '../../screens/ajustes/style-ajustes';

const ThemeSelector = ({ selectedIndex, handleThemeChange, theme }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={{ color: theme.colorQuinario, fontSize: 20 }}>
        Tema de la Aplicación
      </Text>
      <ButtonGroup
        buttons={['Claro', 'Oscuro', 'Tema del Sistema']}
        selectedIndex={selectedIndex}
        onPress={handleThemeChange}
        containerStyle={styles.ButtonGroupContainer}
        textStyle={styles.ButtonGroupText}
        selectedButtonStyle={{backgroundColor: theme.colorTerciario}}
      />
    </View>
  );
};

export default ThemeSelector;
