import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postReducer from "./reducers/PostSlice"
import userReducer from "./reducers/UserSlice"
import accReducer from "./reducers/AccSlice"
import postJobReducer from "./reducers/postJobSlice"
import postOwnerReducer from "./reducers/PostOwnerSlice"
import favoriteReducer from "./reducers/FavoriteSlice"

const rootReducer = combineReducers({
    postReducer,
    userReducer,
    accReducer,
    postJobReducer,
    postOwnerReducer,
    favoriteReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = ReturnType<AppStore["dispatch"]>