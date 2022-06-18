import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apikey = "s4AO7mf2sN1KyMaGav5kBSmreyh4FYX0"

export const getUsdCurrency = createAsyncThunk(
    '@@currency/get-usd-currency',
    async () => {
        const res = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=UAH', {
        method: 'GET',    
        headers: {
                "apikey" : apikey
            },
        });
        const data = await res.json();
        return data;
    }
);

export const getEurCurrency = createAsyncThunk(
    '@@currency/get-eur-currency',
    async () => {
        const res = await fetch('https://api.apilayer.com/exchangerates_data/latest?base=EUR&symbols=UAH', {
        method: 'GET',    
        headers: {
                "apikey" : apikey
            },
        });
        const data = await res.json();
        return data;
    }
);

export const convertCurrency = createAsyncThunk(
    '@@currency/convert',
    async (arg) => {
        const {toCurrency, fromCurrency, amount} = arg;
        const res = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, {
            method: 'GET',    
            headers: {
                    "apikey" : apikey
                },
            });
            const data = await res.json();
            return data;
    }
)

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        eur: null,
        usd: null,
        convert: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getUsdCurrency.pending, (state) => {
            state.loading = true;
        })
        .addCase(getUsdCurrency.fulfilled, (state, action) => {
            state.loading = false;
            state.usd = action.payload.rates.UAH;
        })
        .addCase(getUsdCurrency.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Something went wrong' || action.payload;
        })
        .addCase(getEurCurrency.pending, (state) => {
            state.loading = true;
        })
        .addCase(getEurCurrency.fulfilled, (state, action) => {
            state.loading = false;
            state.eur = action.payload.rates.UAH;
        })
        .addCase(getEurCurrency.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Something went wrong' || action.payload;
        })
        .addCase(convertCurrency.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(convertCurrency.fulfilled, (state, action) => {
            state.loading = false;
            state.convert = action.payload.result;
        })
        .addCase(convertCurrency.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Something went wrong' || action.payload;
        })
    }
})

export const {changeConvertAmount} = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;