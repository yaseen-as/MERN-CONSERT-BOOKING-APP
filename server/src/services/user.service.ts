import { User } from "../models/user.model";
import {
  CreateUserInput,
  UniqueUserKey,
  UpdateUserInput,
  UserDocument,
  UserDto,
} from "../types/user.type";
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
    throw new ApiError(
      500,
      "Database error occurred by find existing user by unique"
    );
  }
};
const findExistingUserById = async (id: string): Promise<UserDocument> => {
  try {
    const existingUser: UserDocument | null = await User.findById(id);
    if (!existingUser) {
      throw new ApiError(404, "user not found");
    }
    return existingUser;
  } catch (error) {
    console.error("Database error:", error);
    throw new ApiError(
      500,
      "Database error occurred by find existing user by id"
    );
  }
};
const updateExistingUserById = async (
  id: string,
  updateUserInput: UpdateUserInput
): Promise<UserDocument> => {
  try {
    const existingUser: UserDocument | null =
      await User.findByIdAndUpdate<UserDocument>(
        id,
        { $set: updateUserInput },
        {
          new: true,
          runValidators: true,
        }
      );
    if (!existingUser) {
      throw new ApiError(404, "user not found");
    }
    return existingUser;
  } catch (error) {
    console.error("Database error:", error);
    throw new ApiError(
      500,
      "Database error occurred by update existing user by id"
    );
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

const findAllUsers = async (
  page: number,
  limit: number
): Promise<{ users: UserDto[]; totalUsers: number }> => {
  try {
    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      User.find().skip(skip).limit(limit).exec(),
      User.countDocuments().exec(),
    ]);

    const userDtos: UserDto[] = users.map((user) => mapToUserDto(user));

    return { users: userDtos, totalUsers };
  } catch (error) {
    throw new ApiError(500, "Failed to fetch users");
  }
};

const deleteUserById = async (userId: string): Promise<UserDocument | null> => {
  try {
    return await User.findByIdAndDelete(userId).exec();
  } catch (error) {
    throw new ApiError(500, "Failed to delete user");
  }
};

export {
  findExistingUserByUnique,
  createUser,
  findExistingUserById,
  updateExistingUserById,
  deleteUserById,
  findAllUsers,
};
