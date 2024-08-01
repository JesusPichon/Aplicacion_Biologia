import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
    },
    // Otros configuraciones opcionales aquí
});

export default store;