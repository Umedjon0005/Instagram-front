import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    like: false
}

const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        getLike: (state) => {
            if(state.like) {
                state.like = false
            } else {
                state.like = true
            }
        }
    }
})
export const selectIsLike = state => Boolean(state.like);
export const { getLike } = likeSlice.actions;
export default likeSlice.reducer