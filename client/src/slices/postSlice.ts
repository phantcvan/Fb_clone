import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: [],
};

export const userSlice = createSlice({
  name: "postInfo",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});



export const { setPost } = userSlice.actions;

export const getPost = (state: any) => state.postInfo.post;

export default userSlice.reducer;
