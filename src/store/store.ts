import {configureStore} from '@reduxjs/toolkit'
import tokenReducer from './tokenSlice'
import { showsApi } from './shows'
export const store = configureStore({
    reducer:{
        tokenReducer,
        [showsApi.reducerPath]: showsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(showsApi.middleware),
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

