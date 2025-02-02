import { UserDocument, UserDto } from "../types/user.type";
import bcrypt from "bcrypt";

const mapToUserDto = (user: UserDocument): UserDto => ({
  _id: user._id.toString(),
  name: user.name,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
});

async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

async function handlePasswordHashing(this: any, next: Function) {
  const update = this.getUpdate();
  console.log(update);
  console.log(update?.$set?.password);
  if (update?.$set?.password) {
    console.log("password hashed during update");
    update.$set.password = await hashPassword(update?.$set?.password);
  }
  next();
}

export { mapToUserDto, hashPassword, handlePasswordHashing };
