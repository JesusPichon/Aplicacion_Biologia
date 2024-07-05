import { configureStore } from '@reduxjs/toolkit';
import grupoReducer from './grupoSlice';

const store = configureStore({
    
    // Otros configuraciones opcionales aquí
});

export default store;