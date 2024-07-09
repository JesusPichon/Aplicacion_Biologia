import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
    // Otros configuraciones opcionales aquí
});

export default store;