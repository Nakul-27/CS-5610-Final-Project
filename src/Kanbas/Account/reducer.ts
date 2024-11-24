import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  currentUserId: null
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.currentUserId = action.payload ? action.payload._id : null; 
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;

