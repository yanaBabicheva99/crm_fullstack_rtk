import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {productsAPI} from '../newServices/ProductServices'
import { userAPI } from '../newServices/UserServices';

const rootReducer = combineReducers({
  [productsAPI.reducerPath]: productsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer

});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([userAPI.middleware, productsAPI.middleware])
  })
}


