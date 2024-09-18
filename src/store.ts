import { UnknownAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { tmdbAPI } from "./services/tmdb";
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rickAndMortyApi } from "./services/rickandmorty";


const store = configureStore({
    reducer:{
        [tmdbAPI.reducerPath]: tmdbAPI.reducer,
        [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer 
    },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbAPI.middleware, rickAndMortyApi.middleware)
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    UnknownAction
>;

export type RootState = ReturnType<typeof store.getState>;
export const AppUseDispatch = useDispatch<AppDispatch>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store


