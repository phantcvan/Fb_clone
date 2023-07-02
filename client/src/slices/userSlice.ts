import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
  user: null,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { setAllUsers, setUser, logout, } = userSlice.actions;

export const getAllUsers = (state: any) => state.userInfo.allUsers;
export const getUser = (state: any) => state.userInfo.user;

export default userSlice.reducer;
