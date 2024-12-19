import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import foodItemsReducer from './foodItemsSlice';
import orderReducer from './orderSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        items: foodItemsReducer,
        orders: orderReducer,
    },
});

export default store;
