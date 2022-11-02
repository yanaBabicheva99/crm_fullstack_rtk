import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { userAPI } from '../newServices/UserServices';


const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer
});


export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPI.middleware)
  })
}