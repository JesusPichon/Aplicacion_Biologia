import { createSlice, current } from "@reduxjs/toolkit";
import { Appearance, ImageBackground } from "react-native";

const lightTheme = {
    background: '#f5f5f5',	
    Text: '#000000',
    imageBackground: require('../../../assets/images/fondoClaro.jpeg'),
    logo: require('../../../assets/images/logoClaro.png'),
    colorStatusBar: '#97b4a5',
};
    
const darkTheme = {
    background: '#000000',
    Text: '#ffffff',
    imageBackground: require('../../../assets/images/fondoOscuro.jpeg'),
    logo: require('../../../assets/images/logoOscuro.png'),
    colorStatusBar: '#203c3b',
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
        toggleTheme: (state, action) => {
            state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        },
        updateSystemTheme: (state) => {
            if (state.currentTheme === 'system') {
                state.currentTheme = Appearance.getColorScheme();
            }
        },
    },
});

export const { setTheme, toggleTheme, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;