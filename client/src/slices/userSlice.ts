import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
  relation: [],
  notification: 0,
  userPost: null
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setRelation: (state, action) => {
      state.relation = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setUserPost: (state, action) => {
      state.userPost = action.payload;
    },
  },
});

export const { setAllUsers, setRelation, setNotification, setUserPost } = userSlice.actions;

export const getAllUsers = (state: any) => state.userInfo.allUsers;
export const getRelation = (state: any) => state.userInfo.relation;
export const getNotification = (state: any) => state.userInfo.notification;
export const getUserPost = (state: any) => state.userInfo.userPost;

export default userSlice.reducer;
