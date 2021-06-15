import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, username } = action.payload;
      state.username = username;
      state.email = email;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUsername = (state) => state.user.username;
export const selectEmail = (state) => state.user.email;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
