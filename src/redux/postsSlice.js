import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchSortedPosts = createAsyncThunk(
    'posts/fetchSortedPosts',
    async (sortBy) => {
        try {
            const { data } = await axios.get(`/posts/${sortBy}`);
            return data;
        } catch (error) {
            throw new Error('Error fetching sorted posts');
        }
    }
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk(
    'posts/fetchRemovePost',
    async (id) => await axios.delete(`/posts/${id}`)
);

const initialState = {
    posts: { items: [], sortBy: 'new', status: 'loading' },
    tags: { items: [], status: 'loading' },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.posts.sortBy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.status = 'succeeded';
            state.posts.items = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.posts.status = 'failed';
            state.posts.items = [];
        });
        builder.addCase(fetchSortedPosts.pending, (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        });
        builder.addCase(fetchSortedPosts.fulfilled, (state, action) => {
            state.posts.status = 'succeeded';
            state.posts.items = action.payload;
        });
        builder.addCase(fetchSortedPosts.rejected, (state) => {
            state.posts.status = 'failed';
            state.posts.items = [];
        });
        builder.addCase(fetchTags.pending, (state) => {
            state.tags.status = 'loading';
            state.tags.items = [];
        });
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.status = 'succeeded';
            state.tags.items = action.payload;
        });
        builder.addCase(fetchTags.rejected, (state) => {
            state.tags.status = 'failed';
            state.tags.items = [];
        });
        builder.addCase(fetchRemovePost.pending, (state, action) => {
            state.posts.items = state.posts.items.filter(
                (obj) => obj._id !== action.meta.arg
            );
        });
    },
});

export const postsActions = postsSlice.actions;
export default postsSlice;
