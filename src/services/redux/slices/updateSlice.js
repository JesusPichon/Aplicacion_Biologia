import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flagUpdate: false,
};

const updateSlice = createSlice({
    name: "update",
    initialState,
    reducers: {
        setUpdate: (state) => {
            state.flagUpdate = !state.flagUpdate;
        },
    },
});

export const { setUpdate } = updateSlice.actions;

export default updateSlice.reducer;