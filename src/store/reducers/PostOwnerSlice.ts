import {IPost} from "../../models/IPost";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchPostsOwner} from "./ActionCreater";


interface PostOwnerState {
    postsOwner: IPost[];
    isLoadingOwner: boolean;
    errorOwner: string
}

const initialState: PostOwnerState = {
    postsOwner: [],
    isLoadingOwner: true,
    errorOwner: ''
}

export const postOwnerSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPostsOwner.pending.type]: (state) => {
            state.isLoadingOwner = true
        },
        [fetchPostsOwner.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoadingOwner = false
            state.errorOwner = ''
            state.postsOwner = action.payload
        },
        [fetchPostsOwner.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoadingOwner = false
            state.errorOwner = action.payload
        },
    }
})

export default postOwnerSlice.reducer