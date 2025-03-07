import {
  ErrorResponse,
  AuthSuccessResponse,
  RegisterSuccessResponse,
  UserCredentials,
  RegisterUserData,
} from "@/types/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi } from "../axiosInstance";
import axios from "axios";

const fetchLoginUser = createAsyncThunk<
  AuthSuccessResponse,
  UserCredentials,
  { rejectValue: ErrorResponse }
>(
  "user/fetchLoginUser",
  async (credentials: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await publicApi.post<AuthSuccessResponse>(
        `/auth/login`,
        credentials
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          // statusCode: error.response?.data.statusCode,
          // errors: error.response?.data.errors,
          message: error.response?.data.message,
          // stack: error.response?.data.stack,
        });
      }
      return rejectWithValue({
        // statusCode:500,
        // errors:"",
        message: "unexpected server error",
        // stack: "",
      });
    }
  }
);

const fetchRegisterUser = createAsyncThunk<
  RegisterSuccessResponse,
  RegisterUserData,
  { rejectValue: ErrorResponse }
>(
  "user/fetchRegisterUser",
  async (userData: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await publicApi.post<RegisterSuccessResponse>(
        "/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data.message,
        });
      }
      return rejectWithValue({message:"unexpected server error"})
    }
  }
);

export { fetchLoginUser, fetchRegisterUser };
