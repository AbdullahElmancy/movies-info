import {configureStore} from '@reduxjs/toolkit'
import moveReducer from './movieSlice'
export const store = configureStore({
    reducer:{
        moveReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

