import { configureStore } from "@reduxjs/toolkit";
import departamentosReducer from "../features/departamentosSlice";
import categoriasReducer from "../features/categoriasSlice";
import eventosReducer from "../features/eventosSlice";

export const store = configureStore ({
    reducer: {
        departamentos: departamentosReducer,
        categorias: categoriasReducer,
        eventos: eventosReducer
    }
})