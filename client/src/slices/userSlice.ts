import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
  relation: [],
  notification: 0,
  userPost: null,
  friendRequest: [],
  myRequest: [],
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
    setFriendRequest: (state, action) => {
      state.friendRequest = action.payload;
    },
    setMyRequest: (state, action) => {
      state.myRequest = action.payload;
    },
  },
});

export const { setAllUsers, setRelation, setNotification, setUserPost, setFriendRequest, setMyRequest } = userSlice.actions;

export const getAllUsers = (state: any) => state.userInfo.allUsers;
export const getRelation = (state: any) => state.userInfo.relation;
export const getNotification = (state: any) => state.userInfo.notification;
export const getUserPost = (state: any) => state.userInfo.userPost;
export const getFriendRequest = (state: any) => state.userInfo.friendRequest;
export const getMyRequest = (state: any) => state.userInfo.myRequest;

export default userSlice.reducer;
