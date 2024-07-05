import { createSlice } from "@reduxjs/toolkit";

initialState = {
    grupos: [],
    nombreGrupos: '',
    listaBorrarGrupos: [],
    isImporting: false,
};

const grupoSlice = createSlice({
    name: 'grupo',
    initialState,
    reducers: {
        setGrupos(state, action) {
            state.grupos = action.payload;
        },
        setNombreGrupos(state, action) {
            state.nombreGrupos = action.payload;
        },
        setListaBorrarGrupos(state, action) {
            state.listaBorrarGrupos = action.payload;
        },
        setIsImporting(state, action) {
            state.isImporting = action.payload;
        },
    },
});

export default grupoSlice.reducer;