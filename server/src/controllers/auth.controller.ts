import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/ApiResponse";
import {
  AuthUserDto,
  AuthUserInput,
  CreateUserInput,
  UniqueUserKey,
  UserDocument,
  UserDto,
} from "../types/user.type";
import {
  createUser,
  findExistingUserById,
  findExistingUserByUnique,
} from "../services/user.service";
import ApiError from "../utils/ApiError";
import { mapToUserDto } from "../utils/user.util";
import { jwtVerify } from "../utils/jwt.util";

const register = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    const createUserInput = req.body as CreateUserInput;
    let uniqueUserKey: UniqueUserKey = { email: createUserInput.email };
    let existingUserByEmail = await findExistingUserByUnique(uniqueUserKey);
    if (existingUserByEmail) {
      throw new ApiError(409, "Email already exist");
    }
    uniqueUserKey = { phoneNumber: createUserInput.phoneNumber };
    let existingUserByPhoneNumber = await findExistingUserByUnique(
      uniqueUserKey
    );
    if (existingUserByPhoneNumber) {
      throw new ApiError(409, "Phone number already exist");
    }
    const createdUser: UserDto = await createUser(createUserInput);
    return res
      .status(201)
      .json(
        new ApiResponse<UserDto>(
          201,
          createdUser,
          "user successfully registered"
        )
      );
  }
);
const login = asyncHandler(async (req: Request, res: Response) => {
  const { password, email }: AuthUserInput = req.body;
  const user = await findExistingUserByUnique({ email });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const isValidUser = await user.isValidPassword(password);
  if (!isValidUser) {
    throw new ApiError(401, "in correct password");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  const userDto: UserDto = mapToUserDto(user);
  return res
    .status(200)
    .json(
      new ApiResponse<AuthUserDto>(
        200,
        { accessToken, refreshToken, user: userDto },
        "user successfully logged in"
      )
    );
});
const logout = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as UserDocument;
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  if (!user.refreshToken) {
    throw new ApiError(401, "Unauthorized user");
  }
  try {
    user.refreshToken = undefined;
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, null, "user logged out successfully"));
  } catch (error) {
    throw new ApiError(500, "failed update user");
  }
});
const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    throw new ApiError(401, "refresh token is required");
  }

  const decoded = jwtVerify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );
  const user = await findExistingUserById(decoded._id);
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  if (!(user.refreshToken === refreshToken)) {
    throw new ApiError(401, "unauthorized Invalid refresh token");
  }
  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();
  user.refreshToken = newRefreshToken;
  user.save();
  const userDto: UserDto = mapToUserDto(user);

  return res
    .status(200)
    .json(
      new ApiResponse<AuthUserDto>(
        200,
        { accessToken, refreshToken: newRefreshToken, user: userDto },
        "successfully refreshed token"
      )
    );
});

// const setup2FA = asyncHandler(async (req: Request, res: Response) => {
//   return res
//     .status(200)
//     .json(new ApiResponse<string>(200, "ok", "health is ok", null));
// });
// const verify2FA = asyncHandler(async (req: Request, res: Response) => {
//   return res
//     .status(200)
//     .json(new ApiResponse<string>(200, "ok", "health is ok", null));
// });
// const reset2FA = asyncHandler(async (req: Request, res: Response) => {
//   return res
//     .status(200)
//     .json(new ApiResponse<string>(200, "ok", "health is ok", null));
// });

export {
  register,
  login,
  logout,
  refreshToken,
  // setup2FA,
  // verify2FA,
  // reset2FA,
};
