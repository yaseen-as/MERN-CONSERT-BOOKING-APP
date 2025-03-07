import { fetchLoginUser, fetchRegisterUser } from "@/api/services/authServices";
import {
  userState,
  AuthSuccessResponse,
  ErrorResponse,
  RegisterSuccessResponse,
} from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: userState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchLoginUser.fulfilled,
        (state, action: PayloadAction<AuthSuccessResponse>) => {
          state.isAuthenticated = true;
          state.user = action.payload.data.user;
          state.isLoading = false;
        }
      )
      .addCase(
        fetchLoginUser.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error = action.payload?.message || "Unexpected server error";
        }
      )
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchRegisterUser.fulfilled,
        (state, action: PayloadAction<RegisterSuccessResponse>) => {
          state.user = action.payload.data;
          state.isLoading = false;
          state.error=null
        }
      )
      .addCase(
        fetchRegisterUser.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.error = action.payload?.message || "Unexpected server error";
          state.isLoading = false;
        }
      );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
