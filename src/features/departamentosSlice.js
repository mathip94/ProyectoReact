import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    departamentos: [],
    ciudades:[]
}

export const departamentosSlice = createSlice({
    name: "departamentos",
    initialState,
    reducers: {
        guardarDepartamentos: (state,action) => {
            state.departamentos = action.payload;
        },
        guardarCiudades: (state, action) => {
            state.ciudades = action.payload;
        }
    }
});

export const {guardarDepartamentos, guardarCiudades} = departamentosSlice.actions
export default departamentosSlice.reducer