import { configureStore } from "@reduxjs/toolkit";
import { currencyReducer } from "./features/currency-slice";

export const store = configureStore({
    reducer: {
        currency: currencyReducer,
    }
})