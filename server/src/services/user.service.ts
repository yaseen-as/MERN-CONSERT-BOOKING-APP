import { User } from '../models/auth.model';
import {
  CreateUserInput,
  UniqueUserKey,
  UserDocument,
  UserDto,
} from "../types/auth.type";
import ApiError from "../utils/ApiError";
import { mapToUserDto } from "../utils/user.util";

const findExistingUserByUnique = async (
  unique: UniqueUserKey
): Promise<UserDocument | null> => {
  try {
    const existingUser: UserDocument | null = await User.findOne(unique);
    if (!existingUser) {
      return null;
    }
    return existingUser;
  } catch (error) {
    console.error("Database error:", error);
    throw new ApiError(500, "Database error occurred by find existing user by unique");
  }
};
const findExistingUserById = async (
  id:string
): Promise<UserDocument> => {
  try {
    const existingUser: UserDocument | null = await User.findById(id);
    if (!existingUser) {
      throw new ApiError(404,"user not found")
    }
    return existingUser;
  } catch (error) {
    console.error("Database error:", error);
    throw new ApiError(500, "Database error occurred by find existing user by id");
  }
};

const createUser = async (user: CreateUserInput): Promise<UserDto> => {
  try {
    const createdUser: UserDocument = await User.create(user);
    const userDto: UserDto = mapToUserDto(createdUser);
    return userDto;
  } catch (error) {
    console.log("Error creating user:", error);
    throw new ApiError(500, "Failed to create user");
  }
};



export { findExistingUserByUnique, createUser,findExistingUserById };
