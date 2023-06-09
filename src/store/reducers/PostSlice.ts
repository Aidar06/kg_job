import {IPost} from "../../models/IPost";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchPosts} from "./ActionCreater";


interface PostState {
    posts: IPost[];
    isLoading: boolean;
    error: string
}

const initialState: PostState = {
    posts: [],
    isLoading: true,
    error: ''
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoading = false
            state.error = ''
            state.posts = action.payload
        },
        [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default postSlice.reducer