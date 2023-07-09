import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWidth: null,
  showMess: 0,
  showCmt: 0,
  goHome: false,
  hadNew: 0,
  searchQuery:"",
  // actionPost: 0,
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
    setGoHome: (state, action) => {
      state.goHome = action.payload;
    },
    setHadNew: (state, action) => {
      state.hadNew = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    // setActionPost: (state, action) => {
    //   state.actionPost = action.payload;
    // },
  },
});

export const { setCurrentWidth, setShowMess, setShowCmt, setGoHome, setHadNew, setSearchQuery } = appSlice.actions;

export const getCurrentWidth = (state: any) => state.app.currentWidth;
export const getShowMess = (state: any) => state.app.showMess;
export const getShowCmt = (state: any) => state.app.showCmt;
export const getGoHome = (state: any) => state.app.goHome;
export const getHadNew = (state: any) => state.app.hadNew;
export const getSearchQuery = (state: any) => state.app.searchQuery;
// export const getActionPost = (state: any) => state.app.actionPost;

export default appSlice.reducer;
