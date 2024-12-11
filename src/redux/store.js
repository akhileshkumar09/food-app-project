import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice';
// import itemsReducer from './slices/itemsSlice';
// import ordersReducer from './slices/ordersSlice';

const store = configureStore({
    reducer: {
        // user: userReducer,
        // items: itemsReducer,
        // orders: ordersReducer,
    },
});

export default store;
