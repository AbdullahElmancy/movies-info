import {configureStore} from '@reduxjs/toolkit'
import moveReducer from './movieSlice'
import tokenReducer from './tokenSlice'
export const store = configureStore({
    reducer:{
        moveReducer,
        tokenReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

