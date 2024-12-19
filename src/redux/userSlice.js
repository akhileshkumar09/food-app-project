import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState =  {
  user: null,
  token: localStorage.getItem('authToken') || null,
  status: 'idle',
  error: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // This should return the user object (name, email, etc.)
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch user');
    }
  }
);


// Async thunk to handle signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/signup', userData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { token } = response.data;

      // Save token to local storage
      localStorage.setItem('authToken', token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/login', credentials); 
    const { token, user } = response.data;

    localStorage.setItem('authToken', token);

    return { token, user }; 
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Login failed');
  }
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('authToken'); // Clear token on logout

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                console.error('Signup error:', action.payload || action.error.message);
            })
            .addCase(signupUser.pending, (state) => {
              state.status = 'loading'; // Set status to loading when the request is in progress
            })
            .addCase(signupUser.fulfilled, (state, action) => {
              state.status = 'succeeded'; // Set status to succeeded when request is successful
              state.token = action.payload.token;
              state.user = action.payload.user;
            })
            .addCase(signupUser.rejected, (state, action) => {
              state.status = 'failed'; // Set status to failed if an error occurs
              state.error = action.payload?.message || action.error.message; // Set the error message
            })
            .addCase(fetchUser.pending, (state) => {
              state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
