import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import updateReducer from './slices/updateSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        update: updateReducer,
    },
    // Otros configuraciones opcionales aquí
});

export default store;