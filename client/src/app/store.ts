import { combineReducers, configureStore } from "@reduxjs/toolkit"
import appReducer from "../slices/appSlice";
import userReducer from "../slices/userSlice";
import whitelist from "../slices/whitelist";

const reducer = combineReducers({
  app: appReducer,
  userInfo: userReducer,
  whitelist: whitelist
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

