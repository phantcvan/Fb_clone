import { createSlice } from "@reduxjs/toolkit";
import { PostType } from "../static/types";

const initialState = {
  post: [],
  allPosts: [],
  createdPost: [],
  newPost: {
    content: "",
    audience: "public",
    feeling: [],
    location: "",
    bgUrl: "",
    textColor: "",
    mediaUrl: "",
    type: "",
    tag: [],
  },
  actionPost: 0,
  editPostId: 0,
};

export const postSlice = createSlice({
  name: "postInfo",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setCreatedPost: (state, action) => {
      state.createdPost = action.payload;
    },
    setContent: (state, action) => {
      state.newPost.content = action.payload;
    },
    setAudience: (state, action) => {
      state.newPost.audience = action.payload;
    },
    setFeeling: (state, action) => {
      state.newPost.feeling = action.payload;
    },
    setBgUrl: (state, action) => {
      state.newPost.bgUrl = action.payload;
    },
    setTextColor: (state, action) => {
      state.newPost.textColor = action.payload;
    },
    setLocation: (state, action) => {
      state.newPost.location = action.payload;
    },
    setMediaUrl: (state, action) => {
      state.newPost.mediaUrl = action.payload;
    },
    setType: (state, action) => {
      state.newPost.type = action.payload;
    },
    setTag: (state, action) => {
      state.newPost.tag = action.payload;
    },
    setActionPost: (state, action) => {
      state.actionPost = action.payload;
    },
    setEditPostId: (state, action) => {
      state.editPostId = action.payload;
    },

  },
});



export const { setPost, setAllPosts, setCreatedPost, setContent, setAudience, setBgUrl, setFeeling, setLocation,
  setMediaUrl, setType, setTag, setActionPost, setEditPostId, setTextColor } = postSlice.actions;

export const getPost = (state: any) => state.postInfo.post;
export const getAllPosts = (state: any) => state.postInfo.allPosts;
export const getCreatedPost = (state: any) => state.postInfo.newPost;
export const getContent = (state: any) => state.postInfo.newPost.content;
export const getAudience = (state: any) => state.postInfo.newPost.audience;
export const getFeeling = (state: any) => state.postInfo.newPost.feeling;
export const getBgUrl = (state: any) => state.postInfo.newPost.bgUrl;
export const getTextColor = (state: any) => state.postInfo.newPost.textColor;
export const getLocation = (state: any) => state.postInfo.newPost.location;
export const getMediaUrl = (state: any) => state.postInfo.newPost.mediaUrl;
export const getType = (state: any) => state.postInfo.newPost.type;
export const getTag = (state: any) => state.postInfo.newPost.tag;
export const getActionPost = (state: any) => state.postInfo.actionPost;
export const getEditPostId = (state: any) => state.postInfo.editPostId;


export default postSlice.reducer;
