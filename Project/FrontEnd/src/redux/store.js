import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice.js';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import { PersistGate } from 'redux-persist/integration/react'




const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootReducer = combineReducers(
{ 
    //- We get the user details after login from 'userReducer' and then we put this values in 'user'
    //- This 'userReducer' will contain (currentUser, loading, error) which are the details in 'initailState' object in 'userSlice.js' file
    user: userReducer
}
);


// Here we combine the 'rootReducer' with 'persistConfig' now we can pass  'persistedReducer' to the 'reducer'
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>   //To pass the 'persistedReducer' otherwise it will give an error. JUST USE IT AS IT IS
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

});
/** How it works
-- user
---- currentUser, loading, error
*/


export const persistor = persistStore(store)
