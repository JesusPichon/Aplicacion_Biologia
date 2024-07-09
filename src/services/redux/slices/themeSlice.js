import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { cuartoFePro, principal, principalFePro, quintoFePro, secundarioFePro, terceroFePro } from "../../../styles/style-colors";

const lightTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoClaro.jpeg'), // Pantalla de inicio
    logoInicio: require('../../../assets/images/logoClaro.png'), //Pantalla de inicio
    colorStatusBarInicio: '#97b4a5', //Pantalla de inicio
    nombreViewBackgroundColor: terceroFePro, //Componente Grupo
    nombreViewTextColor: principalFePro, //Componente Grupo
    tomasViewBackgroundColor: principalFePro, //Componente Grupo
    tomasViewTextColor: quintoFePro, //Componente Grupo
    mainContainerBackgroundColor: quintoFePro, //Pantalla Grupos
    secondaryContainerBackgroundColor: cuartoFePro, //Pantalla Grupos
    titleColorText: principalFePro, //Pantalla Grupos
    tabItemSelectColor: terceroFePro, //Pantalla Grupos
};
    
const darkTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoOscuro.jpeg'),
    logoInicio: require('../../../assets/images/logoOscuro.png'),
    colorStatusBarInicio: '#203c3b',
    nombreViewBackgroundColor: principalFePro,
    nombreViewTextColor: quintoFePro,
    tomasViewBackgroundColor: terceroFePro,
    tomasViewTextColor: secundarioFePro,
    mainContainerBackgroundColor: principalFePro,
    secondaryContainerBackgroundColor: secundarioFePro,
    titleColorText: quintoFePro,
    tabItemSelectColor: principalFePro,
};

initialState = {
    currentTheme: 'system',
    themes: {
        light: lightTheme,
        dark: darkTheme,
    },
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.currentTheme = action.payload;
        },
        toggleTheme: (state) => {
            if (state.currentTheme === 'light') {
              state.currentTheme = 'dark';
            } else if (state.currentTheme === 'dark') {
              state.currentTheme = 'light';
            } else {
              state.currentTheme = Appearance.getColorScheme() === 'light' ? 'dark' : 'light';
            }
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;