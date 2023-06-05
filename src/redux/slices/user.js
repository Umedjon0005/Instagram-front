import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import axios from "../../axios";

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
    const {data} = await axios.get('/all');
    return data;
});

const initialState = {
    data: [],
    status: 'loading'
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUser.pending]: (state) => {
            state.status = 'loading';
            state.data = [];
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUser.rejected]: (state) => {
            state.status = 'error';
            state.data = [];
        },
    }
});

export const userReducer = userSlice.reducer;