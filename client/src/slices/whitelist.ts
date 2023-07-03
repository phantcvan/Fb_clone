import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const whitelist = createSlice({
  name: "whitelist",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },

  },
});

export const { setUser, logout } = whitelist.actions;

export const getUser = (state: any) => state.whitelist.user;

export default whitelist.reducer;
