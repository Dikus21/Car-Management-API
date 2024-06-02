import {IsNotEmpty, IsNumberString} from "class-validator";

export default class CarRegister {
    @IsNotEmpty({message:"Model Name Is Required"})
    model?: string;
    @IsNotEmpty({message:"Year Is Required"})
    year?:string;
    @IsNotEmpty({message: "Price Is Required"})
    @IsNumberString({}, {message: "Price must be a valid number"})
    price?:string;
    @IsNotEmpty({message:"Image Is Required"})
    image?:string;
}