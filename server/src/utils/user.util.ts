import { UserDocument, UserDto } from "../types/auth.type";

const mapToUserDto = (user: UserDocument): UserDto => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
});


export {
    mapToUserDto
}