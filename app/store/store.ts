import { configureStore } from '@reduxjs/toolkit'
import { useDispatch,TypedUseSelectorHook, useSelector } from 'react-redux'
import {cartSlice} from './features/cartSlice'
import storage from "redux-persist/lib/storage"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  cart: cartSlice.reducer
})


const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
     middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch:() => AppDispatch = useDispatch

export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector
