import { combineReducers, configureStore } from "@reduxjs/toolkit"
import appReducer from "../slices/appSlice";
import userReducer from "../slices/userSlice";

const reducer = combineReducers({
  app: appReducer,
  userInfo: userReducer,
});

export const store= configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

