import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch items from backend
export const fetchItems = createAsyncThunk('items/fetch', async () => {
    const [drinks, starters, mains] = await Promise.all([
        axios.get('/drink-item'),
        axios.get('/starter-item'),
        axios.get('/main-course-item'),
    ]);
    return {
        drinks: drinks.data,
        starters: starters.data,
        mains: mains.data,
    };
});

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        drinks: [],
        starters: [],
        mains: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.drinks = action.payload.drinks;
                state.starters = action.payload.starters;
                state.mains = action.payload.mains;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default itemsSlice.reducer;
