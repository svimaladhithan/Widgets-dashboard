import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboardSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root",
    storage,
    version: 1,
  };
  const persistedReducer = persistReducer(persistConfig, dashboardReducer);

export const store= configureStore({
    reducer:{
        dashboard: persistedReducer,
    }
})

export const persistor = persistStore(store);