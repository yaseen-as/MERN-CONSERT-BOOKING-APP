import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import {
  UniqueUserKey,
  UpdateUserInput,
  UserDocument,
  UserDto,
  UserListDto,
} from "../types/user.type";
import {
  deleteUserById,
  findAllUsers,
  findExistingUserByUnique,
  updateExistingUserById,
} from "../services/user.service";
import ApiError from "../utils/ApiError";
import { mapToUserDto } from "../utils/user.util";

const getUserController = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as UserDocument;
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    const userDto: UserDto = mapToUserDto(user);
  return res
    .status(200)
    .json(
      new ApiResponse<UserDto>(
        200,
        userDto ,
        "get user successfully"
      ));
  });
const updateUserController = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const updateUserInput = req.body as UpdateUserInput;
    if(updateUserInput.email){
        const uniqueUserKey: UniqueUserKey = { email: updateUserInput.email };
        let existingUserByEmail = await findExistingUserByUnique(uniqueUserKey);
        if (existingUserByEmail) {
          throw new ApiError(409, "Email already exist");
        }
    }
    if(updateUserInput.phoneNumber){
        const uniqueUserKey = { phoneNumber: updateUserInput.phoneNumber };
        let existingUserByPhoneNumber = await findExistingUserByUnique(
          uniqueUserKey
        );
        if (existingUserByPhoneNumber) {
          throw new ApiError(409, "Phone number already exist");
        }
    }
    const userId=(req.user as UserDocument)._id.toString();
    const updatedUser: UserDocument = await updateExistingUserById(userId,updateUserInput) ;
    const updatedUserDto: UserDto = mapToUserDto(updatedUser);

    return res
      .status(201)
      .json(
        new ApiResponse<UserDto>(
          201,
          updatedUserDto,
          "user successfully updated"
        )
      );
  }
);

const deleteUserByIdController = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const userId = req.params.id;
  
      const deletedUser = await deleteUserById(userId);
      if (!deletedUser) {
        throw new ApiError(404, "User not found");
      }
      const deletedUserDto: UserDto = mapToUserDto(deletedUser);
      return res
        .status(200)
        .json(
          new ApiResponse<UserDto>(200, deletedUserDto, "User successfully deleted")
        );
    }
  );
  
  const deleteUserController = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const userId = (req.user as UserDocument)._id.toString();
  
      const deletedUser = await deleteUserById(userId);
      if (!deletedUser) {
        throw new ApiError(404, "User not found");
      }
      const deletedUserDto: UserDto = mapToUserDto(deletedUser);

      return res
        .status(200)
        .json(
          new ApiResponse<UserDto>(200, deletedUserDto, "User successfully deleted")
        );
    }
  );
  
  const getAllUsersController = asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const { page = "1", limit = "10" } = req.query;
  
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);
  
      if (pageNumber <= 0 || limitNumber <= 0) {
        throw new ApiError(400, "Page and limit must be positive integers");
      }
  
      const { users, totalUsers } = await findAllUsers(pageNumber, limitNumber);
      const totalPages = Math.ceil(totalUsers / limitNumber);
      if(totalPages<pageNumber){
        throw new ApiError(404,"page not found")
      }
      const userListDto:UserListDto={users,currentPage:pageNumber,totalPages,totalUsers}
      return res
        .status(200)
        .json(
          new ApiResponse<UserListDto>(
            200,
            userListDto,
            "Users retrieved successfully",
          )
        );
    }
  );
  

export {
    getUserController,
    updateUserController,
    deleteUserByIdController,
    deleteUserController,
    getAllUsersController
};
