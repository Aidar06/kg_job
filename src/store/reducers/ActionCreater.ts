import {AppDispatch} from "../store";
import axios from "axios";
import {postSlice} from "./PostSlice";
import {IPost} from "../../models/IPost";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";


// export const fetchPosts = () => async (dispatch: AppDispatch) => {
//     try {
//         // @ts-ignore
//         dispatch(postSlice.actions.postsFetching())
//         const response = await axios.get<IPost[]>('http://localhost:5000/api/posts')
//         // @ts-ignore
//         dispatch(postSlice.actions.postsFetchingSuccess(response.data))
//     }catch (e){
//         // @ts-ignore
//         dispatch(postSlice.actions.postsFetchingError('error'))
//     }
// }

export const fetchPosts = createAsyncThunk(
    'post/fetchAll',
    async (_,thankAPI)=> {
        try {
            const response = await axios.get<IPost[]>('http://localhost:5000/api/posts')
            return response.data
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

export const fetchPostsOwner = createAsyncThunk(
    'post/fetchPostOwner',
    async (ownerId,thankAPI)=> {
        try {
            const response = await axios.get<IPost[]>(`http://localhost:5000/api/postsOwner/${ownerId}`)
            return response.data
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchAll',
    async (_,thankAPI)=> {
        try {
            const response = await axios.get<IUser[]>('http://localhost:5000/api/user')
            return response.data
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

export const postUser = createAsyncThunk(
    'user/postUser',
    async (userObj,thankAPI)=> {
        try {
            const response = await axios.post<IUser[]>('http://localhost:5000/api/user', userObj)
            return response.data
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

export const getUserGmail= createAsyncThunk(
    'user/postUser',
    async (gmail,thankAPI)=> {
        try {
            // @ts-ignore
            const response = await axios.get<IUser[]>(`http://localhost:5000/api/userGmail/${gmail}`)
            if (!response.data){
                return false
            }else {
                return response.data
            }
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

export const postJob = createAsyncThunk(
    'post/postJob',
    async (postObj,thankAPI)=> {
        try {
            const response = await axios.post<IUser[]>('http://localhost:5000/api/posts', postObj)
            return response.data
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

export const responseJob = createAsyncThunk(
    'post/responseJob',
    async (responseObj,thankAPI)=> {
        try {
            const response = await axios.put<IPost[]>('http://localhost:5000/api/posts', responseObj)
            return response.data
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

export const jobDelete = createAsyncThunk(
    'post/responseDelete',
    async (jobObj,thankAPI)=> {
        try {
            // @ts-ignore
            const response = await axios.delete<IPost[]>('http://localhost:5000/api/posts', jobObj)
            return response.data
        }catch (e){
            return thankAPI.rejectWithValue('error')
        }
    }
)

