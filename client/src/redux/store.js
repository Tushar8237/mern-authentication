import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import  userReducer  from "./user-slice/user"



const rootReducer = combineReducers({
    user: userReducer
})

const persistConfig = {
    key : 'root',
    version : 1,
    storage
}

const persistReducers = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)