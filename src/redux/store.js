import authSlice from './authSlice';
import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';

const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
        auth: authSlice.reducer,
    },
});

export default store;
