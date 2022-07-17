import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import NewsSlice from "../../pages/home/slice/HomeSlice";

const rootReducer= combineReducers({
  newsData:NewsSlice
});
const persistConfig = {
    key: 'root',
    storage:storage,
    whitelist: ['newsData'],
  };
const persistedReducer = persistReducer(persistConfig,rootReducer);
export default persistedReducer