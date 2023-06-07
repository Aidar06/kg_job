import {IPost} from "../../models/IPost";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser, postJob} from "./ActionCreater";


interface postJobState {
    isLoading: boolean;
    error: string
}

const initialState: postJobState = {
    isLoading: false,
    error: '',
}

export const postJobSlice = createSlice({
    name: 'postJob',
    initialState,
    reducers: {

    },
    extraReducers: {
        [postJob.pending.type]: (state) => {
            state.isLoading = true
        },
        [postJob.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoading = false
            state.error = ''
        },
        [postJob.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default postJobSlice.reducer