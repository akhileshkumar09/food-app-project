import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to post an order
export const placeOrder = createAsyncThunk('orders/placeOrder', async (order) => {
    const response = await axios.post('http://localhost:5000/orders', order);
    return response.data; // Returns created order details
});

export const userOrders = createAsyncThunk(
    'orders/fetchOrdersByEmail',
    async (email, { rejectWithValue }) => {
      try {
        const response = await axios.get('http://localhost:5000/orders', {
          params: { email }, // Pass email as a query parameter
        });
        return response.data; // Return the array of orders
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || 'Failed to fetch orders'
        );
      }
    }
  );

// Async thunk for deleting an order
export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/orders/${orderId}`);
      return response.data; // Return deleted order details
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);  

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders.push(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(userOrders.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(userOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload; // Update state with fetched orders
              })
              .addCase(userOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Store the error message
              })
              .addCase(deleteOrder.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(deleteOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Remove the deleted order from the state
                state.orders = state.orders.filter((order) => order._id !== action.meta.arg);
              })
              .addCase(deleteOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to delete order';
              });
    },
});

export default orderSlice.reducer;
