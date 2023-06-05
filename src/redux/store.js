import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts.js";
import { authReducer } from "./slices/auth.js";
import commentSlice from "./slices/comment.js";
import likeSlice from './slices/like.js'
import { userReducer } from "./slices/user.js";


const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comment: commentSlice,
        like: likeSlice,
        user: userReducer
    }
});

export default store;