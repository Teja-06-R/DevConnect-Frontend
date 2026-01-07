import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    users: [],
    currentIndex: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addFeed: (state, action) => {
      state.users = action.payload || [];
      state.currentIndex = 0;
      state.loading = false;
      state.error = null;
    },
    removeCurrentUser: (state) => {
      // Remove current user and stay at same index (next user slides in)
      state.users.splice(state.currentIndex, 1);
    },
    resetFeed: (state) => {
      state.users = [];
      state.currentIndex = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { addFeed, removeCurrentUser, setLoading, setError, resetFeed } =
  feedSlice.actions;
export default feedSlice.reducer;