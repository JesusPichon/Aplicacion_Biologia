import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

const lightTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoClaro.jpeg'),
    logoInicio: require('../../../assets/images/logoClaro.png'),
    colorStatusBarInicio: '#97b4a5',
};
    
const darkTheme = {
    imageBackgroundInicio: require('../../../assets/images/fondoOscuro.jpeg'),
    logoInicio: require('../../../assets/images/logoOscuro.png'),
    colorStatusBarInicio: '#203c3b',
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