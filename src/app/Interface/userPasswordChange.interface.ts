import { UserDto } from "./user.interface"

export interface UserPasswordDto{
    userDto : UserDto;
    new_password : string
}