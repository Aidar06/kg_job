import {IPost} from "../../models/IPost";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUser} from "./ActionCreater";


interface UserState {
    favorite: IPost[];
}


const initialState: UserState = {
    // @ts-ignore
    favorite: JSON.parse(localStorage.getItem('jobsFavorite')) || [],
}

export const favoriteSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addFavorite(state, action: PayloadAction<IPost>){
            const favoriteOgj = [...state.favorite, action.payload]
            // @ts-ignore
            localStorage.setItem('jobsFavorite',JSON.stringify(favoriteOgj))
            // @ts-ignore
            state.favorite = JSON.parse(localStorage.getItem('jobsFavorite'))
        },
        removeFavorite(state, action: PayloadAction<IPost>){
            // @ts-ignore
            const favoriteOgj = state.favorite.filter(el=> el['_id'] !== action.payload['_id'])
            // @ts-ignore
            localStorage.setItem('jobsFavorite',JSON.stringify(favoriteOgj))
            // @ts-ignore
            state.favorite = JSON.parse(localStorage.getItem('jobsFavorite'))
        }
    }
})

export default favoriteSlice.reducer