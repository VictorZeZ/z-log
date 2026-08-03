import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "@/lib/api/account";
import type { GetUserByIdResponse } from "@/types/api/account";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  getCurrentUser,
);

type UserState = {
  data: GetUserByIdResponse | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  isLoading: boolean;
};

const initialState: UserState = {
  data: null,
  status: "idle",
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.status = "idle";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
        state.data = null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
