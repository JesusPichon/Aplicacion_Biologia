import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { cuartoFePro, principal, principalFePro, quintoFePro, secundarioFePro, terceroFePro } from "../../../styles/style-colors";

const lightTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoClaro.jpeg'), // Pantalla de inicio
    logoInicio: require('../../../assets/images/logoClaro.png'), //Pantalla de inicio
    colorStatusBarInicio: '#97b4a5', //Pantalla de inicio
    tabItemSelectColor: terceroFePro, //Pantalla Grupos
    
    colorPrimario: quintoFePro,
    colorSecundario: cuartoFePro,
    colorTerciario: terceroFePro,
    colorCuaternario: secundarioFePro,
    colorQuinario: principalFePro,
};
    
const darkTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoOscuro.jpeg'),
    logoInicio: require('../../../assets/images/logoOscuro.png'),
    colorStatusBarInicio: '#203c3b',
    tabItemSelectColor: principalFePro,

    colorPrimario: principalFePro,
    colorSecundario: secundarioFePro,
    colorTerciario: terceroFePro,
    colorCuaternario: cuartoFePro,
    colorQuinario: quintoFePro,
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