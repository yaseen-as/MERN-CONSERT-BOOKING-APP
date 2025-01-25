import mongoose, { Model, Document } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  refreshToken: string | undefined;
  is2faActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  isValidPassword(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface UserDocument
  extends IUser,
    IUserMethods,
    Document<mongoose.Types.ObjectId | string> {}

export interface UserModel extends Model<UserDocument> {}

export type CreateUserInput = Pick<
  IUser,
  "name" | "email" | "phoneNumber" | "password" | "role"
>;
export type AuthUserInput = Pick<IUser, "email" | "password">;
export type UserDto = Pick<
  UserDocument,
  "name" | "email" | "phoneNumber" | "role" | "_id"
>;
export type UpdateUserInput = Partial<CreateUserInput>;
export type AuthUserDto = {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
};

export type UniqueUserKey = { email: string } | { phoneNumber: string };

export interface IJwtPayload {
  _id: string;
  email?: string;
  name?: string;
  role?: UserRole;
  iat: number;
  exp: number;
  sub?: string;
  iss?: string;
  aud?: string;
}
