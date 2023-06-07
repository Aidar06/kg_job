import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getUserGmail, postUser} from "./ActionCreater";


interface AccState {
    isLoading: boolean;
    error: string
    inAcc: boolean
    user: object
    userCheck: boolean | string
}

const storedUser = localStorage.getItem('kgJobAccUser');
const storedInAcc = localStorage.getItem('kgJobAccIn');
const initialState: AccState = {
    user: storedUser ? JSON.parse(storedUser) : {},
    userCheck: 'no acc',
    isLoading: false,
    error: '',
    inAcc: storedInAcc ? JSON.parse(storedInAcc) : false,
}

export const accSlice = createSlice({
    name: 'acc',
    initialState,
    reducers: {
        logInAcc(state){
            localStorage.setItem('kgJobAccIn', JSON.stringify(true))
            // @ts-ignore
            state.inAcc = JSON.parse(localStorage.getItem('kgJobAccIn'))
        }
    },
    extraReducers: {
        [postUser.pending.type]: (state) => {
            state.isLoading = true
        },
        [postUser.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false
            localStorage.setItem('kgJobAccIn', JSON.stringify(true))
            // @ts-ignore
            state.inAcc = JSON.parse(localStorage.getItem('kgJobAccIn'))
            state.error = ''
            localStorage.setItem('kgJobAccUser', JSON.stringify(action.payload))
            console.log(action.payload)
            // @ts-ignore
            state.user = JSON.parse(localStorage.getItem('kgJobAccUser'))
        },
        [postUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

        [getUserGmail.pending.type]: (state) => {
            state.isLoading = true
        },
        [getUserGmail.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false
            // @ts-ignore
            if (action.payload){
                localStorage.setItem('kgJobAccUser', JSON.stringify(action.payload))
                // @ts-ignore
                state.user = JSON.parse(localStorage.getItem('kgJobAccUser'))
                state.userCheck = true
            } else {
                state.userCheck = action.payload
            }

            state.error = ''
        },
        [getUserGmail.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export default accSlice.reducer