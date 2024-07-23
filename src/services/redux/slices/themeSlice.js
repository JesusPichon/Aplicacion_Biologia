import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";
import { cuartoFePro, principal, principalFePro, quintoFePro, secundarioFePro, terceroFePro } from "../../../styles/style-colors";
import { set } from "react-hook-form";

const lightTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoClaro.jpeg'), // Pantalla de inicio
    logoInicio: require('../../../assets/images/logoClaro.png'), //Pantalla de inicio
    colorStatusBarInicio: '#97b4a5', //Pantalla de inicio
    tabItemSelectColor: terceroFePro, //Pantalla Grupos
    
    colorPrimario: quintoFePro,         //'#eff3f4'
    colorSecundario: cuartoFePro,       //'#306d6f'
    colorTerciario: terceroFePro,       //'#1a4d4d'
    colorCuaternario: secundarioFePro,  //'#2e3b3b'
    colorQuinario: principalFePro,      //'#1e2d2d'
};
    
const darkTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoOscuro.jpeg'),
    logoInicio: require('../../../assets/images/logoOscuro.png'),
    colorStatusBarInicio: '#203c3b',
    tabItemSelectColor: principalFePro,

    colorPrimario: principalFePro,      //'#1e2d2d'
    colorSecundario: secundarioFePro,   //'#2e3b3b'
    colorTerciario: terceroFePro,       //'#1a4d4d'
    colorCuaternario: cuartoFePro,      //'#306d6f'
    colorQuinario: quintoFePro,         //'#eff3f4'
};

initialState = {
    modeTheme: 'system',
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
        setModeTheme: (state, action) => {
            state.modeTheme = action.payload;
            if (action.payload === 'system') {
                state.currentTheme = Appearance.getColorScheme();
            } else {
                state.currentTheme = action.payload;
            }
        },
        setTheme: (state, action) => {
            state.currentTheme = action.payload;
        },
        toggleTheme: (state) => {
            if (state.modeTheme !== 'system') {
                state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
                state.modeTheme = state.currentTheme;
            }
        },
    },
});

export const { setModeTheme, setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;