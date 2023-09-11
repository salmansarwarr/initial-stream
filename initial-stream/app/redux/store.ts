'use client'

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import { configureStore } from "@reduxjs/toolkit"
import netflixReducer from "./slices/netflixSlice" 
import iCloudReducer from "./slices/iCloudSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        netflixReducer,
        iCloudReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;