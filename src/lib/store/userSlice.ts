import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetUserByIdResponse } from "@/types/api/account";

type UserState = {
  data: GetUserByIdResponse | null;
  isLoading: boolean;
};

const initialState: UserState = {
  data: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GetUserByIdResponse | null>) => {
      state.data = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, setUserLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;
