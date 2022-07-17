

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import persistedReducer from "./reducers";

const store = configureStore({
  reducer: persistedReducer, middleware: [
    ...getDefaultMiddleware({ serializableCheck: false })
  ],
  devTools: true,
})


export default store;