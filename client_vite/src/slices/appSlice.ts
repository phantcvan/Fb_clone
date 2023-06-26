import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWidth: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentWidth: (state, action) => {
      state.currentWidth = action.payload;
    },
  },
});

export const { setCurrentWidth } = appSlice.actions;

export const getCurrentWidth = (state: any) => state.app.currentWidth;

export default appSlice.reducer;
