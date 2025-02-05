import mongoose, { Schema,  } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserDocument, UserModel, UserRole } from "../types/user.type";
import { handlePasswordHashing, hashPassword } from "../utils/user.util";

const userSchema: Schema<UserDocument, UserModel> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    is2faActivated: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("findOneAndUpdate", handlePasswordHashing);
userSchema.pre("updateOne", handlePasswordHashing);
userSchema.pre("updateMany", handlePasswordHashing);

userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string }
  );
};

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);