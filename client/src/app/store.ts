import { combineReducers, configureStore } from "@reduxjs/toolkit"
import appReducer from "../slices/appSlice";
import userReducer from "../slices/userSlice";
import whitelist from "../slices/whitelist";
import postReducer from "../slices/postSlice";

const reducer = combineReducers({
  app: appReducer,
  userInfo: userReducer,
  whitelist: whitelist,
  postInfo: postReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

