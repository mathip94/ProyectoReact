import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    eventos: []
}

export const eventosSlice = createSlice({
    name: "eventos",
    initialState,
    reducers: {
        guardarEventos: (state,action) => {
            state.eventos = action.payload;
        },
        agregarEventoSlice:(state, action) => {
            state.eventos.push(action.payload);
        },
        borrarEventoSlice:(state,action) => {
            state.eventos = state.eventos.filter(evento => evento.id !== action.payload);
        }
    }
});

export const {guardarEventos,agregarEventoSlice,borrarEventoSlice} = eventosSlice.actions
export default eventosSlice.reducer