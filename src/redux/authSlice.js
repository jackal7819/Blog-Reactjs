import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../axios';

export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/login', params);

            if ('token' in data) {
                return data;
            } else {
                return rejectWithValue({
                    error: { message: 'Invalid email or password' },
                });
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            throw error;
        }
    }
);

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/auth/register', params);

            if ('token' in data) {
                return data;
            } else {
                return rejectWithValue({
                    error: { message: 'Registration failed' },
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.status = 'failed';
            state.data = null;
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.status = 'failed';
            state.data = null;
        });
        builder.addCase(fetchRegister.pending, (state) => {
            state.status = 'loading';
            state.data = null;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.status = 'failed';
            state.data = null;
        });
    },
});

export const handlerAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
export default authSlice;
