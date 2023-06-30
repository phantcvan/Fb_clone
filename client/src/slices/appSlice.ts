import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWidth: null,
  showMess: 0,
  showCmt: 0,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentWidth: (state, action) => {
      state.currentWidth = action.payload;
    },
    setShowMess: (state, action) => {
      state.showMess = action.payload;
    },
    setShowCmt: (state, action) => {
      state.showCmt = action.payload;
    },
  },
});

export const { setCurrentWidth, setShowMess, setShowCmt } = appSlice.actions;

export const getCurrentWidth = (state: any) => state.app.currentWidth;
export const getShowMess = (state: any) => state.app.showMess;
export const getShowCmt = (state: any) => state.app.showCmt;

export default appSlice.reducer;
