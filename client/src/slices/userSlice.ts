import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: null,
  relation: []
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
  },
});



export const { setAllUsers, setRelation } = userSlice.actions;

export const getAllUsers = (state: any) => state.userInfo.allUsers;
// ;

export const getRelation = (state: any) => state.userInfo.relation;

export default userSlice.reducer;
