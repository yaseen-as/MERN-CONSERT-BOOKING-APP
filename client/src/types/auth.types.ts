import { ApiErrorResponse, APiSuccessResponse } from "@/api";

export interface UserCredentials {
  email: string;
  password: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  _id: string;
}

export interface userState {
  user: User | null ;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthSuccessData{
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type RegisterUserData = Omit<User, "_id"> & {password:string}
export type RegisterSuccessResponse = APiSuccessResponse<User>
export type AuthSuccessResponse = APiSuccessResponse<AuthSuccessData>
export type ErrorResponse = Partial<ApiErrorResponse>
 
