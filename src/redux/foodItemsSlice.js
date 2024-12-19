import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch items from backend
export const fetchItems = createAsyncThunk('items/fetch', async () => {
    const [drinks, starters, mains] = await Promise.all([
        axios.get('http://localhost:5000/food-app/drinks'),
        axios.get('http://localhost:5000/food-app/starter'),
        axios.get('http://localhost:5000/food-app/main-course'),
    ]);
    return {
        drinks: drinks.data.map(item => ({
            id: item._id,
            category: item.CategoryName,
            name: item.name,
            img: item.img,
            options: item.options,
            description: item.description,
        })),
        starters: starters.data.map(item => ({
            id: item._id,
            category: item.CategoryName,
            name: item.name,
            img: item.img,
            options: item.options,
            description: item.description,
        })),
        mains: mains.data.map(item => ({
            id: item._id,
            category: item.CategoryName,
            name: item.name,
            img: item.img,
            options: item.options,
            description: item.description,
        }))
    };
});

const foodItemsSlice = createSlice({
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

export default foodItemsSlice.reducer;
