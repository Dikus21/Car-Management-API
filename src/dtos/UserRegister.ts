import {IsEmail, IsNotEmpty} from "class-validator";

export default class UserRegister {
    @IsNotEmpty({message:"Name Is Required"})
    name?: string;
    @IsNotEmpty({message:"Email Is Required"})
    @IsEmail({}, {message:"Invalid Email"})
    email?: string;
    @IsNotEmpty({message:"Password Is Required"})
    password?: string;
    @IsNotEmpty({message:"Confirm Password Is Required"})
    confirmPassword?: string;
}